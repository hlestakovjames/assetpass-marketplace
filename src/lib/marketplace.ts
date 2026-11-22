import { categories, featuredListings } from "@/data/marketplace";

export function categorySlug(name: string) {
  return name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => categorySlug(category.name) === slug);
}

export function searchListings(query: string, category?: string) {
  const normalized = query.trim().toLowerCase();
  return featuredListings.filter((listing) => {
    const matchesCategory = !category || listing.category === category;
    const haystack = [listing.title, listing.category, listing.location, listing.condition].join(" ").toLowerCase();
    return matchesCategory && (!normalized || haystack.includes(normalized));
  });
}
