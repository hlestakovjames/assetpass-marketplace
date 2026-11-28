import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/marketplace/password-recovery-page";

export const metadata: Metadata = {
  title: "Reset password | AssetPass Marketplace",
  description: "Set a new password for your AssetPass account.",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
