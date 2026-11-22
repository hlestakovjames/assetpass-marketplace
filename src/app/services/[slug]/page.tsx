import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { providerBySlug, sampleProviderNotice, serviceBySlug } from "@/data/services";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const provider = providerBySlug(service.providerSlug);
  if (!provider) notFound();
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="bg-[var(--navy-deep)] text-white"><div className="site-container flex h-20 items-center justify-between"><Link href="/" className="text-lg font-extrabold">AssetPass <span className="text-teal-300">Marketplace</span></Link><Link href="/services" className="text-sm text-slate-300 hover:text-white">All services</Link></div></header>
      <section className="site-container py-12 md:py-16">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--teal-dark)]"><ArrowLeft size={15}/> Back to services</Link>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]">
          <article className="rounded-3xl border border-[var(--line)] bg-white p-7 md:p-10"><span className="rounded-full bg-[#e8f6f3] px-3 py-1.5 text-[10px] font-bold text-[var(--teal-dark)]">{service.category}</span><h1 className="section-title mt-5">{service.title}</h1><p className="muted mt-5 text-sm leading-7">{service.description}</p><div className="mt-8 border-t border-[var(--line)] pt-6"><h2 className="font-bold text-[var(--navy)]">Illustrative scope</h2><p className="muted mt-3 text-sm leading-7">{service.indicativeScope}</p><h2 className="mt-7 font-bold text-[var(--navy)]">Delivery format</h2><p className="muted mt-2 text-sm">{service.delivery}</p></div></article>
          <aside className="h-fit rounded-3xl border border-[var(--line)] bg-white p-6"><p className="eyebrow">Example provider</p><h2 className="mt-3 text-lg font-bold text-[var(--navy)]">{provider.name}</h2><p className="muted mt-2 flex items-center gap-1 text-xs"><MapPin size={13}/>{provider.location}</p><p className="muted mt-4 text-sm leading-6">{provider.summary}</p><Link href={`/providers/${provider.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--teal-dark)]">View provider profile <ArrowUpRight size={14}/></Link><div className="mt-6 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-900">Enquiries, bookings and payments are not available in this frontend-only demonstration.</div></aside>
        </div>
        <p className="mt-8 text-xs leading-5 text-slate-400">{sampleProviderNotice}</p>
      </section>
    </main>
  );
}
