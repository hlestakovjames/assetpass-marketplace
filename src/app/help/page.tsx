import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/marketplace/info-page";

export const metadata: Metadata = {
  title: "Help centre | AssetPass Marketplace",
  description: "Find guidance for discovering and participating in AssetPass Marketplace.",
};

export default function HelpPage() {
  return (
    <InfoPage
      eyebrow="Help centre"
      title="Find your way around the Marketplace."
      intro="Start with public discovery, learn how participation is intended to work, and understand what to check before engaging with a listing or provider."
      sections={[
        { title: "Can I browse without an account?", body: <p>Yes. Public visitors can explore categories, listings, services and provider information without signing in. Account access is intended for protected activities such as making enquiries and participating in permitted workflows.</p> },
        { title: "How do I join?", body: <p>Use the <Link className="font-semibold text-[var(--teal-dark)] underline" href="/account/register">Join Marketplace</Link> page to view the registration preview. Individual and organisation participation pathways are represented, but account creation is not connected to a live authentication service yet.</p> },
        { title: "What should I check before engaging with a listing?", body: <p>Read the listing details and status carefully. Confirm the identity and authority of the party offering the asset, ask for appropriate supporting information, and use the platform's formal checks when they become available. A listing, possession or account association does not by itself establish legal authority to sell.</p> },
        { title: "Are the listings and providers live?", body: <p>Not in this frontend-only phase. Featured listings and other sample content are illustrative interface examples, not live inventory, verified sellers, current prices or confirmed service availability.</p> },
        { title: "How do I report a concern?", body: <p>The Marketplace includes trust guidance explaining the intended reporting and moderation approach. The live reporting submission and moderation workflows are not connected yet. Review the <Link className="font-semibold text-[var(--teal-dark)] underline" href="/trust/reporting">reporting guidance</Link> for the current design intent.</p> },
        { title: "Where can I get account support?", body: <p>Shared AssetPass authentication and account-support channels have not yet been connected to this site. Do not send passwords or sensitive identity documents through this preview. Account recovery and support workflows will be published when the relevant services are ready.</p> },
      ]}
      notice="This help centre describes the current frontend preview and planned user journeys. It does not represent live account, support, reporting or transaction services."
      actionLabel="Explore categories"
      actionHref="/categories"
    />
  );
}
