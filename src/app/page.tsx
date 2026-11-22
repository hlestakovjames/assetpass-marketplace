import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Compass,
  Globe2,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { ListingCard } from "@/components/marketplace/listing-card";
import { categories, featuredListings, sampleNotice } from "@/data/marketplace";

const services = [
  { icon: ShieldCheck, title: "Inspection & verification", text: "Connect with specialists who help assess assets and support informed decisions." },
  { icon: Truck, title: "Logistics & movement", text: "Find transport, handling and coordination services for asset movement." },
  { icon: BriefcaseBusiness, title: "Maintenance & support", text: "Discover professionals for repairs, servicing and ongoing asset care." },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <header className="relative z-20 border-b border-white/10 bg-[var(--navy-deep)] text-white">
        <div className="site-container flex h-[76px] items-center justify-between gap-5">
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="AssetPass Marketplace home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--teal)] text-lg font-black">A</span>
            <span className="leading-tight"><span className="block text-[17px] font-extrabold tracking-tight">AssetPass</span><span className="block text-[9px] font-bold uppercase tracking-[.2em] text-teal-300">Marketplace</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-slate-300 lg:flex" aria-label="Main navigation">
            <a className="transition hover:text-white" href="#categories">Explore</a>
            <a className="transition hover:text-white" href="#listings">Listings</a>
            <a className="transition hover:text-white" href="#services">Services</a>
            <a className="transition hover:text-white" href="#how-it-works">How it works</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/account/sign-in" className="hidden rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:inline-flex">Sign in</a>
            <a href="/account/register" className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0b8178]">Join Marketplace <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </header>

      <section className="relative isolate bg-[var(--navy-deep)] pb-24 pt-16 text-white md:pb-32 md:pt-24">
        <div className="pointer-events-none absolute -right-36 -top-44 h-[520px] w-[520px] rounded-full border border-white/[.07]" />
        <div className="pointer-events-none absolute -right-12 -top-20 h-[360px] w-[360px] rounded-full border border-white/[.07]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-500/10 blur-[100px]" />
        <div className="site-container relative grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-teal-100"><Sparkles size={14} /> A smarter way to discover and transact</div>
            <h1 className="max-w-[680px] text-[42px] font-extrabold leading-[1.06] tracking-[-.055em] sm:text-5xl md:text-[62px]">Discover value.<br /><span className="text-teal-300">Make better</span> connections.</h1>
            <p className="mt-6 max-w-[560px] text-base leading-7 text-slate-300 md:text-[17px]">Explore asset opportunities, connect with service professionals and discover providers — all in one marketplace built around trusted asset information.</p>
            <form action="/search" className="mt-9 flex max-w-[640px] flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2 text-[var(--muted)]"><Search size={19} /><input name="q" aria-label="Search Marketplace" placeholder="What are you looking for?" className="w-full min-w-0 bg-transparent text-sm text-[var(--navy)] outline-none placeholder:text-slate-400" /></div>
              <div className="hidden h-8 w-px bg-slate-200 sm:block" />
              <label className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500"><Globe2 size={15} /><select name="location" aria-label="Location" defaultValue="anywhere" className="max-w-32 bg-transparent text-xs font-semibold text-[var(--navy)] outline-none"><option value="anywhere">Anywhere</option><option value="nairobi">Nairobi</option><option value="kisumu">Kisumu</option><option value="mombasa">Mombasa</option></select><ChevronDown size={13} /></label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--teal-dark)]">Search <ArrowRight size={16} /></button>
            </form>
            <p className="mt-4 text-[11px] text-slate-400">Browse publicly. Sign in when you are ready to enquire or participate.</p>
          </div>
          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-5 rounded-[36px] bg-teal-400/10 blur-2xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-white/[.07] p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-teal-200">Marketplace overview</p><p className="mt-1 text-sm font-semibold">Opportunities across categories</p></div><span className="rounded-full bg-teal-300/10 px-3 py-1 text-[10px] font-semibold text-teal-200">Explore</span></div>
              <div className="grid grid-cols-2 gap-3 py-4">
                <div className="rounded-2xl bg-white/[.07] p-4"><Building2 className="text-teal-300" size={20} /><p className="mt-5 text-2xl font-bold">Assets</p><p className="mt-1 text-xs text-slate-400">Discover opportunities</p></div>
                <div className="rounded-2xl bg-white/[.07] p-4"><Users className="text-teal-300" size={20} /><p className="mt-5 text-2xl font-bold">Providers</p><p className="mt-1 text-xs text-slate-400">Find specialist support</p></div>
                <div className="rounded-2xl bg-white/[.07] p-4"><Compass className="text-teal-300" size={20} /><p className="mt-5 text-2xl font-bold">Services</p><p className="mt-1 text-xs text-slate-400">Get work done</p></div>
                <div className="rounded-2xl bg-white/[.07] p-4"><BadgeCheck className="text-teal-300" size={20} /><p className="mt-5 text-2xl font-bold">Trust</p><p className="mt-1 text-xs text-slate-400">Make informed choices</p></div>
              </div>
              <div className="rounded-xl border border-teal-200/15 bg-teal-300/[.08] p-4"><p className="text-xs font-semibold text-teal-100">One connected ecosystem</p><p className="mt-1 text-[11px] leading-5 text-slate-300">Marketplace discovery and services, supported by AssetPass asset information and platform safeguards.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="site-container -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-xl sm:grid-cols-3 lg:grid-cols-6 lg:p-5">
          {categories.map((category) => (
            <a key={category.name} href={`/categories/${encodeURIComponent(category.name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and"))}`} className="group rounded-xl p-3 transition hover:bg-[var(--surface)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6f3] text-xl font-bold text-[var(--teal-dark)]">{category.icon}</span>
              <p className="mt-3 text-[12px] font-bold leading-snug text-[var(--navy)] group-hover:text-[var(--teal-dark)]">{category.name}</p>
              <p className="mt-1 text-[10px] leading-4 text-[var(--muted)]">{category.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="listings" className="site-container py-20 md:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="eyebrow">Explore opportunities</p><h2 className="section-title mt-3">Featured on the Marketplace</h2><p className="muted mt-3 max-w-xl text-sm leading-6">A preview of the kinds of opportunities the Marketplace is designed to bring together.</p></div>
          <a href="/search" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--teal-dark)] hover:gap-3">Explore all listings <ArrowRight size={16} /></a>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featuredListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
        <p className="mt-4 text-center text-[10px] text-slate-400">{sampleNotice}</p>
      </section>

      <section id="services" className="bg-[var(--surface)] py-20 md:py-24">
        <div className="site-container">
          <div className="max-w-2xl"><p className="eyebrow">More than listings</p><h2 className="section-title mt-3">The services that move assets forward.</h2><p className="muted mt-4 text-sm leading-6">Find the people and capabilities that help you assess, maintain, move and manage assets with greater confidence.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{services.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[var(--line)] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f6f3] text-[var(--teal-dark)]"><Icon size={22} /></span><h3 className="mt-6 text-lg font-bold text-[var(--navy)]">{title}</h3><p className="muted mt-3 text-sm leading-6">{text}</p><a href="/services" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[var(--teal-dark)]">Explore services <ArrowUpRight size={14} /></a></article>)}</div>
        </div>
      </section>

      <section id="how-it-works" className="site-container py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div><p className="eyebrow">Designed around confidence</p><h2 className="section-title mt-3">A clearer way to participate.</h2><p className="muted mt-4 text-sm leading-6">Discover openly, understand who you are engaging with, then sign in when you want to take part in protected Marketplace activities.</p><a href="/about" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--navy)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--navy-deep)]">Learn about Marketplace <ArrowRight size={16} /></a></div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ n: "01", t: "Discover", d: "Browse listings, services and providers without an account." }, { n: "02", t: "Connect", d: "Sign in to make enquiries and engage with participants." }, { n: "03", t: "Transact", d: "Progress through permitted steps with the right checks and records." }].map((step) => <div key={step.n} className="rounded-2xl border border-[var(--line)] p-6"><p className="text-xs font-extrabold tracking-[.15em] text-[var(--teal)]">{step.n}</p><h3 className="mt-7 text-lg font-bold text-[var(--navy)]">{step.t}</h3><p className="muted mt-3 text-xs leading-5">{step.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] py-16 text-white">
        <div className="site-container flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-teal-300">Ready to take part?</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight">Your next opportunity starts here.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">Join the AssetPass Marketplace community and get ready to connect.</p></div>
          <a href="/account/register" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--teal)] px-6 py-4 text-sm font-bold text-white hover:bg-[var(--teal-dark)]">Get started <ArrowRight size={17} /></a>
        </div>
      </section>

      <footer className="bg-[#081726] py-10 text-slate-400">
        <div className="site-container flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--teal)] font-black text-white">A</span><div><p className="text-sm font-bold text-white">AssetPass Marketplace</p><p className="text-[10px]">Discover value. Connect with confidence.</p></div></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs"><a href="/about" className="hover:text-white">About</a><a href="/help" className="hover:text-white">Help centre</a><a href="/terms" className="hover:text-white">Terms</a><a href="/privacy" className="hover:text-white">Privacy</a><a href="https://assetpass.vercel.app" className="hover:text-white">AssetPass website</a></div>
          <p className="text-[10px]">© {new Date().getFullYear()} AssetPass. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
