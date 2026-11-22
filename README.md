# AssetPass Marketplace

Standalone Marketplace frontend for the AssetPass ecosystem.

## Current foundation

This repository provides a dedicated, mobile-first Next.js Marketplace experience for public discovery across asset listings, services and providers, with category navigation, search, trust guidance and participant pathways.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Routes in this phase

- Marketplace homepage, search, category directory/details and listing details.
- Service directory/details and provider directory/profiles.
- Participation overview, individual and organisation pathways, and getting-started guide.
- Trust guidance for listing statuses, seller authority and reporting.
- Account entry screens: `/account/sign-in` and `/account/register`.
- Information pages: `/about`, `/help`, `/terms` and `/privacy`.

The account screens are frontend previews only. They do not create accounts, authenticate users, send credentials, or connect to shared AssetPass authentication. Form submission displays a clear notice and does not transmit or store the entered details.

The About and Help Centre pages describe the product's current purpose and preview status. Terms and Privacy are explicitly interim informational pages, not final legally reviewed documents. Final legal terms, privacy disclosures, data-controller contact details and operational support processes must be approved before live services or personal-data processing begin.

## Important implementation boundaries

This is a frontend foundation only. It is not integrated with the AssetPass backend, shared authentication, database, payments, or other AssetPass applications.

- Marketplace owns listing presentation and, in the target architecture, listing lifecycle, discovery, enquiries, offers and transaction coordination.
- The Asset domain remains authoritative for canonical asset identity, legal ownership, custody and lifecycle.
- Financial services own payment records and provider interactions.
- Agreements own agreement records and status.
- Fulfilment owns delivery and handover progress.
- Organisation governance determines whether a participant has authority to act for an organisation.
- Platform Administration owns Marketplace moderation, policy, oversight and analytics.

A listing is an offer to transact, not the asset record. A listing or accepted offer does not itself transfer ownership or custody. Payment status is not proof of asset transfer. The Marketplace frontend must never independently imply or perform a canonical ownership/custody transfer.

## Demonstration data

Featured cards are illustrative UI examples only. They are not live AssetPass records, verified sellers, available inventory or current offers. Replace them with API-backed data only after the relevant backend contracts and integration plan are approved.

## Integration preparation

The frontend/backend boundary, domain ownership, public/private data rules, identity and organisation authority expectations, conceptual API contract surface, error states, mock-fixture plan, and proposed future integration sequence are documented in [Marketplace frontend integration preparation](docs/integration/marketplace-frontend-contracts.md). This is documentation only: no API, shared authentication, database, payment, transaction, or ownership/custody integration is implemented or authorized in this phase. A separate approval is required before integration begins.

## Deployment

No production API URL, shared auth configuration, or custom domain is set. Deployment target and domain configuration will be handled in a later, explicitly approved phase.
