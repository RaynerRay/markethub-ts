import { getSubCategories } from '@/actions/subCategories';
import { getCities } from '@/actions/cities';
import { getAllTowns } from '@/actions/towns';
import { getCompanies } from '@/actions/companies';
import { getProperties } from "@/actions/properties";
import SearchPage from "@/components/Frontend/Filter/SearchPage";
import { 
  PropertyFilters, 
  ListingType, 
  PropertyApiResponse, 
  SearchProperty,
  transformPropertyData 
} from '@/types/types';
import { getCategories } from '@/actions/categories';

export default async function Page({ 
  searchParams = {} 
}: { 
  searchParams?: { [key: string]: string | string[] | undefined } 
}) {
  const resolvedSearchParams = await searchParams;

  const filters: PropertyFilters = {
    listingType: resolvedSearchParams.listingType as ListingType,
    cityId: resolvedSearchParams.cityId ? String(resolvedSearchParams.cityId) : undefined,
    townId: resolvedSearchParams.townId ? String(resolvedSearchParams.townId) : undefined,
    categoryId: resolvedSearchParams.categoryId ? String(resolvedSearchParams.categoryId) : undefined,
    subCategoryId: resolvedSearchParams.subCategoryId ? String(resolvedSearchParams.subCategoryId) : undefined,
    minPrice: resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : undefined,
    maxPrice: resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : undefined,
    minBeds: resolvedSearchParams.minBeds ? Number(resolvedSearchParams.minBeds) : undefined,
    maxBeds: resolvedSearchParams.maxBeds ? Number(resolvedSearchParams.maxBeds) : undefined,
    minBaths: resolvedSearchParams.minBaths ? Number(resolvedSearchParams.minBaths) : undefined,
    maxBaths: resolvedSearchParams.maxBaths ? Number(resolvedSearchParams.maxBaths) : undefined,
    minSize: resolvedSearchParams.minSize ? Number(resolvedSearchParams.minSize) : undefined,
    maxSize: resolvedSearchParams.maxSize ? Number(resolvedSearchParams.maxSize) : undefined,
    page: resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1,
    limit: resolvedSearchParams.limit ? Number(resolvedSearchParams.limit) : 10,
    sortBy: resolvedSearchParams.sortBy as string | undefined,
    sortOrder: resolvedSearchParams.sortOrder as 'asc' | 'desc' | undefined,
  };

  try {
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

    if (!categoriesRes?.data ||
        !subcategoriesRes?.data ||
        !citiesRes?.data ||
        !townsRes?.data ||
        !companiesRes?.data ||
        !propertiesRes) {
      throw new Error('Failed to fetch required data');
    }

    // Transform the properties data to match the expected format
    const transformedProperties: SearchProperty[] = (propertiesRes as PropertyApiResponse[])
      .map(transformPropertyData);

    return (
      <SearchPage
        categories={categoriesRes.data}
        subcategories={subcategoriesRes.data}
        cities={citiesRes.data}
        towns={townsRes.data}
        properties={transformedProperties}
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