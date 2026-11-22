import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { marketplaceServices, providerBySlug, sampleProviderNotice } from "@/data/services";

export default async function ProviderProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = providerBySlug(slug);
  if (!provider) notFound();
  const services = marketplaceServices.filter((service) => service.providerSlug === provider.slug);
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/providers" className="text-sm text-slate-300 hover:text-white">All providers</Link></div></header>
      <section className="site-container py-12 md:py-16">
        <Link href="/providers" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"><ArrowLeft size={15}/> Back to providers</Link>
        <div className="mt-7 rounded-3xl border border-[var(--line)] bg-white p-7 md:p-10"><div className="flex flex-col gap-5 sm:flex-row sm:items-start"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f6f3] text-xl font-extrabold text-[var(--teal-dark)]">{provider.initials}</span><div className="flex-1"><span className="rounded-full bg-slate-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-600">Demonstration profile · Not verified</span><h1 className="section-title mt-4">{provider.name}</h1><p className="muted mt-2 flex items-center gap-1 text-sm"><MapPin size={14}/>{provider.location}</p><p className="muted mt-5 max-w-3xl text-sm leading-7">{provider.summary}</p></div></div><div className="mt-7 flex flex-wrap gap-2">{provider.specialities.map((item) => <span key={item} className="rounded-full bg-[#e8f6f3] px-3 py-2 text-xs font-semibold text-[var(--teal-dark)]">{item}</span>)}</div></div>
        <div className="mt-10"><p className="eyebrow">Services listed</p><h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">Capabilities and service examples</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{services.map((service) => <article key={service.slug} className="rounded-2xl border border-[var(--line)] bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--teal-dark)]">{service.category}</p><h3 className="mt-2 text-lg font-bold text-[var(--navy)]">{service.title}</h3><p className="muted mt-3 text-sm leading-6">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--teal-dark)]">Service details <ArrowUpRight size={14}/></Link></article>)}</div>{services.length === 0 && <p className="muted mt-4 text-sm">No service examples are currently associated with this profile.</p>}</div>
        <p className="mt-8 text-xs leading-5 text-slate-400">{sampleProviderNotice} No contact, booking, verification or transaction action is enabled.</p>
      </section>
    </main>
  );
}
