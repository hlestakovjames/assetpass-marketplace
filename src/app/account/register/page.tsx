import type { Metadata } from "next";
import { AccountPage } from "@/components/marketplace/account-page";

export const metadata: Metadata = {
  title: "Join Marketplace | AssetPass Marketplace",
  description: "Registration preview for AssetPass Marketplace.",
};

export default function RegisterPage() {
  return <AccountPage mode="register" />;
}
