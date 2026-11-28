import type { Metadata } from "next";
import { AccountPage } from "@/components/marketplace/account-page";

export const metadata: Metadata = {
  title: "Join Marketplace | AssetPass Marketplace",
  description: "Create your AssetPass identity through the canonical App registration journey.",
};

export default function RegisterPage() {
  return <AccountPage mode="register" />;
}
