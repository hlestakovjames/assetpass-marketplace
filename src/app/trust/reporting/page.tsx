import Link from "next/link";
import { ArrowLeft, ClipboardList, Flag, SearchCheck, ShieldCheck } from "lucide-react";

const stages = [
  { icon: Flag, title: "Concern is raised", text: "A participant identifies a potentially misleading listing, suspected unauthorised sale, prohibited content or another Marketplace concern." },
  { icon: ClipboardList, title: "The report is recorded", text: "A future reporting workflow should capture the relevant listing, reason, supporting information and submission time while limiting unnecessary personal data." },
  { icon: SearchCheck, title: "An authorised reviewer assesses it", text: "Platform moderators review the concern, preserve an audit trail and apply the relevant policy. A report alone is not proof that an allegation is true." },
  { icon: ShieldCheck, title: "A proportionate decision is applied", text: "Where justified, the platform may request information, restrict visibility, suspend a listing or take another policy-authorised action. Decisions should be recorded and reviewable." },
];

export default function ReportingPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]"><header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/trust" className="text-sm text-slate-300 hover:text-white">Trust and safety</Link></div></header>
      <section className="site-container py-12 md:py-16"><Link href="/trust" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"><ArrowLeft size={15}/> Trust and safety</Link><p className="eyebrow mt-8">Moderation and reporting</p><h1 className="section-title mt-3">Concerns need a responsible review process.</h1><p className="muted mt-4 max-w-2xl text-sm leading-7">A credible moderation process needs a recorded report, an authorised reviewer, a proportionate decision and an audit trail. It must also distinguish an allegation from a finding.</p>
        <div className="mt-9 space-y-4">{stages.map(({icon:Icon,title,text},i)=><article key={title} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-white p-5 md:p-6"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f6f3] text-[var(--teal-dark)]"><Icon size={21}/></span><div><p className="text-[10px] font-extrabold tracking-widest text-[var(--teal)]">0{i+1}</p><h2 className="mt-1 font-bold text-[var(--navy)]">{title}</h2><p className="muted mt-2 text-sm leading-6">{text}</p></div></article>)}</div>
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5"><h2 className="font-bold text-amber-950">Reporting is not active in this phase</h2><p className="mt-2 text-sm leading-6 text-amber-950">This page is explanatory only. There is no report-submission form, moderation queue, automated suspension or operational response-time commitment in the current standalone frontend.</p></div>
      </section>
    </main>
  );
}
