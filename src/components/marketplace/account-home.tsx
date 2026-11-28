"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "@/features/authentication/auth-provider";

export function AccountHome() {
  const router = useRouter();
  const { user, status, logout, retrySessionRestore } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/account/sign-in");
  }, [status, router]);

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

  return (
    <main className="min-h-screen bg-[var(--surface)] px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--navy)]">← Back to Marketplace</Link>
        <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-7 shadow-sm sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">AssetPass account</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--navy)]">Welcome, {user.fullName}</h1>
              <p className="muted mt-2 text-sm">You are signed in to AssetPass Marketplace.</p>
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
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-6">
            <Link href="/" className="text-sm font-semibold text-[var(--teal-dark)] hover:underline">Continue exploring Marketplace</Link>
            <button onClick={() => void handleLogout()} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-rose-200 px-4 text-sm font-semibold text-rose-700 hover:bg-rose-50"><LogOut size={15}/> Sign out</button>
          </div>
        </div>
      </div>
    </main>
  );
}
