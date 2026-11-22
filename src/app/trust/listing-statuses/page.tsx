import Link from "next/link";
import { ArrowLeft, CircleCheck, CircleDashed, EyeOff, PauseCircle, XCircle } from "lucide-react";

const statuses = [
  { name: "Draft", icon: CircleDashed, meaning: "A listing being prepared. It is not publicly discoverable and is not an invitation to transact.", tone: "text-slate-600" },
  { name: "Pending review", icon: EyeOff, meaning: "Submitted for the applicable checks. It is not published while review is outstanding.", tone: "text-amber-700" },
  { name: "Published", icon: CircleCheck, meaning: "Approved for public display under the applicable Marketplace rules. Publication is not a guarantee of ownership, condition, availability or seller performance.", tone: "text-teal-700" },
  { name: "Suspended", icon: PauseCircle, meaning: "Temporarily unavailable while a concern, eligibility issue or required reassessment is handled.", tone: "text-orange-700" },
  { name: "Withdrawn", icon: XCircle, meaning: "Removed from active public discovery by the listing participant or through an authorised platform process.", tone: "text-slate-600" },
];

export default function ListingStatusesPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]"><header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/trust" className="text-sm text-slate-300 hover:text-white">Trust and safety</Link></div></header>
      <section className="site-container py-12 md:py-16"><Link href="/trust" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"><ArrowLeft size={15}/> Trust and safety</Link><p className="eyebrow mt-8">Listing lifecycle</p><h1 className="section-title mt-3">What listing statuses mean.</h1><p className="muted mt-4 max-w-2xl text-sm leading-7">A listing moves through controlled states. Its status communicates where it is in the publication lifecycle; it does not replace asset, identity, authority or transaction checks.</p>
        <div className="mt-9 space-y-3">{statuses.map(({name,icon:Icon,meaning,tone})=><article key={name} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-white p-5 md:p-6"><span className={tone}><Icon size={23}/></span><div><h2 className="font-bold text-[var(--navy)]">{name}</h2><p className="muted mt-2 text-sm leading-6">{meaning}</p></div></article>)}</div>
        <div className="mt-8 rounded-xl border border-[var(--line)] bg-white p-5"><h2 className="font-bold text-[var(--navy)]">Separate checks, separate meanings</h2><p className="muted mt-2 text-sm leading-6">Listing review, seller identity verification, proof of legal ownership and proof of delegated authority are distinct checks. Passing one does not imply that the others have passed. A published listing also does not itself transfer ownership or custody.</p></div>
        <p className="mt-7 text-xs leading-5 text-slate-500">These are proposed lifecycle definitions for the Marketplace experience. Live status management and review decisions are not implemented in this frontend phase.</p>
      </section>
    </main>
  );
}
