import type { Metadata } from "next";
import { AccountPage } from "@/components/marketplace/account-page";

export const metadata: Metadata = {
  title: "Sign in | AssetPass Marketplace",
  description: "Sign in to AssetPass Marketplace with your shared AssetPass account.",
};

export default function SignInPage() {
  return <AccountPage mode="sign-in" />;
}
