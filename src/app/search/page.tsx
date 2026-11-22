import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ListingCard } from "@/components/marketplace/listing-card";
import { categories, sampleNotice } from "@/data/marketplace";
import { searchListings } from "@/lib/marketplace";

type SearchPageProps = {
  searchParams: Promise<{ q?: string; location?: string; category?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const category = params.category ?? "";
  const listings = searchListings(query, category || undefined);
  const selectedCategory = categories.find((item) => item.name === category);

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white">
        <div className="site-container flex h-20 items-center justify-between">
          <Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link>
          <Link href="/" className="text-sm font-semibold text-slate-300 hover:text-white">Back to home</Link>
        </div>
      </header>
      <section className="bg-white py-12">
        <div className="site-container">
          <p className="eyebrow">Marketplace discovery</p>
          <h1 className="section-title mt-3">Find what you are looking for.</h1>
          <form action="/search" className="mt-7 flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-white p-3 shadow-sm sm:flex-row">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-3"><Search size={18} className="text-[var(--muted)]" /><input name="q" defaultValue={query} placeholder="Search assets, categories or locations" aria-label="Search listings" className="w-full bg-transparent py-3 text-sm text-[var(--navy)] outline-none" /></label>
            <select name="category" defaultValue={category} aria-label="Filter by category" className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--navy)]"><option value="">All categories</option>{categories.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}</select>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--teal-dark)]"><SlidersHorizontal size={16} /> Search</button>
          </form>
        </div>
      </section>
      <section className="site-container py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="text-xl font-bold text-[var(--navy)]">{selectedCategory?.name ?? (query ? `Results for “${query}”` : "Explore listings")}</h2><p className="muted mt-2 text-sm">{listings.length} demonstration {listings.length === 1 ? "result" : "results"} in this preview</p></div>
          <Link href="/categories" className="text-sm font-bold text-[var(--teal-dark)]">Browse categories</Link>
        </div>
        {listings.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div> : <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-bold text-[var(--navy)]">No matching demonstration listings</p><p className="muted mt-2 text-sm">Try a different search term or remove the category filter.</p><Link href="/search" className="mt-5 inline-flex rounded-lg bg-[var(--navy)] px-5 py-3 text-sm font-bold text-white">Clear search</Link></div>}
        <p className="mt-6 text-center text-[10px] text-slate-400">{sampleNotice}</p>
      </section>
    </main>
  );
}
