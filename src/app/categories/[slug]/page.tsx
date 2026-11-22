import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/marketplace/listing-card";
import { sampleNotice } from "@/data/marketplace";
import { getCategoryBySlug, searchListings } from "@/lib/marketplace";

type CategoryPageProps = { params: Promise<{ slug: string }> };

export function generateMetadata({ params }: CategoryPageProps) {
  return params.then(({ slug }) => {
    const category = getCategoryBySlug(slug);
    return { title: category ? `${category.name} | AssetPass Marketplace` : "Category | AssetPass Marketplace" };
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const listings = searchListings("", category.name);

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/categories" className="text-sm font-semibold text-slate-300 hover:text-white">All categories</Link></div></header>
      <section className="site-container py-14">
        <p className="eyebrow">Marketplace category</p><h1 className="section-title mt-3">{category.name}</h1><p className="muted mt-3 max-w-2xl text-sm leading-6">{category.description}. Browse the illustrative examples below or search across the Marketplace.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href={`/search?category=${encodeURIComponent(category.name)}`} className="rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white">Search this category</Link><Link href="/search" className="rounded-lg border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--navy)]">All listings</Link></div>
        <div className="mt-10 flex items-end justify-between"><h2 className="text-xl font-bold text-[var(--navy)]">Examples in this category</h2><span className="text-xs text-[var(--muted)]">{listings.length} preview items</span></div>
        {listings.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{listings.map((listing) => <ListingCard key={listing.id} listing={listing}/>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-9 text-center"><p className="font-bold text-[var(--navy)]">No preview items in this category yet</p><p className="muted mt-2 text-sm">This does not indicate whether live inventory exists.</p></div>}
        <p className="mt-6 text-center text-[10px] text-slate-400">{sampleNotice}</p>
      </section>
    </main>
  );
}
