import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileKey2, ShieldAlert, XCircle } from "lucide-react";

const required = [
  "Identify the legal owner of the asset using authoritative records and evidence appropriate to the asset and transaction.",
  "If acting for another owner, hold explicit, current delegated authority that covers the specific action being requested.",
  "Reassess authority when material facts change, including expiry, revocation, ownership change or a change in the proposed transaction.",
];
const insufficient = [
  "Possession, physical custody or control of the asset.",
  "Being an employee, member, director or general administrator without relevant delegated authority.",
  "Having an AssetPass account, registering an asset, or being associated with an organisation.",
];

export default function SellerAuthorityPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]"><header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/trust" className="text-sm text-slate-300 hover:text-white">Trust and safety</Link></div></header>
      <section className="site-container py-12 md:py-16"><Link href="/trust" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"><ArrowLeft size={15}/> Trust and safety</Link><p className="eyebrow mt-8">Ownership and authority</p><h1 className="section-title mt-3">The right to list must be established.</h1><p className="muted mt-4 max-w-2xl text-sm leading-7">A Marketplace account can identify who is participating, but it cannot by itself establish that the participant owns an asset or may sell it. The platform must validate the legal basis for each consequential action.</p>
        <div className="mt-9 grid gap-5 md:grid-cols-2"><article className="rounded-2xl border border-teal-200 bg-white p-6"><div className="flex items-center gap-3"><CheckCircle2 className="text-teal-700" size={22}/><h2 className="font-bold text-[var(--navy)]">What must be established</h2></div><ul className="mt-5 space-y-4">{required.map(item=><li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><FileKey2 className="mt-1 shrink-0 text-teal-700" size={17}/>{item}</li>)}</ul></article>
          <article className="rounded-2xl border border-rose-200 bg-white p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-rose-700" size={22}/><h2 className="font-bold text-[var(--navy)]">What is not enough on its own</h2></div><ul className="mt-5 space-y-4">{insufficient.map(item=><li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><XCircle className="mt-1 shrink-0 text-rose-700" size={17}/>{item}</li>)}</ul></article></div>
        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-bold text-[var(--navy)]">Keep the records and responsibilities distinct</h2><p className="muted mt-2 text-sm leading-6">The Marketplace listing is an offer to transact, not the canonical asset record. The Asset domain remains authoritative for asset identity, legal ownership, custody and lifecycle. Marketplace actions must not independently alter those records. Any eventual transfer must use the authorised Asset domain process and its required checks and acknowledgements.</p></div>
        <p className="mt-7 text-xs leading-5 text-slate-500">This page explains the intended safeguards. No ownership evidence or delegated authority is being checked by this standalone frontend yet.</p>
      </section>
    </main>
  );
}
