import Image from "next/image";
import Link from "next/link";

export function MarketplaceBrand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`relative flex shrink-0 items-center gap-3 ${className}`}
      aria-label="AssetPass Marketplace home"
    >
      <Image
        src="/brand/Assetpass%20Marketplace%20icon.png"
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 object-contain"
        priority
      />
      <span className="leading-tight">
        <span className="block text-base font-extrabold">AssetPass</span>
        <span className="block text-[9px] font-bold uppercase tracking-[.2em] text-teal-300">Marketplace</span>
      </span>
    </Link>
  );
}
