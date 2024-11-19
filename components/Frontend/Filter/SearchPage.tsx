"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  Category,
  City,
  SubCategory,
  Town,
  ListingType,
  PropertyFilters,
} from "@/types/types";
import SideAdverts from "./SideAdverts";
import Breadcrump from "./Breadcrump";
import PropertyCard from "../PropertyCard";
import ActiveFilters from "./ActiveFilters";
import SearchFilter from "../SearchFilter";

interface Property {
  id: string;
  listingType?: ListingType;
  cityId?: string;
  townId?: string; // Added townId
  categoryId?: string;
  subCategoryId?: string;
  rentPrice?: number;
  salePrice?: number;
  beds?: number;
  baths?: number;
  size?: number;
  createdAt: Date;
}

type SortOption = {
  label: string;
  value: string;
  sortFn: (a: Property, b: Property) => number;
};

const SORT_OPTIONS: SortOption[] = [
  {
    label: "Newest First",
    value: "date-desc",
    sortFn: (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  },
  {
    label: "Oldest First",
    value: "date-asc",
    sortFn: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
  },
  {
    label: "Rent Price: Low to High",
    value: "rent-asc",
    sortFn: (a, b) => (a.rentPrice || 0) - (b.rentPrice || 0),
  },
  {
    label: "Rent Price: High to Low",
    value: "rent-desc",
    sortFn: (a, b) => (b.rentPrice || 0) - (a.rentPrice || 0),
  },
  {
    label: "Sale Price: Low to High",
    value: "sale-asc",
    sortFn: (a, b) => (a.salePrice || 0) - (b.salePrice || 0),
  },
  {
    label: "Sale Price: High to Low",
    value: "sale-desc",
    sortFn: (a, b) => (b.salePrice || 0) - (a.salePrice || 0),
  },
  {
    label: "Bedrooms: Low to High",
    value: "beds-asc",
    sortFn: (a, b) => (a.beds || 0) - (b.beds || 0),
  },
  {
    label: "Bedrooms: High to Low",
    value: "beds-desc",
    sortFn: (a, b) => (b.beds || 0) - (a.beds || 0),
  },
  {
    label: "Size: Small to Large",
    value: "size-asc",
    sortFn: (a, b) => (a.size || 0) - (b.size || 0),
  },
  {
    label: "Size: Large to Small",
    value: "size-desc",
    sortFn: (a, b) => (b.size || 0) - (a.size || 0),
  },
];

// Sorting Component
const PropertySort = ({
  currentSort,
  onSortChange,
}: {
  currentSort: string;
  onSortChange: (value: string) => void;
}) => {
  return (
    <div className="relative inline-block">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md ${
            currentPage === page
              ? "bg-emerald-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const SearchPage: React.FC<{
  categories: Category[];
  subcategories: SubCategory[];
  cities: City[];
  towns: Town[];
  // companies: Company[];
  properties: Property[];
  initialFilters: PropertyFilters;
}> = ({
  categories,
  subcategories,
  cities,
  towns,
  // companies,
  properties: rawProperties,
  initialFilters,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date-desc");
  const itemsPerPage = 10;

  // Convert string dates to Date objects
  const properties = useMemo(() => {
    return rawProperties.map((property) => ({
      ...property,
      createdAt: new Date(property.createdAt),
    }));
  }, [rawProperties]);

  // Update URL helper function
  const updateURL = useCallback(
    (newFilters: PropertyFilters, sort: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", sort);

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (typeof value === "object") {
            const objValue = value as Record<string, unknown>;

            if (Object.keys(objValue).length > 0) {
              params.set(key, JSON.stringify(value));
            }
          } else {
            params.set(key, String(value));
          }
        }
      });

      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Filter change handler
  const handleFilterChange = useCallback(
    (newFilters: PropertyFilters) => {
      setFilters(newFilters);
      setCurrentPage(1);
      updateURL(newFilters, sortBy);
    },
    [updateURL, sortBy]
  );

  // Sort change handler
  const handleSortChange = useCallback(
    (newSort: string) => {
      setSortBy(newSort);
      setCurrentPage(1);
      updateURL(filters, newSort);
    },
    [filters, updateURL]
  );

  // Remove filter handler
  const handleRemoveFilter = useCallback(
    (key: keyof PropertyFilters) => {
      const newFilters = { ...filters };
      if (key === "categoryId" && newFilters.subCategoryId) {
        delete newFilters.subCategoryId;
      }
      if (key === "cityId" && newFilters.townId) {
        delete newFilters.townId; // Clear townId when cityId is removed
      }
      delete newFilters[key];
      handleFilterChange(newFilters);
    },
    [filters, handleFilterChange]
  );

  // Filter and sort properties
  const sortedAndFilteredProperties = useMemo(() => {
    if (!Array.isArray(properties)) {
      console.warn("Properties is not an array");
      return [];
    }

    // First filter
    const filtered = properties.filter((property) => {
      if (!property) return false;

      if (filters.listingType && property.listingType !== filters.listingType)
        return false;
      if (filters.cityId && property.cityId !== filters.cityId) return false;
      if (filters.townId && property.townId !== filters.townId) return false; // Added town filter
      if (filters.categoryId && property.categoryId !== filters.categoryId)
        return false;
      if (
        filters.subCategoryId &&
        property.subCategoryId !== filters.subCategoryId
      )
        return false;

      if (
        filters.minPrice !== undefined &&
        (property.rentPrice === undefined ||
          property.rentPrice < filters.minPrice)
      )
        return false;

      if (
        filters.maxPrice !== undefined &&
        (property.rentPrice === undefined ||
          property.rentPrice > filters.maxPrice)
      )
        return false;

      if (
        filters.beds !== undefined &&
        (property.beds === undefined || property.beds < filters.beds)
      )
        return false;

      if (
        filters.baths !== undefined &&
        (property.baths === undefined || property.baths < filters.baths)
      )
        return false;

      if (filters.size) {
        const { min, max } = filters.size;
        if (
          min !== undefined &&
          (property.size === undefined || property.size < min)
        )
          return false;
        if (
          max !== undefined &&
          (property.size === undefined || property.size > max)
        )
          return false;
      }

      return true;
    });

    // Then sort
    const currentSortOption = SORT_OPTIONS.find(
      (option) => option.value === sortBy
    );
    if (currentSortOption) {
      return [...filtered].sort(currentSortOption.sortFn);
    }

    return filtered;
  }, [properties, filters, sortBy]);

  // Paginate properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredProperties.slice(startIndex, endIndex);
  }, [sortedAndFilteredProperties, currentPage]);

  const handleTownSelect = (townId: string) => {
    const newFilters = { ...filters, townId };
    handleFilterChange(newFilters);
  };

  // Get current category, subcategory, city, and town titles for breadcrumb
  const currentTitles = useMemo(() => {
    const category = categories.find((cat) => cat.id === filters.categoryId);
    const subcategory = subcategories.find(
      (subcat) => subcat.id === filters.subCategoryId
    );
    const city = cities.find((city) => city.id === filters.cityId);
    const town = towns.find((town) => town.id === filters.townId);
    
    return {
      categoryTitle: category?.title || "Properties",
      subcategoryTitle: subcategory?.title,
      cityTitle: city?.title,
      townTitle: town?.title,
    };
  }, [
    categories,
    subcategories,
    cities,
    towns,
    filters.categoryId,
    filters.subCategoryId,
    filters.cityId,
    filters.townId,
  ]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Search Section */}
      <SearchFilter
        subcategories={subcategories}
        categories={categories}
        cities={cities}
        towns={towns}
      />

      <Breadcrump
        title={
          currentTitles.townTitle ||
          currentTitles.cityTitle ||
          currentTitles.subcategoryTitle ||
          currentTitles.categoryTitle
        }
        resultCount={sortedAndFilteredProperties.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Side Filters */}
        <div className="md:col-span-1">
          <SideAdverts
            topAdUrl="/homeloan.jpg"
            middleAdUrl="/house2.jpg"
            bottomAdUrl="/house3.jpg"
            towns={towns} onTownSelect={handleTownSelect} 
          />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              categories={categories}
              cities={cities}
              towns={towns}
              subcategories={subcategories}
            />
            <PropertySort currentSort={sortBy} onSortChange={handleSortChange} />
          </div>

          {paginatedProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {paginatedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  sortedAndFilteredProperties.length / itemsPerPage
                )}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No properties found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;