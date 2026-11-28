import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/marketplace/password-recovery-page";

export const metadata: Metadata = {
  title: "Forgot password | AssetPass Marketplace",
  description: "Request a secure AssetPass password reset link.",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
