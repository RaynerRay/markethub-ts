
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BEDS_OPTIONS = [
  { value: '', label: 'Any Beds' },
  { value: '1', label: '1 Bed' },
  { value: '2', label: '2 Beds' },
  { value: '3', label: '3 Beds' },
  { value: '4', label: '4 Beds' },
  { value: '5', label: '5 Beds' },
  { value: '6', label: '6+ Beds' },
];

export const BATHS_OPTIONS = [
  { value: '', label: 'Any Baths' },
  { value: '1', label: '1 Bath' },
  { value: '2', label: '2 Baths' },
  { value: '3', label: '3 Baths' },
  { value: '4', label: '4 Baths' },
  { value: '5', label: '5 Baths' },
  { value: '6', label: '6+ Baths' },
];

export const PRICE_OPTIONS = [
  { value: '', label: 'Any Price' },
  { value: '50', label: '$50' },
  { value: '100', label: '$100' },
  { value: '200', label: '$200' },
  { value: '300', label: '$300' },
  { value: '400', label: '$400' },
  { value: '500', label: '$500' },
  { value: '600', label: '$600' },
  { value: '700', label: '$700' },
  { value: '800', label: '$800' },
  { value: '900', label: '$900' },
  { value: '1000', label: '$1,000' },
];

export const blogCategories= [
  { title: "Real Estate", slug: "real-estate" },
  { title: "Breaking News", slug: "breaking-news" },
  { title: "Buying a House", slug: "buying-a-house" },
  { title: "Buying a Property", slug: "buying-a-property" },
  { title: "Commercial Real Estate", slug: "commercial-real-estate" },
  { title: "Construction", slug: "construction" },
  { title: "DIY Home Improvements", slug: "diy-home-improvements" },
  { title: "Economy", slug: "economy" },
  { title: "Guide to Purchasing Your Home", slug: "guide-to-purchasing-your-home" },
  { title: "Harare Property Market", slug: "harare-property-market" },
  { title: "Home and Deco", slug: "home-and-deco" },
  { title: "Home Deco", slug: "home-deco" },
  { title: "Home Improvements", slug: "home-improvements" },
  { title: "Home Insurance", slug: "home-insurance" },
  { title: "Home Security", slug: "home-security" },
  { title: "Integrity in Real Estate", slug: "integrity-in-real-estate" },
  { title: "Interviews", slug: "interviews" },
  { title: "Know Title Deeds", slug: "know-title-deeds" },
  { title: "Landlords", slug: "landlords" },
  { title: "Leads in Real Estate", slug: "leads-in-real-estate" },
  { title: "Lease Agreement", slug: "lease-agreement" },
  { title: "Listing Your Property", slug: "listing-your-property" },
  { title: "Market Trends", slug: "market-trends" },
  { title: "Marketplaces", slug: "marketplaces" },
  { title: "Mortgage", slug: "mortgage" },
  { title: "Neighbourhood On Spotlight", slug: "neighbourhood-on-spotlight" },
  { title: "News Headlines", slug: "news-headlines" },
  { title: "Prepare Your Home Before Selling", slug: "prepare-your-home-before-selling" },
  { title: "Property Development Company", slug: "property-development-company" },
  { title: "Property Investment Opportunities", slug: "property-investment-opportunities" },
  { title: "Property Investments", slug: "property-investments" },
  { title: "Property Request Services", slug: "property-request-services" },
  { title: "Property Transactions", slug: "property-transactions" },
  { title: "Property Trends", slug: "property-trends" },
  { title: "Property Valuation", slug: "property-valuation" },
  { title: "Purchasing Residential Stands", slug: "purchasing-residential-stands" },
  { title: "Real Estate Investment", slug: "real-estate-investment" },
  { title: "Real Estate Market", slug: "real-estate-market" },
  { title: "Real Estate Regulation", slug: "real-estate-regulation" },
  { title: "Regulations in Real Estate", slug: "regulations-in-real-estate" },
  { title: "Remodeling Your Home", slug: "remodeling-your-home" },
  { title: "Rental", slug: "rental" },
  { title: "Selling a Property", slug: "selling-a-property" },
  { title: "Taxation", slug: "taxation" },
  { title: "Technology in the Real Estate Sector", slug: "technology-in-the-real-estate-sector" },
  { title: "Tenants", slug: "tenants" },
  { title: "Title Deeds", slug: "title-deeds" },
  { title: "Understanding Your Finances", slug: "understanding-your-finances" },
  { title: "Urban Expansion", slug: "urban-expansion" },
  { title: "Urban Redevelopment", slug: "urban-redevelopment" },
  { title: "Viewing A Property", slug: "viewing-a-property" },
  { title: "What's New!", slug: "whats-new" },
  { title: "Working From Home", slug: "working-from-home" },
  { title: "Zimbabwe Property", slug: "zimbabwe-property" }
]


