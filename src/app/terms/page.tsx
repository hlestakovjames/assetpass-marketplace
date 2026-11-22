import type { Metadata } from "next";
import { InfoPage } from "@/components/marketplace/info-page";

export const metadata: Metadata = {
  title: "Terms | AssetPass Marketplace",
  description: "Current use guidance and draft terms status for AssetPass Marketplace.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Terms of use"
      title="Using AssetPass Marketplace."
      intro="These notes explain the intended boundaries of the current Marketplace preview. They are not a final legal agreement or a substitute for approved platform terms."
      sections={[
        { title: "Current preview status", body: <p>This website is a frontend foundation. Some pages and forms demonstrate intended user journeys, while listings and provider information may be illustrative. No account is created and no enquiry, offer, payment or transaction is submitted through the preview.</p> },
        { title: "Use information responsibly", body: <p>Do not treat sample content as a live offer, verified inventory, professional endorsement, confirmed availability or guarantee. Independently assess information and obtain appropriate professional advice before making a real-world decision.</p> },
        { title: "Listings and authority", body: <p>In the intended Marketplace model, a listing is an offer to transact and is not the canonical asset record. A person should list or sell an asset only where they are the current legal owner or hold explicit, valid authority to do so. Custody, possession, organisational membership or account access alone does not establish sale authority.</p> },
        { title: "Transactions and transfers", body: <p>A listing or accepted offer does not itself transfer legal ownership or custody. Payment status is not proof that an asset has been transferred. Any future transaction workflow must follow the applicable agreements, verification, payment, fulfilment and authoritative AssetPass domain processes.</p> },
        { title: "Prohibited misuse", body: <p>Do not attempt to misrepresent identity or authority, submit misleading listings, misuse another person&apos;s information, interfere with platform security, or use the service for unlawful activity. Detailed enforcement rules and remedies will be set out in the approved terms before live transactional services launch.</p> },
        { title: "Final terms", body: <p>Formal terms, governing law, liability provisions, dispute handling, user responsibilities and service-specific conditions require legal and product approval before the Marketplace launches live services. This page is a clearly labelled interim explanation, not that final instrument.</p> },
      ]}
      notice="Draft / preview notice: these statements are informational product guidance only. Final legally reviewed Terms of Use have not yet been published."
      actionLabel="Read trust guidance"
      actionHref="/trust"
    />
  );
}
