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
npm run dev -- -p 3002
```

Open http://localhost:3002.

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
- Shared identity account routes: `/account/sign-in`, `/account/register`, `/account`, `/account/security`, `/account/forgot-password` and `/reset-password`.
- Information pages: `/about`, `/help`, `/terms` and `/privacy`.

Marketplace sign-in, session restoration, refresh, logout, password recovery and signed-in password change are implemented against the shared AssetPass backend identity contract through the same-origin BFF on `development/architecture-alignment` (PR #15). The Marketplace account uses its own host-only browser session for the same central AssetPass identity; it does not share cookies with the App origin. Registration redirects to the canonical AssetPass App registration journey; Marketplace does not maintain a reduced duplicate registration form. Public discovery remains available without signing in. The merged Marketplace authentication commit passed its Vercel preview build. Live browser validation against the deployed backend remains pending exact Vercel origin configuration, backend `TRUSTED_ORIGINS` configuration and end-to-end session/email checks.

The About and Help Centre pages describe the product's current purpose and preview status. Terms and Privacy are explicitly interim informational pages, not final legally reviewed documents. Final legal terms, privacy disclosures, data-controller contact details and operational support processes must be approved before live services or personal-data processing begin.

## Important implementation boundaries

This is a frontend foundation with Phase 1 shared authentication code integrated on the development branch. Marketplace listing, transaction, payment, agreement, fulfilment and canonical asset integrations remain unimplemented and belong to later approved phases.

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

The frontend/backend boundary, domain ownership, public/private data rules, identity and organisation authority expectations, conceptual API contract surface, error states, mock-fixture plan, and proposed future integration sequence are documented in [Marketplace frontend integration preparation](docs/integration/marketplace-frontend-contracts.md). The document remains authoritative for Marketplace domain integrations. Phase 1 shared authentication is separately approved and described in the authentication section of this contract. Listing, transaction, payment and ownership/custody integration still require their own approved contracts and implementation work.

## Deployment

For each deployment, configure server-only `ASSET_PASS_BACKEND_ORIGIN` (HTTPS backend origin in production) and `ASSET_PASS_PUBLIC_ORIGIN` (the exact Marketplace origin), plus `NEXT_PUBLIC_ASSETPASS_APP_ORIGIN` for the canonical registration link. The backend `APP_ORIGIN` should remain the canonical App origin, while backend `TRUSTED_ORIGINS` must include both the exact App and Marketplace origins. Password-reset requests forward the Marketplace `Origin`; the backend uses it only when it exactly matches a trusted origin, so the reset email returns to the correct host. Configure these values in the Vercel environment for the intended deployment; missing production BFF origins intentionally return 503. Do not hardcode a future custom domain.
