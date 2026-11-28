"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, KeyRound, Mail } from "lucide-react";
import { requestPasswordReset, resetPassword } from "@/features/authentication/auth-client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);
    try {
      const result = await requestPasswordReset(email.trim());
      setMessage(result.message);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to request password reset.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--surface)] px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-white p-8 shadow-sm">
        <Link href="/account/sign-in" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--navy)]"><ArrowLeft size={15}/> Back to sign in</Link>
        <div className="mt-9 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4f5f1] text-[var(--teal-dark)]"><Mail size={22}/></div>
        <p className="eyebrow mt-7">Account recovery</p>
        <h1 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">Forgot your password?</h1>
        <p className="muted mt-3 text-sm leading-6">Enter the email address associated with your AssetPass account. If an account exists, we’ll send a one-time reset link.</p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-bold text-[var(--ink)]">Email address</label>
            <input id="email" type="email" autoComplete="email" required maxLength={320} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-[var(--line)] px-4 py-3.5 text-sm outline-none focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
          </div>
          {message && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs leading-5 text-emerald-900">{message}</p>}
          {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs leading-5 text-rose-800">{error}</p>}
          <button type="submit" disabled={submitting} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--teal-dark)] disabled:opacity-60">{submitting ? "Sending…" : "Send reset link"} <ArrowRight size={16}/></button>
        </form>
      </section>
    </main>
  );
}

export function ResetPasswordForm() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fragment = window.location.hash.slice(1);
    if (fragment) {
      setToken(fragment);
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    if (!token) {
      setError("This reset link is missing its one-time token. Request a new link.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }
    if (newPassword.length < 12) {
      setError("Use a password containing at least 12 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await resetPassword(token, newPassword);
      setToken("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Your password has been reset. All existing sessions have been signed out. You can now sign in with your new password.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to reset your password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--surface)] px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-white p-8 shadow-sm">
        <Link href="/account/sign-in" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--navy)]"><ArrowLeft size={15}/> Back to sign in</Link>
        <div className="mt-9 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4f5f1] text-[var(--teal-dark)]"><KeyRound size={22}/></div>
        <p className="eyebrow mt-7">Account security</p>
        <h1 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">Set a new password</h1>
        <p className="muted mt-3 text-sm leading-6">Choose a new password with at least 12 characters. Reset links expire after 15 minutes and can only be used once.</p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="newPassword" className="mb-2 block text-xs font-bold text-[var(--ink)]">New password</label>
            <input id="newPassword" type="password" autoComplete="new-password" minLength={12} maxLength={1024} required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="w-full rounded-xl border border-[var(--line)] px-4 py-3.5 text-sm outline-none focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-xs font-bold text-[var(--ink)]">Confirm new password</label>
            <input id="confirmPassword" type="password" autoComplete="new-password" minLength={12} maxLength={1024} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-[var(--line)] px-4 py-3.5 text-sm outline-none focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
          </div>
          {message && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs leading-5 text-emerald-900">{message}</p>}
          {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs leading-5 text-rose-800">{error}</p>}
          {message ? <Link href="/account/sign-in" className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white">Continue to sign in</Link> : <button type="submit" disabled={submitting || !token} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--teal-dark)] disabled:opacity-60">{submitting ? "Updating…" : "Reset password"} <ArrowRight size={16}/></button>}
        </form>
      </section>
    </main>
  );
}
