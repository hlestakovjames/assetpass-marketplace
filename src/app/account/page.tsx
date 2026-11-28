import type { Metadata } from "next";
import { AccountHome } from "@/components/marketplace/account-home";

export const metadata: Metadata = {
  title: "Your account | AssetPass Marketplace",
  description: "Your authenticated AssetPass Marketplace account.",
  robots: { index: false, follow: false },
};

export default function AccountHomePage() {
  return <AccountHome />;
}
