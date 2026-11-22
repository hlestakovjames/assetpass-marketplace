import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AssetPass Marketplace | Discover assets, services and providers",
  description:
    "Explore asset opportunities, services and trusted providers across the AssetPass Marketplace.",
  applicationName: "AssetPass Marketplace",
  icons: { icon: [{ url: "/brand/Assetpass%20Marketplace%20icon.png", type: "image/png" }] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
