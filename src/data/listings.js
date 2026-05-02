/**
 * data/listings.js
 * ─────────────────────────────────────────────────────────────────
 * Static fallback data used while Supabase is not configured,
 * and as seed data for your database.
 *
 * Each listing matches the Supabase schema defined in README.md:
 *   id, title, price, location, type_key, beds, baths, area,
 *   phone, image_url, featured, created_at
 */

export const STATIC_LISTINGS = [
  {
    id: 1,
    title: "Borama Villa",
    price: "$45,000",
    location: "Borama City Center",
    type_key: "House for Sale",
    beds: 4,
    baths: 2,
    area: "220 m²",
    phone: "252634000001",
    image_url: "https://placehold.co/600x420/d4a574/7c4a1e?text=Borama+Villa",
    featured: true,
  },
  {
    id: 2,
    title: "East Borama Land Plot",
    price: "$12,000",
    location: "East Borama",
    type_key: "Land for Sale",
    beds: null,
    baths: null,
    area: "500 m²",
    phone: "252634000002",
    image_url: "https://placehold.co/600x420/c8d4b0/4a6741?text=Land+Plot",
    featured: true,
  },
  {
    id: 3,
    title: "Market District Apartment",
    price: "$800/mo",
    location: "Market District",
    type_key: "Apartment for Rent",
    beds: 3,
    baths: 2,
    area: "130 m²",
    phone: "252634000003",
    image_url: "https://placehold.co/600x420/b0c4d4/2a5070?text=Apartment",
    featured: true,
  },
  {
    id: 4,
    title: "Main Street Shop",
    price: "$400/mo",
    location: "Main Street",
    type_key: "Shop for Rent",
    beds: null,
    baths: null,
    area: "60 m²",
    phone: "252634000004",
    image_url: "https://placehold.co/600x420/d4c4a0/6b5520?text=Shop+Space",
    featured: true,
  },
  {
    id: 5,
    title: "West Borama Family Home",
    price: "$38,000",
    location: "West Borama",
    type_key: "House for Sale",
    beds: 3,
    baths: 2,
    area: "180 m²",
    phone: "252634000005",
    image_url: "https://placehold.co/600x420/e8c9a0/8b5e2f?text=Family+Home",
    featured: false,
  },
  {
    id: 6,
    title: "Borama Outskirts Farmland",
    price: "$8,500",
    location: "Borama Outskirts",
    type_key: "Land for Sale",
    beds: null,
    baths: null,
    area: "1200 m²",
    phone: "252634000006",
    image_url: "https://placehold.co/600x420/b8d4c0/336644?text=Farmland",
    featured: false,
  },
  {
    id: 7,
    title: "New District Studio",
    price: "$550/mo",
    location: "New District",
    type_key: "Apartment for Rent",
    beds: 1,
    baths: 1,
    area: "55 m²",
    phone: "252634000007",
    image_url: "https://placehold.co/600x420/c4b8d4/442266?text=Studio+Apt",
    featured: false,
  },
  {
    id: 8,
    title: "Central Market Corner Shop",
    price: "$600/mo",
    location: "Central Market",
    type_key: "Shop for Rent",
    beds: null,
    baths: null,
    area: "90 m²",
    phone: "252634000008",
    image_url: "https://placehold.co/600x420/d4d0b0/665522?text=Corner+Shop",
    featured: false,
  },
];

/**
 * Maps each nav filter key to which type_key values it should show.
 * Used by both the Header nav and the ListingGrid filter pills.
 */
export const NAV_FILTER_MAP = {
  buy:        ["House for Sale"],
  rent:       ["Apartment for Rent", "Shop for Rent"],
  land:       ["Land for Sale"],
  commercial: ["Shop for Rent"],
};
