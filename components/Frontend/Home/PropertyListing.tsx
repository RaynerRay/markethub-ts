import React from "react";
import PropertyCardHome from "./PropertyCardHome";
import SectionHeader from "./SectionHeader";
import { getFeaturedProperties } from "@/actions/properties";

interface Property {
  id: string;
  listingType: 'RENT' | 'SALE';
  category?: {
    title: string;
  };
  rentPrice?: number;
  salePrice?: number;
  title: string;
  address?: string;
  size?: number;
  beds?: number;
  baths?: number;
  imageUrl?: string;
  slug?: string;
}

interface PropertyCardProps {
  properties: Property[];
  listingType: 'RENT' | 'SALE';
}

const PropertyGrid: React.FC<PropertyCardProps> = ({ properties, listingType }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {properties.map((property) => (
      <PropertyCardHome
        key={property.id}
        property={{
          id: property.id,
          type: property.listingType,
          category: property.category?.title || "",
          price: property.listingType === "RENT" ? property.rentPrice : property.salePrice,
          title: property.title,
          address: property.address || "",
          sqft: property.size || 0,
          beds: property.beds || 0,
          baths: property.baths || 0,
          image: property.imageUrl || "/house-placeholder.png",
          slug: property.slug || ""
        }}
      />
    ))}
  </div>
);

const PropertyListing = async () => {
  const { data: featuredProperties = [] } = await getFeaturedProperties() as { data: Property[] };
  
  const propertiesForSale = featuredProperties.filter(
    property => property.listingType === "SALE"
  );
  
  const propertiesForRent = featuredProperties.filter(
    property => property.listingType === "RENT"
  );

  return (
    <div className="container max-w-7xl mx-auto py-12 space-y-16">
      {/* Properties for Sale Section */}
      <section>
        <SectionHeader
          title="Properties for Sale"
          subtitle="Discover your dream home among our carefully selected properties for sale"
          align="center"
        />
        <PropertyGrid 
          properties={propertiesForSale} 
          listingType="SALE" 
        />
      </section>

      {/* Properties for Rent Section */}
      <section>
        <SectionHeader
          title="Properties for Rent"
          subtitle="Find your perfect rental property from our exclusive collection"
          align="center"
        />
        <PropertyGrid 
          properties={propertiesForRent} 
          listingType="RENT" 
        />
      </section>
    </div>
  );
};

export default PropertyListing;