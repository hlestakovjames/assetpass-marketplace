# AssetPass Marketplace

The standalone Marketplace experience for the AssetPass ecosystem.

## Purpose

AssetPass Marketplace is a multi-sided marketplace for discovering and engaging with asset listings, services, sellers, and providers. It supports public discovery and, in later phases, authenticated participant journeys for individuals and organisations.

This repository owns the Marketplace frontend experience. It does not own canonical asset identity, legal ownership, custody, payment settlement, agreements, fulfilment, or organisation authority.

## Architecture boundaries

- **Marketplace:** listing presentation and lifecycle, discovery, enquiries, offers, and transaction coordination.
- **Asset domain:** canonical asset identity, legal ownership, custody, and lifecycle.
- **Financial domain:** payment records and provider interactions.
- **Agreement domain:** agreements and their authoritative status.
- **Fulfilment domain:** delivery and handover progress.
- **Organisation governance:** authority for users acting on behalf of organisations.
- **Platform Administration:** moderation, policy, oversight, and platform analytics.

A listing is an offer to transact, not an asset record. A listing or accepted offer does not itself transfer ownership or custody. Payment status is not proof of asset transfer. The Marketplace must not directly mutate asset ownership or custody records.

## Current phase

The initial foundation is intentionally frontend-only and uses clearly labelled demonstration content. No backend integration, shared authentication/session, database access, payment provider, or ownership/custody operation is configured in this phase.

## Planned stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Responsive, mobile-first interface

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app is expected to run at http://localhost:3000.

## Domain and deployment

No custom production domain is configured. The eventual deployment URL and any custom domain will be confirmed separately.
