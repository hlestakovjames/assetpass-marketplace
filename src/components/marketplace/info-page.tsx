import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

type InfoSection = {
  title: string;
  body: ReactNode;
};

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
  notice,
  actionLabel = "Explore Marketplace",
  actionHref = "/",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
  notice?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="border-b border-white/10 bg-[var(--navy-deep)] text-white">
        <div className="site-container flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="AssetPass Marketplace home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--teal)] text-lg font-black">A</span>
            <span className="leading-tight"><span className="block text-base font-extrabold">AssetPass</span><span className="block text-[9px] font-bold uppercase tracking-[.2em] text-teal-300">Marketplace</span></span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 transition hover:text-white"><ArrowLeft size={15}/> Back to Marketplace</Link>
        </div>
      </header>

      <section className="bg-[var(--navy-deep)] px-6 pb-16 pt-12 text-white md:pb-20 md:pt-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-teal-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-.045em] md:text-5xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{intro}</p>
        </div>
      </section>

      <div className="site-container py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          {notice && <div className="mb-8 flex gap-3 rounded-2xl border border-teal-100 bg-teal-50 p-5 text-sm leading-6 text-teal-950"><ShieldCheck className="mt-0.5 shrink-0 text-[var(--teal-dark)]" size={19}/><p>{notice}</p></div>}
          <div className="grid gap-5">
            {sections.map((section, index) => (
              <section key={section.title} className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-[0_8px_28px_rgba(10,27,45,.035)] md:p-8">
                <p className="text-[10px] font-extrabold tracking-[.16em] text-[var(--teal-dark)]">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-[var(--navy)]">{section.title}</h2>
                <div className="muted mt-4 space-y-3 text-sm leading-7">{section.body}</div>
              </section>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[var(--navy)] p-7 text-white sm:flex-row sm:items-center md:p-9">
            <div><h2 className="text-xl font-bold">Continue exploring</h2><p className="mt-2 text-sm text-slate-300">Discover listings, services and providers across the Marketplace.</p></div>
            <Link href={actionHref} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--teal)] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--teal-dark)]">{actionLabel}<ArrowRight size={16}/></Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-[var(--line)] bg-white py-7">
        <div className="site-container flex flex-col justify-between gap-4 text-xs text-[var(--muted)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AssetPass Marketplace</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Information pages">
            <Link href="/about" className="hover:text-[var(--teal-dark)]">About</Link>
            <Link href="/help" className="hover:text-[var(--teal-dark)]">Help centre</Link>
            <Link href="/terms" className="hover:text-[var(--teal-dark)]">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--teal-dark)]">Privacy</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
