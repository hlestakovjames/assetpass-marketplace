# Marketplace frontend integration preparation

**Status:** Phase 1 shared-authentication integration is authorized and in progress; Marketplace domain/data integration remains preparation only.

This document defines the proposed boundary between the standalone AssetPass Marketplace frontend and the wider AssetPass platform. It is a contract proposal for review with the owning backend/domain teams. It does not assert that any endpoint, schema, permission, event, or service currently exists.

## 1. Scope and non-goals

In scope:
- frontend/backend responsibility boundaries;
- public and protected route expectations;
- shared identity, authentication/session integration and organisation participation context;
- authorization and delegated seller authority;
- listing, enquiry, offer, transaction, payment, agreement, fulfilment and transfer boundaries;
- public-data and media exposure rules;
- frontend state/error expectations;
- proposed integration sequence and acceptance checks.

Out of scope:
- Marketplace domain API implementation or backend changes beyond the approved Phase 1 shared-authentication boundary;
- database access or schema migrations;
- live listing creation, verification, moderation or publication;
- enquiries, offers, transactions or payment processing;
- ownership/custody changes, asset transfer or production deployment.

All current sample content remains demonstration data until a reviewed contract and approved integration are implemented.

## 2. Domain ownership and system boundaries

| Capability / record | Authoritative owner | Marketplace frontend responsibility |
|---|---|---|
| Marketplace listing and listing status | Marketplace domain | Render public-safe listing data; later submit permitted listing commands through Marketplace APIs |
| Search, category and provider discovery | Marketplace domain | Search and present approved discovery results |
| Canonical asset identity and asset lifecycle | Asset domain | Display only fields explicitly released for Marketplace use |
| Legal ownership and custody | Asset domain | Display approved claims/status; never infer or mutate ownership/custody |
| Seller identity and delegated organisation authority | Identity / Organisation Governance domain | Present verified actor context and authority outcomes returned by the platform |
| Enquiries, offers and transaction coordination | Marketplace domain | Render state and submit authorized commands after integration |
| Payment records and provider callbacks | Financial / Payments domain | Display authoritative payment state; never treat payment as proof of transfer |
| Agreements and signatures/status | Agreement domain | Present agreement workflow and authoritative status |
| Delivery, collection and handover | Fulfilment domain | Present progress and next permitted actions |
| Moderation, reporting, policy and oversight | Platform Administration | Present public reporting routes and moderation outcomes that are explicitly public |
| Authentication and sessions | Shared identity/authentication platform | Consume approved session/client contract; do not create a separate Marketplace identity system |

The Marketplace may coordinate a commercial journey, but it must not become the system of record for asset ownership, custody, payment settlement, agreements, fulfilment or organisation authority.

## 3. Identity, access and route classes

### Public routes

Public visitors should be able to:
- browse published listings and their public details;
- browse categories, services and public provider profiles;
- read participation, trust, listing-status and seller-authority guidance;
- use public search and filters.

Public pages must not require an account merely to discover available content.

### Protected participant actions

Authentication may be required for actions such as submitting an enquiry, making an offer, managing a listing, or viewing private transaction information. The exact action-to-permission matrix must be agreed with backend and governance owners before wiring controls.

An authenticated person does not need to activate a separate Individual Workspace merely to participate in permitted Marketplace actions. Workspace navigation is not an authorization grant.


### Phase 1 — shared authentication integration

The Marketplace sign-in experience must authenticate against the same AssetPass backend identity service used by the authenticated App. It must not create a separate Marketplace user table, password store or independent credential system.

- Public Marketplace discovery remains available without signing in.
- Protected participant actions require a valid authenticated session and the relevant Marketplace entitlement/permission.
- Marketplace sign-in uses the shared backend login, CSRF bootstrap, refresh, logout and current-identity contracts.
- Marketplace registration links to the canonical AssetPass App registration journey. Do not maintain a reduced duplicate registration form in Marketplace.
- The Marketplace Next.js server exposes a same-origin BFF proxy for the approved `/api/v1/*` backend contract. The BFF validates the exact public origin and forwards it to the backend trusted-origin guard.
- Refresh cookies remain host-only, HttpOnly, Secure in production, SameSite=Lax and scoped to the auth path. The App and Marketplace have independent session families for the same central identity; this does not claim cross-application single sign-on.
- Access tokens remain in memory. Refresh tokens are never written to browser storage.
- Password recovery and signed-in password change use the shared backend account-security service and cannot bypass account approval/status.

