import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { providers, sampleProviderNotice, serviceCategories } from "@/data/services";

type SearchParams = Promise<{ q?: string; category?: string; region?: string }>;

export default async function ProvidersPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const category = params.category ?? "";
  const region = params.region ?? "";
  const results = providers.filter((provider) => {
    const matchesQuery = !query || [provider.name, provider.summary, provider.location, ...provider.specialities].join(" ").toLowerCase().includes(query);
    return matchesQuery && (!category || provider.specialities.includes(category as (typeof serviceCategories)[number])) && (!region || provider.region === region);
  });
  const accents: Record<string, string> = { mint: "bg-emerald-50 text-emerald-800", sand: "bg-amber-50 text-amber-800", blue: "bg-sky-50 text-sky-800", violet: "bg-violet-50 text-violet-800" };

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><nav className="flex gap-5 text-sm text-slate-300"><Link href="/services" className="hover:text-white">Services</Link><Link href="/" className="hover:text-white">Home</Link></nav></div></header>
      <section className="site-container py-14 md:py-20">
        <p className="eyebrow">Provider directory</p><h1 className="section-title mt-3">Discover service providers.</h1><p className="muted mt-4 max-w-2xl text-sm leading-6">Explore provider profiles by capability and region. Profiles in this phase are fictional examples for interface demonstration, not verified businesses or recommendations.</p>
        <form action="/providers" className="mt-8 grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 md:grid-cols-[1fr_240px_180px_auto] md:items-end">
          <label className="text-xs font-bold text-[var(--navy)]">Search providers<input name="q" defaultValue={params.q} placeholder="Provider, capability or location" className="mt-2 w-full rounded-lg border border-[var(--line)] px-3 py-3 text-sm font-normal outline-none focus:border-[var(--teal)]"/></label>
          <label className="text-xs font-bold text-[var(--navy)]">Speciality<select name="category" defaultValue={category} className="mt-2 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-3 text-sm font-normal"><option value="">All specialities</option>{serviceCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-xs font-bold text-[var(--navy)]">Region<select name="region" defaultValue={region} className="mt-2 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-3 text-sm font-normal"><option value="">All regions</option>{["Nairobi", "Central", "Nyanza", "Coast"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <button className="rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--teal-dark)]">Filter</button>
        </form>
        <div className="mt-10 flex items-center justify-between"><div><p className="eyebrow">Marketplace participants</p><h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">Providers to explore</h2></div><span className="text-xs text-[var(--muted)]">{results.length} examples</span></div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {results.map((provider) => <article key={provider.slug} className="rounded-2xl border border-[var(--line)] bg-white p-6"><div className="flex items-start gap-4"><span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold ${accents[provider.accent] ?? accents.mint}`}>{provider.initials}</span><div className="min-w-0 flex-1"><h3 className="text-lg font-bold text-[var(--navy)]">{provider.name}</h3><p className="muted mt-1 flex items-center gap-1 text-xs"><MapPin size={13}/>{provider.location}</p></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-600">Demo</span></div><p className="muted mt-5 text-sm leading-6">{provider.summary}</p><div className="mt-5 flex flex-wrap gap-2">{provider.specialities.map((item) => <span key={item} className="rounded-full bg-[#e8f6f3] px-3 py-1.5 text-[10px] font-semibold text-[var(--teal-dark)]">{item}</span>)}</div><Link href={`/providers/${provider.slug}`} className="mt-6 inline-flex items-center gap-2 border-t border-[var(--line)] pt-4 text-xs font-bold text-[var(--teal-dark)]">View provider profile <ArrowUpRight size={14}/></Link></article>)}
        </div>
        {results.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 className="font-bold text-[var(--navy)]">No matching providers</h3><p className="muted mt-2 text-sm">Try a different speciality, location or search term.</p><Link href="/providers" className="mt-4 inline-block text-sm font-bold text-[var(--teal-dark)]">Clear filters</Link></div>}
        <p className="mt-8 text-center text-xs text-slate-400">{sampleProviderNotice}</p>
      </section>
    </main>
  );
}
