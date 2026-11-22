import type { Metadata } from "next";
import { InfoPage } from "@/components/marketplace/info-page";

export const metadata: Metadata = {
  title: "Privacy | AssetPass Marketplace",
  description: "Understand the current privacy status and planned data boundaries of AssetPass Marketplace.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Your information deserves careful handling."
      intro="This page explains the privacy boundaries of the current frontend preview and the principles that should guide future Marketplace data processing."
      sections={[
        { title: "Current preview and form submissions", body: <p>The sign-in and registration pages are interface previews only. Submitting those forms does not send credentials to a server, create an account or persist the entered details. Do not enter real passwords or sensitive personal information into this preview.</p> },
        { title: "Illustrative Marketplace content", body: <p>Sample listings and provider content are demonstration data, not live records about verified individuals, organisations or assets. They should not be relied on to make decisions about a real person or transaction.</p> },
        { title: "Data minimisation and public information", body: <p>When live services are introduced, public listing information should be limited to fields deliberately approved for public display. Private identity documents, contact details, custody evidence, precise sensitive locations, internal notes and audit records should not be exposed as public listing data.</p> },
        { title: "Future account and transaction data", body: <p>Any future collection of account, enquiry, organisation, agreement, payment or fulfilment information must be supported by an approved purpose, appropriate access controls, retention rules and security safeguards. The relevant AssetPass domain should remain responsible for its authoritative records.</p> },
        { title: "Cookies, analytics and third parties", body: <p>This repository does not currently document a production analytics, advertising, cookie-consent or third-party data-sharing configuration. Those disclosures must be reviewed and added if such services are introduced. This page should not be read as a claim that a complete production privacy programme is already operating.</p> },
        { title: "Your choices and privacy contact", body: <p>Live processes for access, correction, deletion, objection, complaints and privacy enquiries have not yet been connected or published. The responsible data controller, contact channel, retention schedule and applicable legal disclosures must be confirmed before live account and transaction data is processed.</p> },
      ]}
      notice="Privacy status: this is an interim transparency page for a frontend-only preview, not a final privacy notice. A legally reviewed notice and confirmed data-controller contact details are required before live data collection."
      actionLabel="Return to Marketplace"
    />
  );
}
