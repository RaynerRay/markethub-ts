import React from "react";
import { Metadata } from "next";
import { getCategories } from "@/actions/categories";
import Hero from "@/components/Frontend/Hero";
import PropertyListing from "@/components/Frontend/Home/PropertyListing";
import PropertyTypes from "@/components/Frontend/Home/PropertyTypes";
import LogoClouds from "@/components/Frontend/LogoClouds";
import HomeServices from "@/components/Frontend/Home/HomeServices";
import { Suspense } from "react";

// Loading components for Suspense fallbacks
const PropertyListingSkeleton = () => <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />;
const PropertyTypesSkeleton = () => <div className="animate-pulse h-64 bg-gray-100 rounded-lg" />;

// Metadata for the home page
export const metadata: Metadata = {
  title: "MarketHub Zimbabwe | Find Your Dream Property",
  description: "Discover residential and commercial properties for sale and rent in Zimbabwe. Browse through houses, apartments, land, and more in Harare, Bulawayo, and other major cities.",
  openGraph: {
    title: "MarketHub Zimbabwe | Find Your Dream Property",
    description: "Browse Zimbabwe's premier selection of properties for sale and rent",
    images: [
      {
        url: "/hero.jpg", // Replace with your actual image
        width: 1200,
        height: 630,
        alt: "Featured Properties in Zimbabwe",
      },
    ],
  },
  alternates: {
    canonical: "https://markethub.co.zw",
  },
  keywords: [
    "Zimbabwe homes for sale",
    "Zimbabwe property listings",
    "Harare real estate",
    "Zimbabwe property search",
    "residential properties Zimbabwe",
    "commercial properties Zimbabwe",
  ],
};

// Revalidate data every hour
export const revalidate = 3600;

export default async function Home() {
  try {
    const categories = (await getCategories()).data || [];

    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative">
          <Hero />
        </section>

        {/* Trusted Partners Section */}
        <section className="bg-emerald-500 py-12">
          <LogoClouds />
        </section>

        {/* Featured Properties Section */}
        <section className="py-16 bg-white">
          <Suspense fallback={<PropertyListingSkeleton />}>
            <PropertyListing />
          </Suspense>
        </section>

        {/* Property Categories Section */}
        <section className="bg-gray-50 py-16">
          <Suspense fallback={<PropertyTypesSkeleton />}>
            <PropertyTypes categories={categories} />
          </Suspense>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <HomeServices />
        </section>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "MarketHub Zimbabwe",
              description: "Zimbabwe's premier real estate marketplace",
              url: "https://markethub.co.zw",
              areaServed: {
                "@type": "Country",
                name: "Zimbabwe",
              },
              hasMap: "https://markethub.co.zw/locations", // Replace with your actual locations page
              openingHours: "Mo-Fr 09:00-17:00",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Zimbabwe",
                addressLocality: "Harare", // Update with your actual address
              },
              sameAs: [
                "https://facebook.com/markethubzw", // Replace with actual social links
                "https://twitter.com/markethubzw",
                "https://linkedin.com/company/markethubzw",
              ],
            }),
          }}
        />
      </main>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return a graceful fallback UI
    return (
      <main className="min-h-screen">
        <Hero />
        <LogoClouds />
        <PropertyListing />
        <HomeServices />
      </main>
    );
  }
}