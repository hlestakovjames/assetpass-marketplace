export type AuthenticatedUser = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  profile?: unknown;
  platformRoles?: string[];
  platformPermissions?: string[];
  organizations?: unknown[];
  availableWorkspaces?: unknown[];
  defaultWorkspace?: unknown;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  user: AuthenticatedUser;
};

type RefreshResponse = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
};

type AuthListener = (user: AuthenticatedUser | null) => void;

const API_BASE_URL = "/api/v1";
let accessToken: string | null = null;
let csrfToken: string | null = null;
let currentUser: AuthenticatedUser | null = null;
let refreshInFlight: Promise<string | null> | null = null;
let restoreInFlight: Promise<AuthenticatedUser | null> | null = null;
const listeners = new Set<AuthListener>();

function notify() {
  for (const listener of listeners) listener(currentUser);
}

function setAuthenticatedState(token: string, user: AuthenticatedUser) {
  accessToken = token;
  currentUser = user;
  notify();
}

function clearLocalSession() {
  accessToken = null;
  csrfToken = null;
  currentUser = null;
  notify();
}

async function readPayload<T>(response: Response): Promise<T | null> {
  return response.json().catch(() => null) as Promise<T | null>;
}

function errorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message?: unknown }).message;
    if (typeof message === "string") return message;
    if (Array.isArray(message) && message.every((item) => typeof item === "string")) {
      return message.join(", ");
    }
  }
  return fallback;
}

export function subscribeToAuth(listener: AuthListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCurrentUser(): AuthenticatedUser | null {
  return currentUser;
}

export function getAccessToken(): string | null {
  return accessToken;
}

async function bootstrapCsrfToken(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/csrf`, {
    method: "GET",
    credentials: "same-origin",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  const payload = await readPayload<{ csrfToken?: string }>(response);
  if (!response.ok || typeof payload?.csrfToken !== "string") {
    throw new Error(errorMessage(payload, "Unable to establish a secure sign-in session."));
  }
  csrfToken = payload.csrfToken;
  return csrfToken;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const payload = await readPayload<LoginResponse & { message?: unknown }>(response);
  if (!response.ok) {
    throw new Error(errorMessage(payload, "Unable to sign in. Check your credentials and try again."));
  }
  if (!payload || typeof payload.accessToken !== "string" || !payload.user || typeof payload.user.id !== "string") {
    throw new Error("The authentication service returned an invalid response.");
  }
  accessToken = payload.accessToken;
  try {
    await bootstrapCsrfToken();
  } catch (error) {
    clearLocalSession();
    throw error;
  }
  setAuthenticatedState(payload.accessToken, payload.user);
  return payload;
}

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight;
  const operation = (async () => {
    const token = csrfToken ?? (await bootstrapCsrfToken());
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
      headers: { Accept: "application/json", "X-CSRF-Token": token },
    });
    const payload = await readPayload<RefreshResponse>(response);
    if (!response.ok || typeof payload?.accessToken !== "string") {
      clearLocalSession();
      return null;
    }
    accessToken = payload.accessToken;
    return payload.accessToken;
  })();
  refreshInFlight = operation;
  try {
    return await operation;
  } finally {
    if (refreshInFlight === operation) refreshInFlight = null;
  }
}

export async function restoreSession(): Promise<AuthenticatedUser | null> {
  if (restoreInFlight) return restoreInFlight;
  const operation = (async () => {
    await bootstrapCsrfToken();
    const token = await refreshAccessToken();
    if (!token) return null;
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    const user = await readPayload<AuthenticatedUser>(response);
    if (!response.ok || !user || typeof user.id !== "string") {
      clearLocalSession();
      return null;
    }
    setAuthenticatedState(token, user);
    return user;
  })();
  restoreInFlight = operation;
  try {
    return await operation;
  } finally {
    if (restoreInFlight === operation) restoreInFlight = null;
  }
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const makeRequest = (token: string | null) => {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return fetch(`${API_BASE_URL}${normalizedPath}`, {
      ...init,
      headers,
      credentials: "same-origin",
      cache: "no-store",
    });
  };
  let response = await makeRequest(accessToken);
  if (response.status !== 401 || !accessToken) return response;
  const refreshed = await refreshAccessToken();
  if (!refreshed) return response;
  response = await makeRequest(refreshed);
  return response;
}

export async function logout(): Promise<void> {
  try {
    const token = csrfToken ?? (await bootstrapCsrfToken());
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "same-origin",
      cache: "no-store",
      headers: { Accept: "application/json", "X-CSRF-Token": token },
    });
  } finally {
    clearLocalSession();
  }
}
