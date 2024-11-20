import PropertyDetail from "@/components/Frontend/PropertyDetail";
import { getAllPropertySlugs, getPropertyBySlug, getSimilarPropertiesBySlug } from "@/actions/properties";
import { Property } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

// Type guard to ensure property data matches Property type
function isValidProperty(data: any): data is Property {
  return (
    data &&
    typeof data === "object" &&
    "id" in data &&
    "title" in data &&
    "slug" in data &&
    "listingType" in data &&
    Array.isArray(data.propertyImages) &&
    Array.isArray(data.tags) &&
    "createdAt" in data
  );
}

// Transform API response to match Property type
function transformPropertyData(apiResponse: any): Property {
  return {
    id: apiResponse.id,
    title: apiResponse.title || undefined,
    slug: apiResponse.slug,
    imageUrl: apiResponse.imageUrl || undefined,
    propertyImages: apiResponse.propertyImages || [],
    description: apiResponse.description || undefined,
    propertyCode: apiResponse.propertyCode || undefined,
    contact: apiResponse.contact || undefined,
    listingType: apiResponse.listingType,
    rentPrice: apiResponse.rentPrice || undefined,
    salePrice: apiResponse.salePrice || undefined,
    size: apiResponse.size || undefined,
    beds: apiResponse.beds || undefined,
    baths: apiResponse.baths || undefined,
    tags: apiResponse.tags || [],
    amenities: apiResponse.amenities || [],
    address: apiResponse.address || undefined,
    latitude: apiResponse.latitude || undefined,
    longitude: apiResponse.longitude || undefined,
    favourites: apiResponse.favourites || [],
    cityId: apiResponse.cityId,
    city: apiResponse.city || undefined,
    townId: apiResponse.townId,
    town: apiResponse.town || undefined,
    categoryId: apiResponse.categoryId,
    category: apiResponse.category || undefined,
    companyId: apiResponse.companyId,
    company: apiResponse.company || undefined,
    agentProfileId: apiResponse.agentProfileId,
    agent: apiResponse.agent || undefined,
    subCategoryId: apiResponse.subCategoryId,
    subCategory: apiResponse.subCategory || undefined,
    userId: apiResponse.userId,
    user: apiResponse.user || undefined,
    createdAt: new Date(apiResponse.createdAt),
    updatedAt: apiResponse.updatedAt ? new Date(apiResponse.updatedAt) : null
  };
}

// Transform array of properties
function transformPropertyArray(apiResponses: any[]): Property[] {
  return apiResponses
    .map(transformPropertyData)
    .filter(isValidProperty);
}

export default async function Page({ params }: PageProps) {
  const awaitedParams = await Promise.resolve(params);
  const session = await getServerSession(authOptions);
  
  try {
    const [propertyResponse, similarPropertiesResponse] = await Promise.all([
      getPropertyBySlug(awaitedParams.slug),
      getSimilarPropertiesBySlug(awaitedParams.slug),
    ]);

    // Transform and validate the property data
    let propertyData: Property | null = null;
    let similarProperties: Property[] = [];
    
    if (propertyResponse.data) {
      const transformedData = transformPropertyData(propertyResponse.data);
      if (isValidProperty(transformedData)) {
        propertyData = transformedData;
      }
    }

    if (similarPropertiesResponse?.data) {
      similarProperties = transformPropertyArray(similarPropertiesResponse.data);
    }

    // If no valid property data is found, show 404
    if (!propertyData) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-slate-50">
        <PropertyDetail
          property={propertyData}
          similarProperties={similarProperties}
          userId={session?.user?.id ?? null}  // Ensure null if undefined
          text=""  // Add empty string if needed or remove if not used
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching property:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const { data: slugs } = await getAllPropertySlugs();
    
    if (!slugs) return [];
    
    return slugs.map((slug) => ({
      slug: slug.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}