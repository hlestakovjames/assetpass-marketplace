"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound } from "lucide-react";
import { changePassword } from "@/features/authentication/auth-client";
import { useAuth } from "@/features/authentication/auth-provider";

export function AccountSecurityForm() {
  const router = useRouter();
  const { status } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && !success) router.replace("/account/sign-in");
  }, [status, success, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }
    if (newPassword.length < 12) {
      setError("Use a password containing at least 12 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to change your password.");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return <main className="grid min-h-screen place-items-center bg-[var(--surface)]"><p className="text-sm text-[var(--muted)]">Checking your session…</p></main>;
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--surface)] px-5 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-[var(--line)] bg-white p-8 shadow-sm">
        <Link href="/account" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--navy)]"><ArrowLeft size={15}/> Back to account</Link>
        <div className="mt-9 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4f5f1] text-[var(--teal-dark)]"><KeyRound size={22}/></div>
        <p className="eyebrow mt-7">Account security</p>
        <h1 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">Change your password</h1>
        <p className="muted mt-3 text-sm leading-6">Confirm your current password and choose a new one. For security, changing your password signs out all active sessions, including this one.</p>
        {success ? (
          <div className="mt-7 space-y-4">
            <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">Your password has been changed and all existing sessions have been revoked. Sign in again with your new password.</p>
            <Link href="/account/sign-in" className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white">Continue to sign in</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div><label htmlFor="currentPassword" className="mb-2 block text-xs font-bold text-[var(--ink)]">Current password</label><input id="currentPassword" type="password" autoComplete="current-password" required maxLength={1024} value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="w-full rounded-xl border border-[var(--line)] px-4 py-3.5 text-sm outline-none focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/></div>
            <div><label htmlFor="newPassword" className="mb-2 block text-xs font-bold text-[var(--ink)]">New password</label><input id="newPassword" type="password" autoComplete="new-password" required minLength={12} maxLength={1024} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="w-full rounded-xl border border-[var(--line)] px-4 py-3.5 text-sm outline-none focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/></div>
            <div><label htmlFor="confirmPassword" className="mb-2 block text-xs font-bold text-[var(--ink)]">Confirm new password</label><input id="confirmPassword" type="password" autoComplete="new-password" required minLength={12} maxLength={1024} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-[var(--line)] px-4 py-3.5 text-sm outline-none focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/></div>
            {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs leading-5 text-rose-800">{error}</p>}
            <button type="submit" disabled={submitting} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--teal-dark)] disabled:opacity-60">{submitting ? "Updating…" : "Change password"}</button>
          </form>
        )}
      </section>
    </main>
  );
}