The detailed BFF, cookie, CSRF, session and environment contract is maintained in the [Shared Browser Authentication Architecture](https://github.com/hlestakovjames/assetpass-docs/blob/development/architecture-alignment/identity/shared-browser-authentication-architecture.md).

### Organisation context

When acting for an organisation, the user must select or otherwise establish the organisation context using the platform-approved identity/governance contract. The backend must validate:
- the user's current membership/relationship;
- the specific organisation;
- the action being requested;
- the user's current delegated authority and its scope;
- expiry, revocation and relevant approval requirements.

Membership, employment, custody, possession, account linkage, workspace access or general administration alone does not establish authority to sell an asset.

## 4. Seller authority and asset safeguards

A seller must be the current legal owner or hold explicit, current delegated authority covering the requested listing and sale.

Authority must be validated by the authoritative backend at least:
1. when a listing is submitted for publication;
2. before consequential offer/transaction progression;
3. again when ownership, authority, expiry or revocation changes may affect the listing.

A failed, expired, revoked or superseded authority check must prevent the affected consequential action and may require the listing to be restricted, suspended or unpublished according to Marketplace policy.

A listing is an offer to transact, not a canonical asset record. Neither a listing nor an accepted offer transfers ownership or custody. Payment completion is not proof of transfer.

The Marketplace must never directly write to Asset domain ownership or custody records. A future transfer flow must invoke an authoritative, atomic Asset-domain operation only after all required checks, agreement/payment/fulfilment prerequisites and recipient acknowledgement have been satisfied. The Asset domain remains responsible for the authoritative transfer result.

## 5. Proposed frontend contract surface

The following are conceptual resources, not existing endpoint names. Backend owners must confirm actual routes, methods, payloads, identifiers, pagination and versioning before implementation.

| Conceptual resource | Read / command intent | Contract owner |
|---|---|---|
| Public listing search and listing detail | Read published, public-safe listing projections | Marketplace |
| Public categories, services and providers | Read approved discovery projections | Marketplace / relevant service directory |
| Participant identity context | Read current authenticated actor and available context | Identity |
| Organisation authority context | Read eligible organisations and action-specific authority outcomes | Organisation Governance |
| Listing management | Create/update/submit/withdraw listing commands | Marketplace, with Asset and Governance checks |
| Enquiry | Create and read participant-authorized enquiries | Marketplace |
| Offer | Create, revise, accept, reject or withdraw offers subject to policy | Marketplace |
| Transaction summary | Read authorized transaction state and permitted next actions | Marketplace |
| Payment status | Read payment state and references safe for the current actor | Financial / Payments |
| Agreement | Read agreement and submit permitted agreement actions | Agreement |
| Fulfilment | Read and update permitted delivery/handover steps | Fulfilment |
| Ownership/custody transfer | Request authoritative transfer after prerequisite validation | Asset domain |

### Contract requirements

Every contract should specify:
- stable resource identifiers and relationship semantics;
- actor and organisation context where relevant;
- required permission/authority checks performed server-side;
- validation errors in a consistent machine-readable shape;
- pagination, filtering, sorting and search behavior;
- idempotency for retryable consequential commands;
- concurrency/version handling for state transitions;
- timestamps, timezone and currency conventions;
- audit/event behavior and correlation identifiers;
- data classification and field-level exposure;
- API versioning and backward-compatibility policy.

The frontend must not treat a hidden button or client-side role flag as authorization. The backend must independently authorize every consequential request.

## 6. Public data and private evidence

Use an explicit allowlist for public listing fields. A candidate public projection may include:
- listing identifier and public title;
- approved category and description;
- approved photographs/media;
- broad location only where publication is authorized;
- asking price or price guidance only where the seller has elected to publish it;
- listing status and publication dates where policy permits;
- approved seller display name/type and public profile link.

Never expose through public listing responses or public media:
- passport, national ID or other identity-document images/numbers;
- private seller contact details;
- private ownership, acquisition or custody evidence;
- exact storage/location coordinates or security-sensitive facility details;
- internal valuation, cost basis or confidential financial information;
- internal risk flags, moderation notes, audit logs or staff-only comments;
- private organisation records or authority evidence;
- payment credentials, provider secrets or private transaction documents.

Private evidence must use a protected storage/access path with authorization checks, short-lived access where appropriate, auditability and retention rules agreed by the owning domain. Do not place private evidence URLs in public HTML, metadata, JSON-LD, analytics events or client logs.

## 7. Frontend state and error contract

Every API-backed view should define loading, success, empty, partial and failure states. Do not show sample content as though it were live data.

| Condition | Expected frontend behavior |
|---|---|
| Loading | Show a stable skeleton/progress state without implying availability |
| Empty search/category | Explain that no matching published results were returned; offer filter reset |
| Unpublished or unavailable listing | Show a safe unavailable state; do not reveal private moderation reasons |
| Unauthenticated | Preserve intended destination where safe and request approved sign-in flow |
| Authenticated but unauthorized | Explain that the action is not permitted; do not infer missing authority |
| Authority expired/revoked | Stop the action and refresh authoritative context |
| Validation failure | Map field-level errors without discarding safe user input |
| Conflict / stale state | Refresh resource state and require explicit user confirmation before retry |
| Rate limited | Respect server retry guidance and prevent repeated submissions |
| Network/server failure | Show retry guidance; do not fabricate a successful state |
| Payment pending/failed | Display the authoritative payment state; do not mark the transaction transferred |
| Transfer pending/failed | Display Asset-domain outcome; never optimistically mark ownership/custody changed |

For consequential commands, use server-confirmed state, idempotency keys where supported, and explicit confirmation for irreversible actions. Avoid optimistic UI that suggests a legal, financial or custody transition has completed before the authoritative domain confirms it.

## 8. Proposed integration sequence

Integration is a separate future authorization and should proceed in reviewed increments:

1. **Contract alignment:** backend/domain owners approve resource contracts, ownership, error format, versioning and data allowlists.
2. **Environment and security design:** confirm development API origins, CORS, secrets handling, session mechanism, cookie/token policy and route protection. Do not commit secrets.
3. **Public read-only discovery:** connect published listing/category/service/provider projections; preserve public access and remove/clearly isolate demo fixtures.
4. **Identity context:** integrate the approved shared authentication/session client and actor context; no parallel Marketplace auth system.
5. **Organisation authority:** integrate organisation context and action-specific delegated authority outcomes.
6. **Listing management:** add authorized listing commands with server-side validation, audit and publication safeguards.
7. **Enquiries and offers:** implement participant-scoped commands and state transitions.
8. **Agreement, payment and fulfilment:** integrate each owning domain's authoritative status and permitted actions; payment is not transfer.
9. **Asset transfer boundary:** only after explicit cross-domain design approval, invoke Asset domain transfer and reconcile its authoritative result.
10. **Operational readiness:** complete security/privacy review, automated tests, monitoring, accessibility/mobile checks and staged deployment approval.

Do not skip ahead or bundle ownership transfer into a generic Marketplace transaction endpoint.

## 9. Contract fixtures and acceptance plan

Before API wiring, maintain mock fixtures that cover:
- public listing with complete and optional fields;
- unpublished/withdrawn listing;
- individual seller and organisation seller display projections;
- organisation user with valid, insufficient, expired and revoked authority;
- enquiry and offer state transitions;
- payment pending, successful and failed states;
- agreement pending/signed/declined states;
- fulfilment pending/completed/failed states;
- transfer accepted/rejected/pending outcomes;
- validation, unauthorized, forbidden, conflict, rate-limit and server errors.

Acceptance checks for the future integration:
- public discovery works without authentication;
- public payloads contain only allowlisted fields;
- no private evidence is accessible from public routes;
- every consequential action is independently authorized server-side;
- organisation authority is action-specific, current and revocable;
- listing/offer/payment states never falsely imply ownership transfer;
- only Asset domain can confirm canonical ownership/custody changes;
- retries do not duplicate consequential operations;
- loading, empty, error and stale-state paths are tested;
- keyboard, screen-reader and mobile navigation behavior remains usable.

## 10. Decisions required before implementation

The following require explicit agreement from the relevant platform owners:
- canonical API base URL(s), endpoint paths and versioning;
- shared authentication/session client and sign-in/sign-out behavior;
- actor, organisation and delegated-authority response contracts;
- exact permission matrix for listing, enquiry, offer and transaction actions;
- public listing field/media allowlist and location precision;
- listing moderation and status transition policy;
- idempotency and concurrency strategy;
- payment, agreement and fulfilment orchestration;
- Asset-domain transfer preconditions and recipient acknowledgement;
- evidence storage, access, audit and retention policy;
- legal/compliance approval for any escrow, custody of funds or regulated settlement service.

**Implementation gate:** until these decisions are approved and a separate integration task is authorized, the Marketplace remains a frontend-only experience with demonstration content. This document is preparation, not a claim of completed integration.
