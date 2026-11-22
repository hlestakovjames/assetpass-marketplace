import Link from "next/link";
import { ArrowRight, Building2, UserRound, ShieldCheck, Search, Handshake } from "lucide-react";

const pathways = [
  { href: "/participate/individuals", icon: UserRound, title: "Participate as an individual", text: "Explore opportunities in your personal capacity, discover services and prepare to engage in permitted Marketplace activities." },
  { href: "/participate/organisations", icon: Building2, title: "Participate as an organisation", text: "Represent a business, institution or other organisation where you have the appropriate authority to act." },
];

const steps = [
  { icon: Search, title: "Discover publicly", text: "Browse listings, services and providers before creating an account." },
  { icon: ShieldCheck, title: "Establish your capacity", text: "Identify whether you are acting personally or on behalf of an organisation." },
  { icon: Handshake, title: "Engage through safeguards", text: "Protected enquiries and commercial actions will follow the applicable identity, authority and transaction checks." },
];

export default function ParticipatePage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/" className="text-sm text-slate-300 hover:text-white">Home</Link></div></header>
      <section className="bg-[var(--navy-deep)] py-16 text-white md:py-20"><div className="site-container"><p className="text-[11px] font-bold uppercase tracking-[.16em] text-teal-300">Marketplace participation</p><h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">One Marketplace. Two clear ways to participate.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">Whether you are acting for yourself or representing an organisation, choose the capacity that describes how you intend to participate. Your capacity matters because permissions and responsibilities are not interchangeable.</p></div></section>
      <section className="site-container py-14 md:py-16">
        <div className="grid gap-5 md:grid-cols-2">{pathways.map(({href,icon:Icon,title,text}) => <article key={href} className="rounded-2xl border border-[var(--line)] bg-white p-7 md:p-9"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f3] text-[var(--teal-dark)]"><Icon size={23}/></span><h2 className="mt-6 text-2xl font-extrabold text-[var(--navy)]">{title}</h2><p className="muted mt-3 text-sm leading-6">{text}</p><Link href={href} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--teal-dark)]">Explore this pathway <ArrowRight size={16}/></Link></article>)}</div>
        <div className="mt-14"><p className="eyebrow">How participation works</p><h2 className="section-title mt-3">A consistent process, with the right checks.</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{steps.map(({icon:Icon,title,text},index)=><article key={title} className="rounded-2xl border border-[var(--line)] bg-white p-6"><p className="text-xs font-extrabold tracking-widest text-[var(--teal)]">0{index+1}</p><Icon className="mt-5 text-[var(--teal-dark)]" size={22}/><h3 className="mt-4 font-bold text-[var(--navy)]">{title}</h3><p className="muted mt-2 text-sm leading-6">{text}</p></article>)}</div></div>
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><strong>Demonstration phase:</strong> These pages explain the intended participation model. Account registration, identity checks, organisation verification, role assignment and protected Marketplace actions are not enabled in this frontend-only phase.</div>
      </section>
      <footer className="border-t border-[var(--line)] bg-white py-7"><div className="site-container flex flex-wrap justify-between gap-3 text-xs text-[var(--muted)]"><span>AssetPass Marketplace</span><Link href="/" className="font-semibold text-[var(--teal-dark)]">Return home</Link></div></footer>
    </main>
  );
}
