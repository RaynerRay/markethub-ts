import { getSubCategories } from '@/actions/subCategories';
import { getCities } from '@/actions/cities';
import { getAllTowns } from '@/actions/towns';
import { getCompanies } from '@/actions/companies';
import { getProperties } from "@/actions/properties";
import SearchPage from "@/components/Frontend/Filter/SearchPage";
import { PropertyFilters, ListingType } from '@/types/types';
import { getCategories } from '@/actions/categories';

export default async function Page({ 
  searchParams = {} 
}: { 
  searchParams?: { [key: string]: string | string[] | undefined } 
}) {
  // Await `searchParams` to avoid async issues
  const resolvedSearchParams = await searchParams;

  // Parse search params into PropertyFilters
  const filters: PropertyFilters = {
    listingType: resolvedSearchParams.listingType as ListingType,
    cityId: resolvedSearchParams.cityId ? String(resolvedSearchParams.cityId) : undefined,
    townId: resolvedSearchParams.townId ? String(resolvedSearchParams.townId) : undefined,
    categoryId: resolvedSearchParams.categoryId ? String(resolvedSearchParams.categoryId) : undefined,
    subCategoryId: resolvedSearchParams.subCategoryId ? String(resolvedSearchParams.subCategoryId) : undefined, // Add this
    minPrice: resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : undefined,
    maxPrice: resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : undefined,
    minBeds: resolvedSearchParams.minBeds ? Number(resolvedSearchParams.minBeds) : undefined, // Change from beds
    maxBaths: resolvedSearchParams.maxBaths ? Number(resolvedSearchParams.maxBaths) : undefined, // Change from baths
    minSize: resolvedSearchParams.minSize ? Number(resolvedSearchParams.minSize) : undefined, // Change from size
  };

  try {
    // Fetch all required data in parallel
    const [
      categoriesRes,
      subcategoriesRes,
      citiesRes,
      townsRes,
      companiesRes,
      propertiesRes
    ] = await Promise.all([
      getCategories(),
      getSubCategories(),
      getCities(),
      getAllTowns(),
      getCompanies(),
      getProperties(filters)
    ]);

    // Handle potential null responses
    if (!categoriesRes?.data ||
        !subcategoriesRes?.data ||
        !citiesRes?.data ||
        !townsRes?.data ||
        !companiesRes?.data ||
        !propertiesRes) {
      throw new Error('Failed to fetch required data');
    }
    console.log(propertiesRes)

    return (
      <SearchPage
        categories={categoriesRes.data}
        subcategories={subcategoriesRes.data}
        cities={citiesRes.data}
        towns={townsRes.data}
        // companies={companiesRes.data}
        properties={propertiesRes}
        initialFilters={filters}
      />
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Error loading search results
        </div>
        <div className="text-center">
          Please try again later.
        </div>
      </div>
    );
  }
}
