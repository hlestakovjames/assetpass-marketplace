export type ServiceCategory = "Inspection & verification" | "Logistics & movement" | "Maintenance & repair" | "Installation & setup" | "Valuation & advisory";

export type Provider = {
  slug: string;
  name: string;
  summary: string;
  location: string;
  region: string;
  specialities: ServiceCategory[];
  initials: string;
  accent: string;
};

export type MarketplaceService = {
  slug: string;
  title: string;
  category: ServiceCategory;
  description: string;
  delivery: string;
  providerSlug: string;
  indicativeScope: string;
};

export const serviceCategories: ServiceCategory[] = [
  "Inspection & verification",
  "Logistics & movement",
  "Maintenance & repair",
  "Installation & setup",
  "Valuation & advisory",
];

export const providers: Provider[] = [
  { slug: "northstar-asset-care", name: "Northstar Asset Care", summary: "Illustrative asset-care team covering inspections, preventive maintenance and condition reporting.", location: "Nairobi, Kenya", region: "Nairobi", specialities: ["Inspection & verification", "Maintenance & repair"], initials: "NA", accent: "mint" },
  { slug: "swift-route-logistics", name: "Swift Route Logistics", summary: "Illustrative logistics provider for planned equipment and commercial-asset movement.", location: "Thika, Kenya", region: "Central", specialities: ["Logistics & movement"], initials: "SR", accent: "sand" },
  { slug: "precision-installation-group", name: "Precision Installation Group", summary: "Illustrative technical team for equipment installation, setup and handover support.", location: "Kisumu, Kenya", region: "Nyanza", specialities: ["Installation & setup", "Maintenance & repair"], initials: "PI", accent: "blue" },
  { slug: "clearview-valuation-advisory", name: "Clearview Valuation Advisory", summary: "Illustrative advisory practice for asset condition reviews and valuation preparation.", location: "Mombasa, Kenya", region: "Coast", specialities: ["Valuation & advisory", "Inspection & verification"], initials: "CV", accent: "violet" },
];

export const marketplaceServices: MarketplaceService[] = [
  { slug: "asset-condition-inspection", title: "Asset condition inspection", category: "Inspection & verification", description: "A structured visual and operational review intended to help a prospective participant understand an asset's stated condition.", delivery: "Illustrative on-site assessment", providerSlug: "northstar-asset-care", indicativeScope: "Visual condition checklist, observations and a sample findings summary. Actual scope, qualifications and evidence requirements would need confirmation." },
  { slug: "preventive-maintenance-planning", title: "Preventive maintenance planning", category: "Maintenance & repair", description: "Planning support for routine servicing and maintenance schedules across equipment and business assets.", delivery: "Illustrative assessment and plan", providerSlug: "northstar-asset-care", indicativeScope: "Asset review, suggested service intervals and maintenance planning notes. No repair commitment or service-level agreement is implied." },
  { slug: "commercial-asset-transport", title: "Commercial asset transport", category: "Logistics & movement", description: "Coordination support for moving commercial equipment and other eligible assets between agreed locations.", delivery: "Illustrative scheduled movement", providerSlug: "swift-route-logistics", indicativeScope: "Movement planning, handling considerations and delivery coordination. Routes, insurance, permits and acceptance would require separate agreement." },
  { slug: "equipment-installation-setup", title: "Equipment installation and setup", category: "Installation & setup", description: "Technical installation and setup support for suitable workplace and industrial equipment.", delivery: "Illustrative site-based service", providerSlug: "precision-installation-group", indicativeScope: "Site readiness review, installation planning and setup checklist. Technical competence and any required licences must be verified before engagement." },
  { slug: "asset-valuation-preparation", title: "Asset valuation preparation", category: "Valuation & advisory", description: "Preparation support to organise asset information ahead of an independent valuation or advisory engagement.", delivery: "Illustrative document-led review", providerSlug: "clearview-valuation-advisory", indicativeScope: "Information checklist, asset description review and valuation-readiness notes. This is not a formal valuation or regulated professional opinion." },
];

export const providerBySlug = (slug: string) => providers.find((provider) => provider.slug === slug);
export const serviceBySlug = (slug: string) => marketplaceServices.find((service) => service.slug === slug);
export const sampleProviderNotice = "Demonstration provider and service data only. These profiles are not real businesses, verified providers, endorsements or available service offers.";
