import type { Metadata } from "next";
import { AccountPage } from "@/components/marketplace/account-page";

export const metadata: Metadata = {
  title: "Sign in | AssetPass Marketplace",
  description: "Sign-in preview for AssetPass Marketplace.",
};

export default function SignInPage() {
  return <AccountPage mode="sign-in" />;
}
