import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/marketplace";
import { categorySlug } from "@/lib/marketplace";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/" className="text-sm font-semibold text-slate-300 hover:text-white">Back to home</Link></div></header>
      <section className="site-container py-14 md:py-20">
        <p className="eyebrow">Explore by category</p><h1 className="section-title mt-3">Find opportunities across asset types.</h1><p className="muted mt-4 max-w-2xl text-sm leading-6">Start with a category to explore the kinds of assets and services the AssetPass Marketplace is designed to bring together.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => <Link key={category.name} href={`/categories/${categorySlug(category.name)}`} className="group rounded-2xl border border-[var(--line)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f3] text-2xl font-bold text-[var(--teal-dark)]">{category.icon}</span><h2 className="mt-5 text-lg font-bold text-[var(--navy)]">{category.name}</h2><p className="muted mt-2 text-sm leading-6">{category.description}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[var(--teal-dark)]">Explore category <ArrowRight size={14}/></span></Link>)}
        </div>
        <p className="mt-8 text-xs text-slate-400">Category coverage is illustrative in this frontend phase; live inventory will depend on approved backend integration.</p>
      </section>
    </main>
  );
}
