import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { marketplaceServices, providers, sampleProviderNotice, serviceCategories } from "@/data/services";

type SearchParams = Promise<{ q?: string; category?: string; region?: string }>;

export default async function ServicesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const category = params.category ?? "";
  const region = params.region ?? "";
  const results = marketplaceServices.filter((service) => {
    const provider = providers.find((item) => item.slug === service.providerSlug);
    const matchesQuery = !query || [service.title, service.description, service.category, provider?.name].join(" ").toLowerCase().includes(query);
    const matchesCategory = !category || service.category === category;
    const matchesRegion = !region || provider?.region === region;
    return matchesQuery && matchesCategory && matchesRegion;
  });

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><nav className="flex gap-5 text-sm text-slate-300"><Link href="/providers" className="hover:text-white">Providers</Link><Link href="/" className="hover:text-white">Home</Link></nav></div></header>
      <section className="site-container py-14 md:py-20">
        <p className="eyebrow">Marketplace services</p><h1 className="section-title mt-3">Find support for the assets you own or manage.</h1><p className="muted mt-4 max-w-2xl text-sm leading-6">Explore service areas and illustrative provider profiles. Public discovery is open; engagement workflows will be introduced only when the relevant platform safeguards are available.</p>
        <form action="/services" className="mt-8 grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 md:grid-cols-[1fr_220px_180px_auto] md:items-end">
          <label className="text-xs font-bold text-[var(--navy)]">Search services or providers<input name="q" defaultValue={params.q} placeholder="e.g. inspection, transport" className="mt-2 w-full rounded-lg border border-[var(--line)] px-3 py-3 text-sm font-normal outline-none focus:border-[var(--teal)]" /></label>
          <label className="text-xs font-bold text-[var(--navy)]">Service category<select name="category" defaultValue={category} className="mt-2 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-3 text-sm font-normal"><option value="">All categories</option>{serviceCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-xs font-bold text-[var(--navy)]">Region<select name="region" defaultValue={region} className="mt-2 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-3 text-sm font-normal"><option value="">All regions</option>{["Nairobi", "Central", "Nyanza", "Coast"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <button className="rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--teal-dark)]">Filter</button>
        </form>
        <div className="mt-10 flex items-end justify-between gap-4"><div><p className="eyebrow">Service directory</p><h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">Explore services</h2></div><Link href="/providers" className="text-sm font-bold text-[var(--teal-dark)]">Browse providers <ArrowRight className="ml-1 inline" size={15}/></Link></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((service) => { const provider = providers.find((item) => item.slug === service.providerSlug)!; return <article key={service.slug} className="rounded-2xl border border-[var(--line)] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f3] text-[var(--teal-dark)]"><BriefcaseBusiness size={21}/></span><p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-[var(--teal-dark)]">{service.category}</p><h3 className="mt-2 text-lg font-bold text-[var(--navy)]">{service.title}</h3><p className="muted mt-3 text-sm leading-6">{service.description}</p><div className="mt-5 border-t border-[var(--line)] pt-4"><p className="text-xs font-semibold text-[var(--navy)]">{provider.name}</p><p className="muted mt-1 flex items-center gap-1 text-xs"><MapPin size={12}/>{provider.location}</p><Link href={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--teal-dark)]">View service <ArrowRight size={14}/></Link></div></article>; })}
        </div>
        {results.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 className="font-bold text-[var(--navy)]">No matching services</h3><p className="muted mt-2 text-sm">Try another search term, category or region.</p><Link href="/services" className="mt-4 inline-block text-sm font-bold text-[var(--teal-dark)]">Clear filters</Link></div>}
        <p className="mt-8 text-center text-xs text-slate-400">{sampleProviderNotice}</p>
      </section>
    </main>
  );
}
