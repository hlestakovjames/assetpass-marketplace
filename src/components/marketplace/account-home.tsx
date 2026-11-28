"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "@/features/authentication/auth-provider";
import { optInMarketplace, revokeMarketplace } from "@/features/authentication/auth-client";

export function AccountHome() {
  const router = useRouter();
  const { user, status, logout, retrySessionRestore } = useAuth();
  const [busy, setBusy] = useState(false);
  const [acknowledgement, setAcknowledgement] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/account/sign-in");
  }, [status, router]);

  async function handleMarketplaceOptIn() {
    if (!acknowledgement) {
      setError("Confirm the Marketplace participation acknowledgement before continuing.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await optInMarketplace();
      setAcknowledgement(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to activate Marketplace participation.");
    } finally {
      setBusy(false);
    }
  }

  async function handleMarketplaceRevoke() {
    const confirmed = window.confirm(
      "Turn off your individual Marketplace participation? Your AssetPass identity and App access will remain unchanged.",
    );
    if (!confirmed) return;
    setBusy(true);
    setError("");
    try {
      await revokeMarketplace("Individual opted out from Marketplace account settings.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to turn off Marketplace participation.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await logout();
    router.replace("/account/sign-in");
    router.refresh();
  }

  if (status === "loading") {
    return <main className="grid min-h-screen place-items-center bg-[var(--surface)]"><p className="text-sm text-[var(--muted)]">Checking your AssetPass session…</p></main>;
  }

  if (status === "error") {
    return <main className="grid min-h-screen place-items-center bg-[var(--surface)] px-5"><section className="w-full max-w-md rounded-2xl border border-[var(--line)] bg-white p-7"><h1 className="text-xl font-bold text-[var(--navy)]">Unable to restore your session</h1><p className="muted mt-2 text-sm">Please retry or sign in again.</p><button onClick={() => void retrySessionRestore()} className="mt-5 min-h-11 rounded-xl bg-[var(--teal)] px-5 text-sm font-bold text-white">Retry</button><Link href="/account/sign-in" className="ml-4 text-sm font-semibold text-[var(--teal-dark)]">Sign in</Link></section></main>;
  }

  if (!user) return null;

  const appOrigin = (process.env.NEXT_PUBLIC_ASSETPASS_APP_ORIGIN || "https://assetpass-app.vercel.app").replace(/\/$/, "");
  const appActive = user.applicationEntitlements?.assetpassApp.active === true;
  const marketplaceActive = user.applicationEntitlements?.marketplace.active === true;

  return (
    <main className="min-h-screen bg-[var(--surface)] px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--navy)]">← Back to Marketplace</Link>
        <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-7 shadow-sm sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">AssetPass account</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--navy)]">Welcome, {user.fullName}</h1>
              <p className="muted mt-2 text-sm">Your central AssetPass identity is authenticated. Marketplace participation and organisation representation are checked separately.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf7f3] px-3 py-2 text-xs font-bold text-[var(--teal-dark)]"><ShieldCheck size={15}/> Authenticated</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]"><UserRound size={15}/> Account identity</div>
              <p className="mt-3 break-all text-sm font-semibold text-[var(--ink)]">{user.email}</p>
              <p className="mt-2 text-xs capitalize text-[var(--muted)]">Account status: {user.status.replaceAll("_", " ")}</p>
            </div>
            <Link href="/account/security" className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition hover:border-[var(--teal)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]"><ShieldCheck size={15}/> Account security</div>
              <p className="mt-3 text-sm font-semibold text-[var(--ink)]">Password and sessions</p>
              <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[var(--teal-dark)]">Manage security <ArrowRight size={13} className="transition group-hover:translate-x-1"/></p>
            </Link>
          </div>
          {error && <p role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
          <section className="mt-7 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[var(--navy)]">Individual Marketplace participation</h2>
                <p className="muted mt-1 max-w-xl text-sm leading-6">
                  Sign-in authenticates your central AssetPass identity. Explicit Marketplace opt-in enables individual participant features; it does not authorize organisation representation or asset listing/sale.
                </p>
              </div>
              <span className={user.applicationEntitlements?.marketplace?.active
                ? "rounded-full bg-[#eaf7f3] px-3 py-1 text-xs font-bold text-[var(--teal-dark)]"
                : "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"}>
                {user.applicationEntitlements?.marketplace?.active ? "Active" : "Not enabled"}
              </span>
            </div>
            {user.applicationEntitlements?.marketplace?.active ? (
              <button
                type="button"
                onClick={() => void handleMarketplaceRevoke()}
                disabled={busy}
                className="mt-4 min-h-11 rounded-xl border border-rose-200 bg-white px-4 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60"
              >
                {busy ? "Please wait…" : "Turn off individual Marketplace access"}
              </button>
            ) : (
              <div className="mt-4">
                <label className="flex items-start gap-3 text-sm leading-6 text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={acknowledgement}
                    onChange={(event) => setAcknowledgement(event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                  />
                  <span>
                    I understand that Marketplace participation is separate from App access and does not by itself authorize me to act for an organisation or to list, sell, own or take custody of an asset.
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => void handleMarketplaceOptIn()}
                  disabled={busy || !acknowledgement}
                  className="mt-4 min-h-11 rounded-xl bg-[var(--teal)] px-5 text-sm font-bold text-white hover:bg-[var(--teal-dark)] disabled:opacity-50"
                >
                  {busy ? "Activating…" : "Opt in to Marketplace"}
                </button>
              </div>
            )}
            {(user.marketplaceOrganizationRepresentations?.length ?? 0) > 0 && (
              <div className="mt-5 border-t border-[var(--line)] pt-4">
                <h3 className="text-sm font-bold text-[var(--navy)]">Organisation representation</h3>
                <ul className="mt-2 space-y-2">
                  {user.marketplaceOrganizationRepresentations?.map((representation) => (
                    <li key={representation.grantId} className="rounded-xl bg-white p-3 text-sm">
                      <span className="font-semibold text-[var(--ink)]">{representation.displayName}</span>
                      <span className="ml-2 text-xs text-[var(--muted)]">Authorised representative</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {marketplaceActive && (
            <section className="mt-7 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[var(--navy)]">AssetPass App access</h2>
                  <p className="muted mt-1 max-w-xl text-sm leading-6">
                    App access is a separate entitlement. Enabling it uses your existing central identity and asks you to confirm the personal details required by the App.
                  </p>
                </div>
                <span className={appActive ? "rounded-full bg-[#eaf7f3] px-3 py-1 text-xs font-bold text-[var(--teal-dark)]" : "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"}>
                  {appActive ? "Enabled" : "Not enabled"}
                </span>
              </div>
              <a
                href={`${appOrigin}${appActive ? "/account" : "/account/activate-app"}` }
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--teal)] px-5 text-sm font-bold text-white hover:bg-[var(--teal-dark)]"
              >
                {appActive ? "Open AssetPass App" : "Enable AssetPass App"} <ArrowRight size={15}/>
              </a>
              <p className="muted mt-3 text-xs leading-5">
                App and Marketplace use separate browser sessions. You may be asked to sign in again on the App using this same AssetPass account. Marketplace credentials are never transferred between the applications.
              </p>
            </section>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-6">
            <Link href="/" className="text-sm font-semibold text-[var(--teal-dark)] hover:underline">Continue exploring Marketplace</Link>
            <button onClick={() => void handleLogout()} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-rose-200 px-4 text-sm font-semibold text-rose-700 hover:bg-rose-50"><LogOut size={15}/> Sign out</button>
          </div>
        </div>
      </div>
    </main>
  );
}
