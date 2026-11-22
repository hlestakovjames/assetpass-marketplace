"use client";

import Link from "next/link";
import { MarketplaceBrand } from "@/components/marketplace/marketplace-brand";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, ShieldCheck, UserRound } from "lucide-react";

type AccountMode = "sign-in" | "register";

export function AccountPage({ mode }: { mode: AccountMode }) {
  const isRegister = mode === "register";
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isRegister) {
      const formData = new FormData(event.currentTarget);
      if (formData.get("password") !== formData.get("confirmPassword")) {
        setNotice("The passwords do not match. Please check both password fields.");
        return;
      }
    }
    setNotice(
      "Account services are not connected yet. This is a frontend preview; your details have not been sent, saved or processed."
    );
  }

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <div className="grid min-h-screen lg:grid-cols-[.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-[var(--navy-deep)] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-36 top-1/4 h-[480px] w-[480px] rounded-full border border-white/[.08]" />
          <div className="pointer-events-none absolute -right-16 top-1/3 h-[320px] w-[320px] rounded-full border border-white/[.08]" />
          <MarketplaceBrand />
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
              <p className="eyebrow mt-7">{isRegister ? "Join the Marketplace" : "Welcome back"}</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--navy)]">{isRegister ? "Create your account" : "Sign in to your account"}</h2>
              <p className="muted mt-3 text-sm leading-6">{isRegister ? "Choose how you expect to participate. You can explore the Marketplace before creating an account." : "Sign-in screens are ready for the future account service connection."}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {isRegister && (
                <>
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-xs font-bold text-[var(--ink)]">Full name</label>
                    <input id="fullName" name="fullName" autoComplete="name" required placeholder="Enter your full name" className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
                  </div>
                  <fieldset>
                    <legend className="mb-2 block text-xs font-bold text-[var(--ink)]">How will you participate?</legend>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--line)] bg-white p-3.5 text-sm font-semibold text-[var(--ink)] has-[:checked]:border-[var(--teal)] has-[:checked]:bg-[#effaf7]"><input type="radio" name="capacity" value="individual" defaultChecked className="accent-[var(--teal)]"/><UserRound size={17}/> Individual</label>
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--line)] bg-white p-3.5 text-sm font-semibold text-[var(--ink)] has-[:checked]:border-[var(--teal)] has-[:checked]:bg-[#effaf7]"><input type="radio" name="capacity" value="organisation" className="accent-[var(--teal)]"/><Building2 size={17}/> Organisation</label>
                    </div>
                    <p className="muted mt-2 text-[11px] leading-5">Organisation participation will require appropriate authority checks when those workflows are introduced.</p>
                  </fieldset>
                </>
              )}
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold text-[var(--ink)]">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-bold text-[var(--ink)]">Password</label>
                <input id="password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={8} required placeholder={isRegister ? "At least 8 characters" : "Enter your password"} className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
              </div>
              {isRegister && (
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-xs font-bold text-[var(--ink)]">Confirm password</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required placeholder="Re-enter your password" className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--teal)] focus:ring-4 focus:ring-teal-500/10"/>
                </div>
              )}
              {!isRegister && <div className="flex justify-end"><span className="text-xs font-semibold text-[var(--muted)]">Password recovery will be available with account services.</span></div>}
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-5 py-4 text-sm font-bold text-white transition hover:bg-[var(--teal-dark)]">{isRegister ? "Create account" : "Sign in"} <ArrowRight size={16}/></button>
              {notice && <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">{notice}</p>}
            </form>

            <p className="muted mt-7 text-center text-sm">{isRegister ? "Already have an account?" : "New to AssetPass Marketplace?"}{" "}<Link href={isRegister ? "/account/sign-in" : "/account/register"} className="font-bold text-[var(--teal-dark)] hover:underline">{isRegister ? "Sign in" : "Join Marketplace"}</Link></p>
            <p className="muted mt-8 text-center text-[11px] leading-5">Account creation and sign-in are not active yet. You can continue browsing public Marketplace information without an account.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
