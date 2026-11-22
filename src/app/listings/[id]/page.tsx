import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ShieldCheck } from "lucide-react";
import { featuredListings, sampleNotice } from "@/data/marketplace";

type ListingPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = featuredListings.find((item) => item.id === id);
  return { title: listing ? `${listing.title} | AssetPass Marketplace` : "Listing | AssetPass Marketplace" };
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = featuredListings.find((item) => item.id === id);
  if (!listing) notFound();

  const artwork: Record<string, string> = {
    mint: "from-[#d9f2ec] via-[#eaf6f2] to-[#c9e6df]",
    sand: "from-[#f3e8d5] via-[#f8f3e9] to-[#e8d9c2]",
    blue: "from-[#dce9f6] via-[#eef3f9] to-[#cadced]",
  };

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/search" className="text-sm font-semibold text-slate-300 hover:text-white">Explore listings</Link></div></header>
      <section className="site-container py-10">
        <Link href="/search" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"><ArrowLeft size={15}/> Back to results</Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className={`relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-white bg-gradient-to-br ${artwork[listing.accent] ?? artwork.mint} md:min-h-[460px]`}><span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--navy)]">Demonstration listing</span><span className="text-6xl font-black tracking-tight text-[var(--navy)]/70">{listing.initials}</span></div>
          <article className="rounded-3xl border border-[var(--line)] bg-white p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--teal-dark)]">{listing.category}</p><h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[var(--navy)]">{listing.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-sm text-[var(--muted)]"><MapPin size={16}/>{listing.location}</p>
            <div className="mt-7 rounded-2xl bg-[var(--surface)] p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Indicative pricing</p><p className="mt-2 text-xl font-extrabold text-[var(--navy)]">{listing.price}</p><p className="mt-2 text-xs text-[var(--muted)]">No actual offer or price is being represented.</p></div>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[var(--muted)]"><ShieldCheck size={16} className="text-[var(--teal)]"/>{listing.condition}</div>
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">This is sample interface content only. It is not a live asset, verified seller, availability statement or transaction offer.</div>
            <button type="button" disabled className="mt-7 w-full cursor-not-allowed rounded-xl bg-slate-200 px-5 py-4 text-sm font-bold text-slate-500">Enquiries will be enabled after authentication integration</button>
          </article>
        </div>
        <p className="mt-8 text-center text-[10px] text-slate-400">{sampleNotice}</p>
      </section>
    </main>
  );
}
