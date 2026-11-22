"use client";

import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import type { Listing } from "@/data/marketplace";

const artwork: Record<string, string> = {
  mint: "from-[#d9f2ec] via-[#eaf6f2] to-[#c9e6df]",
  sand: "from-[#f3e8d5] via-[#f8f3e9] to-[#e8d9c2]",
  blue: "from-[#dce9f6] via-[#eef3f9] to-[#cadced]",
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${artwork[listing.accent] ?? artwork.mint}`}>
        <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--navy)]">
          Demonstration
        </div>
        <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/80 bg-white/55 text-2xl font-black tracking-tight text-[var(--navy)] shadow-sm transition group-hover:scale-105">
          {listing.initials}
        </div>
        <span className="absolute bottom-4 right-4 rounded-full bg-white/85 p-2 text-[var(--navy)]"><ArrowUpRight size={17} /></span>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-[var(--teal-dark)]">{listing.category}</p>
        <h3 className="mt-2 min-h-12 text-[17px] font-bold leading-snug text-[var(--navy)]">{listing.title}</h3>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--muted)]"><MapPin size={13} />{listing.location}</div>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-4">
          <div><p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Pricing</p><p className="mt-1 text-sm font-bold text-[var(--navy)]">{listing.price}</p></div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--muted)]"><ShieldCheck size={13} /> {listing.condition}</span>
        </div>
      </div>
    </article>
  );
}
