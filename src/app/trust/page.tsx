import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileSearch, Flag, ShieldCheck } from "lucide-react";

const topics = [
  { href: "/trust/listing-statuses", icon: ClipboardCheck, title: "Listing statuses", text: "Understand the difference between a draft, a reviewed publication, a suspended listing and a withdrawn offer." },
  { href: "/trust/seller-authority", icon: FileSearch, title: "Ownership and seller authority", text: "Learn why an account, possession or organisational role is not by itself proof of the right to sell an asset." },
  { href: "/trust/reporting", icon: Flag, title: "Moderation and reporting", text: "See how concerns should be handled and why reporting or review outcomes must be recorded by the platform." },
];

export default function TrustPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/" className="text-sm text-slate-300 hover:text-white">Marketplace home</Link></div></header>
      <section className="bg-[var(--navy-deep)] pb-16 pt-10 text-white"><div className="site-container"><p className="text-xs font-bold uppercase tracking-[.18em] text-teal-300">Trust and safety</p><h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">Confidence starts with clear information.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">Understand what Marketplace listing labels mean, what seller authority requires, and how safety concerns are intended to be handled. These safeguards describe the target operating model; they are not a claim that live verification or moderation tools are active today.</p></div></section>
      <section className="site-container py-14"><div className="grid gap-5 md:grid-cols-3">{topics.map(({href,icon:Icon,title,text})=><Link key={href} href={href} className="group rounded-2xl border border-[var(--line)] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f3] text-[var(--teal-dark)]"><Icon size={22}/></span><h2 className="mt-6 text-lg font-bold text-[var(--navy)]">{title}</h2><p className="muted mt-3 text-sm leading-6">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--teal-dark)]">Read guidance <ArrowRight size={15}/></span></Link>)}</div>
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-start gap-3"><ShieldCheck className="mt-1 shrink-0 text-amber-800" size={22}/><div><h2 className="font-bold text-amber-950">Important: this is guidance, not a verification result</h2><p className="mt-2 text-sm leading-6 text-amber-950">The current Marketplace frontend uses demonstration data and has no live identity checks, seller-authority verification, moderation queue or reporting submission. A displayed listing must not be treated as verified merely because it appears on this demonstration site.</p></div></div></div>
      </section>
    </main>
  );
}
