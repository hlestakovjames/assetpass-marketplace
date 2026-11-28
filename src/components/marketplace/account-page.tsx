"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/features/authentication/auth-provider";

export function AccountPage({ mode }: { mode: "sign-in" | "register" }) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (mode === "register") {
    return (
      <main className="grid min-h-screen place-items-center bg-[var(--surface)] px-5 py-12">
        <section className="w-full max-w-lg rounded-3xl border border-[var(--line)] bg-white p-8 shadow-sm">
          <p className="eyebrow">AssetPass account</p>
          <h1 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">Create your AssetPass identity</h1>
          <p className="muted mt-3 text-sm leading-6">Registration is managed through the authenticated AssetPass application so that individual and organisation onboarding use one complete, consistent process.</p>
          <a href={process.env.NEXT_PUBLIC_ASSETPASS_APP_ORIGIN ? `${process.env.NEXT_PUBLIC_ASSETPASS_APP_ORIGIN.replace(/\/$/, "")}/register` : "https://assetpass-app.vercel.app/register"} className="mt-7 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--teal-dark)]">Continue to AssetPass registration <ArrowRight size={16}/></a>
          <Link href="/account/sign-in" className="mt-5 block text-center text-sm font-semibold text-[var(--muted)] hover:text-[var(--navy)]">Already registered? Sign in</Link>
        </section>
      </main>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      router.replace("/account");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <div className="grid min-h-screen lg:grid-cols-[.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-[var(--navy-deep)] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-36 top-1/4 h-[480px] w-[480px] rounded-full border border-white/[.08]" />
          <div className="pointer-events-none absolute -right-16 top-1/3 h-[320px] w-[320px] rounded-full border border-white/[.08]" />
          <Link href="/" className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--teal)] text-xl font-black">A</span>
            <span><span className="block text-lg font-extrabold">AssetPass</span><span className="block text-[10px] font-bold uppercase tracking-[.2em] text-teal-300">Marketplace</span></span>
          </Link>
          <div className="relative max-w-lg pb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-2 text-[11px] font-semibold text-teal-100"><ShieldCheck size={14}/> Discover with confidence</span>
            <h1 className="mt-7 text-5xl font-extrabold leading-[1.08] tracking-[-.05em]">A better way to connect around asset value.</h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">Explore opportunities, discover service professionals and connect with participants across one Marketplace.</p>
            <div className="mt-10 flex items-center gap-3 text-xs text-slate-300"><CheckCircle2 size={16} className="text-teal-300"/> Public discovery is open to everyone</div>
          </div>
          <p className="relative text-[11px] text-slate-500">© {new Date().getFullYear()} AssetPass Marketplace</p>
        </aside>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[470px]">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--navy)]"><ArrowLeft size={16}/> Back to Marketplace</Link>
            <div className="mt-10 lg:mt-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4f5f1] text-[var(--teal-dark)]"><ShieldCheck size={23}/></div>
              <p className="eyebrow mt-7">Welcome back</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--navy)]">Sign in to AssetPass</h2>
              <p className="muted mt-3 text-sm leading-6">Use the same AssetPass account you use in the authenticated application. Marketplace access and organisation authority are checked separately.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold text-[var(--ink)]">Email address</label>
                <input id="email" name="email" type="email" autoComplete="username" required maxLength={320} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-bold text-[var(--ink)]">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required maxLength={1024} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
              </div>
              <div className="flex justify-end">
                <Link href="/account/forgot-password" className="text-xs font-semibold text-[var(--teal-dark)] hover:underline">Forgot password?</Link>
              </div>
              {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs leading-5 text-rose-800">{error}</p>}
              <button type="submit" disabled={submitting} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-5 py-4 text-sm font-bold text-white transition hover:bg-[var(--teal-dark)] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Signing in…" : "Sign in"} <ArrowRight size={16}/></button>
            </form>

            <p className="muted mt-7 text-center text-sm">New to AssetPass? <Link href="/account/register" className="font-bold text-[var(--teal-dark)] hover:underline">Create an account</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
