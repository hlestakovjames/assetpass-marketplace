import type { Metadata } from "next";
import { InfoPage } from "@/components/marketplace/info-page";

export const metadata: Metadata = {
  title: "About | AssetPass Marketplace",
  description: "Learn about the purpose, approach and boundaries of AssetPass Marketplace.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About the Marketplace"
      title="Discover value. Connect with confidence."
      intro="AssetPass Marketplace brings asset opportunities, service professionals and providers into one discovery experience. It is designed to make it easier to find relevant opportunities and understand the people and services around them."
      sections={[
        { title: "One place to discover", body: <><p>Explore asset listings, browse categories, find specialist services and discover providers. Public discovery is intended to be accessible without requiring an account.</p><p>When you are ready to make an enquiry or take part in a protected activity, the Marketplace will guide you to the appropriate account and verification steps.</p></> },
        { title: "Built around trustworthy information", body: <p>Marketplace information should be clear about what is known, what has been checked and what remains to be confirmed. Seller authority, listing status and relevant safeguards matter; a listing should never be treated as proof of legal ownership by itself.</p> },
        { title: "Part of the AssetPass ecosystem", body: <p>The Marketplace has a focused role. It coordinates listing discovery and, in the intended platform architecture, enquiries, offers and transaction workflows. AssetPass domain services remain authoritative for canonical asset identity, legal ownership, custody, payments, agreements and fulfilment in their respective areas.</p> },
        { title: "A frontend foundation in active development", body: <p>This standalone website currently provides the Marketplace discovery experience and illustrative sample content. Backend services, shared sign-in, live listings, payments and transaction processing are not connected in this phase. Sample listings are not live offers or verified inventory.</p> },
      ]}
      notice="The current Marketplace is a frontend preview. Do not rely on illustrative content as a live listing, verified seller claim or completed transaction."
      actionLabel="Browse the Marketplace"
    />
  );
}
