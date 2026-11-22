import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Users, ShieldCheck, FileCheck2 } from "lucide-react";

const capabilities = [
  { icon: Building2, title: "Represent an organisation", text: "The organisation pathway is intended for businesses, institutions and other eligible entities participating through an organisation identity." },
  { icon: Users, title: "Act through authorised people", text: "A person acting for an organisation must have valid authority for the specific action. A job title or account association alone is not sufficient." },
  { icon: ShieldCheck, title: "Respect role boundaries", text: "Organisation roles and permissions will determine what an authorised representative can view, manage or submit." },
];

export default function OrganisationParticipationPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/participate" className="text-sm text-slate-300 hover:text-white">Participation</Link></div></header>
      <section className="site-container py-12 md:py-16"><Link href="/participate" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"><ArrowLeft size={15}/> All participation pathways</Link>
        <div className="mt-8 max-w-3xl"><p className="eyebrow">Organisation participation</p><h1 className="section-title mt-3">Participate on behalf of an organisation.</h1><p className="muted mt-4 text-sm leading-7">The organisation pathway is intended for entities that want to discover and engage with Marketplace opportunities using an organisation identity. People acting for that entity must be authorised to do so.</p></div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">{capabilities.map(({icon:Icon,title,text},i)=><article key={title} className="rounded-2xl border border-[var(--line)] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f3] text-[var(--teal-dark)]"><Icon size={21}/></span><p className="mt-5 text-[10px] font-extrabold tracking-widest text-[var(--teal)]">0{i+1}</p><h2 className="mt-2 font-bold text-[var(--navy)]">{title}</h2><p className="muted mt-2 text-sm leading-6">{text}</p></article>)}</div>
        <section className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-7"><div className="flex items-start gap-3"><FileCheck2 className="mt-1 shrink-0 text-[var(--teal-dark)]" size={22}/><div><h2 className="text-lg font-bold text-[var(--navy)]">Authority is action-specific</h2><p className="muted mt-3 text-sm leading-6">Organisation membership, employment, custody of an asset or general administrative access does not automatically grant authority to list or sell that asset. The platform must verify the organisation's identity and the representative's current delegated authority for each consequential action. Expired or revoked authority must not be treated as valid.</p></div></div></section>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/search" className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white">Explore listings <ArrowRight size={15}/></Link><Link href="/providers" className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--navy)]">Find providers <ArrowRight size={15}/></Link></div>
        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">Organisation registration, verification, representative invitations, role assignment and protected actions are not yet available here. This page describes the intended pathway only.</p>
      </section>
    </main>
  );
}
