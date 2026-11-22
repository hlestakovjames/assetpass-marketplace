export type Category = {
  name: string;
  description: string;
  icon: string;
  count: string;
};

export type Listing = {
  id: string;
  title: string;
  category: string;
  location: string;
  price: string;
  condition: string;
  initials: string;
  accent: string;
  featured?: boolean;
};

export const categories: Category[] = [
  { name: "Vehicles & mobility", description: "Cars, motorcycles and fleet assets", icon: "↗", count: "Explore vehicles" },
  { name: "Industrial equipment", description: "Machinery, tools and production assets", icon: "⚙", count: "Explore equipment" },
  { name: "Electronics & IT", description: "Computers, devices and technology", icon: "⌘", count: "Explore electronics" },
  { name: "Property & spaces", description: "Commercial spaces and property assets", icon: "⌂", count: "Explore property" },
  { name: "Office & furniture", description: "Workplace furniture and fittings", icon: "▤", count: "Explore furniture" },
  { name: "Professional services", description: "Specialists supporting asset ownership", icon: "✳", count: "Explore services" },
];

export const featuredListings: Listing[] = [
  { id: "demo-01", title: "Light commercial delivery van", category: "Vehicles & mobility", location: "Nairobi, Kenya", price: "Request price", condition: "Good condition", initials: "VAN", accent: "mint", featured: true },
  { id: "demo-02", title: "Industrial air compressor", category: "Industrial equipment", location: "Thika, Kenya", price: "Request price", condition: "Well maintained", initials: "AIR", accent: "sand", featured: true },
  { id: "demo-03", title: "Business workstation bundle", category: "Electronics & IT", location: "Kisumu, Kenya", price: "Request price", condition: "Refurbished", initials: "IT", accent: "blue", featured: true },
];

export const sampleNotice =
  "Illustrative examples only — these are not live listings, verified sellers or current offers.";
