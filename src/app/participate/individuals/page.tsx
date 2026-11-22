import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, UserRound, ShieldCheck, FileCheck2 } from "lucide-react";

const capabilities = [
  { icon: Search, title: "Discover opportunities", text: "Browse publicly available asset listings, service categories and provider information without signing in." },
  { icon: UserRound, title: "Act in your personal capacity", text: "When the account workflow is introduced, an individual account will represent the person participating for themselves." },
  { icon: ShieldCheck, title: "Use protected actions", text: "Enquiries, offers and other consequential actions will require the relevant sign-in, eligibility and transaction checks." },
];

export default function IndividualParticipationPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/participate" className="text-sm text-slate-300 hover:text-white">Participation</Link></div></header>
      <section className="site-container py-12 md:py-16"><Link href="/participate" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"><ArrowLeft size={15}/> All participation pathways</Link>
        <div className="mt-8 max-w-3xl"><p className="eyebrow">Individual participation</p><h1 className="section-title mt-3">Participate as yourself.</h1><p className="muted mt-4 text-sm leading-7">The individual pathway is intended for people who want to discover and engage with Marketplace opportunities in their own personal capacity. It is distinct from representing a company, institution or another legal entity.</p></div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">{capabilities.map(({icon:Icon,title,text},i)=><article key={title} className="rounded-2xl border border-[var(--line)] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f3] text-[var(--teal-dark)]"><Icon size={21}/></span><p className="mt-5 text-[10px] font-extrabold tracking-widest text-[var(--teal)]">0{i+1}</p><h2 className="mt-2 font-bold text-[var(--navy)]">{title}</h2><p className="muted mt-2 text-sm leading-6">{text}</p></article>)}</div>
        <section className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-7"><div className="flex items-start gap-3"><FileCheck2 className="mt-1 shrink-0 text-[var(--teal-dark)]" size={22}/><div><h2 className="text-lg font-bold text-[var(--navy)]">What this pathway does not establish</h2><p className="muted mt-3 text-sm leading-6">An individual account or possession of an asset does not automatically prove legal ownership or grant authority to sell an asset belonging to someone else. Any listing or transaction involving an asset will be subject to the AssetPass ownership and delegated-authority checks when those workflows are integrated.</p></div></div></section>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/search" className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white">Explore listings <ArrowRight size={15}/></Link><Link href="/services" className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--navy)]">Explore services <ArrowRight size={15}/></Link></div>
        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">Account creation, identity verification and protected actions are not yet available here. This page describes the intended pathway only.</p>
      </section>
    </main>
  );
}
