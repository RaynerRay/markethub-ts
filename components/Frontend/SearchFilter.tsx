"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FilterIcon,
  Search,
  HomeIcon,
  MapPin,
  Check,
  X,
  XCircle,
  ChevronRight,
} from "lucide-react";
import {
  ListingType,
  Category,
  SubCategory,
  City,
  Town,
  SearchFilterProps,
  Filters,
  PropertyFilters,
} from "@/types/types";
import { BATHS_OPTIONS, BEDS_OPTIONS, PRICE_OPTIONS } from "@/lib/utils";

const SearchFilter: React.FC<SearchFilterProps> = ({
  categories = [],
  subcategories = [],
  cities = [],
  towns = [],
 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();


  // Refs for click outside handling
  const categoryRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // UI state
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  // Get current filters from URL
  const getCurrentFilters = useCallback((): Filters => {
    return {
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      beds: searchParams.get("minBeds") || "",
      baths: searchParams.get("maxBaths") || "",
      subcategory: searchParams.get("subCategoryId") || "",
      propertySize: searchParams.get("minSize") || "",
      listingType: (searchParams.get("listingType") as ListingType) || "",
      category: searchParams.get("categoryId") || "",
      amenities: [],
    };
  }, [searchParams]);

  // Current location state with null checks
  const currentLocation = useMemo(() => {
    const townId = searchParams.get("townId");
    
    if (townId && Array.isArray(towns)) {
      const town = towns.find(t => t.id === townId);
      const city = cities.find(c => c.id === town?.cityId);
      return town && city ? `${city.title} > ${town.title}` : null;
    }
    
    const cityId = searchParams.get("cityId");
    return cityId ? cities.find((c) => c.id === cityId)?.title || null : null;
  }, [searchParams, cities, towns]);

  const currentCategory = useMemo(() => {
    return searchParams.get("categoryId") || null;
  }, [searchParams]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    const currentFilters = getCurrentFilters();
    return (
      Object.values(currentFilters).some((value) =>
        Array.isArray(value) ? value.length > 0 : value !== ""
      ) ||
      currentLocation !== null ||
      currentCategory !== null
    );
  }, [getCurrentFilters, currentLocation, currentCategory]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !categoryRef.current?.contains(event.target as Node) &&
        !filterRef.current?.contains(event.target as Node) &&
        !locationRef.current?.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
        setFilterOpen(false);
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update URL with new filters
  const updateFilters = useCallback(
    (newFilters: Partial<PropertyFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  // Clear all filters
  const handleClearAll = useCallback(() => {
    router.push(window.location.pathname, { scroll: false });
    setLocationSearch("");
    setCategorySearch("");
  }, [router]);

  // Handle location selection
  const handleLocationSelect = useCallback(
    (city: City, town?: Town) => {
      if (town) {
        // Only set townId when a town is selected
        updateFilters({ townId: town.id, cityId: "" });
      } else {
        // Only set cityId when just a city is selected
        updateFilters({ cityId: city.id, townId: "" });
      }
      setIsLocationOpen(false);
    },
    [updateFilters]
  );

  // Handle category selection
  const handleCategorySelect = useCallback(
    (category: Category) => {
      updateFilters({
        categoryId: category.id,
        subCategoryId: "", // Reset subcategory when category changes
      });
      setIsCategoryOpen(false);
    },
    [updateFilters]
  );

  // Filter locations based on search with null checks
  const filteredLocations = useMemo(() => {
    if (!Array.isArray(cities) || !Array.isArray(towns)) {
      return [];
    }

    const searchTerm = locationSearch.toLowerCase();
    return cities.map(city => ({
      ...city,
      filteredTowns: towns
        .filter(town => town.cityId === city.id)
        .filter(town => 
          town.title.toLowerCase().includes(searchTerm) ||
          city.title.toLowerCase().includes(searchTerm)
        )
    })).filter(city => 
      city.title.toLowerCase().includes(searchTerm) ||
      city.filteredTowns.length > 0
    );
  }, [cities, towns, locationSearch]);

  // Handle individual filter changes
  const handleFilterChange = useCallback(
    (field: keyof PropertyFilters, value: string) => {
      updateFilters({ [field]: value });
    },
    [updateFilters]
  );

  // Memoize filtered lists for performance
  // const filteredLocations = useMemo(
  //   () =>
  //     cities.filter((city) =>
  //       city.title.toLowerCase().includes(locationSearch.toLowerCase())
  //     ),
  //   [cities, locationSearch]
  // );

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.title.toLowerCase().includes(categorySearch.toLowerCase())
      ),
    [categories, categorySearch]
  );

  return (
    <div className="w-full ">
      <div className="bg-emerald-500 py-6 md:py-8 rounded-lg ">
        <div className=" mx-auto px-4 sm:px-6">
          {hasActiveFilters && (
            <div className="flex justify-end mb-3">
              <button
                onClick={handleClearAll}
                className="flex items-center space-x-1 text-white hover:text-gray-100 transition-colors duration-200"
                type="button"
              >
                <XCircle className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 md:gap-4">
            {/* Location Select */}
            <div ref={locationRef} className="relative lg:col-span-2">
              <div
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="w-full px-4 py-3 rounded-md bg-white cursor-pointer pl-10"
              >
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <span className={currentLocation ? "text-gray-900" : "text-gray-500"}>
                  {currentLocation || "Location"}
                </span>
              </div>

              {isLocationOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      placeholder="Search locations..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-60 overflow-auto">
                    {filteredLocations.map((city) => (
                      <div key={city.id}>
                        <div
                          onClick={() => handleLocationSelect(city)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                        >
                          {city.title}
                          {currentLocation === city.title && (
                            <Check className="h-4 w-4 text-emerald-500" />
                          )}
                        </div>
                        {city.filteredTowns.map((town) => (
                          <div
                            key={town.id}
                            onClick={() => handleLocationSelect(city, town)}
                            className="px-8 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between text-sm text-gray-600"
                          >
                            <div className="flex items-center">
                              <ChevronRight className="h-3 w-3 mr-1" />
                              {town.title}
                            </div>
                            {currentLocation === `${city.title} > ${town.title}` && (
                              <Check className="h-4 w-4 text-emerald-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Category Select */}
            <div ref={categoryRef} className="relative lg:col-span-2">
              <div
                className="w-full px-4 py-3 rounded-md bg-white cursor-pointer pl-10"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <span
                  className={
                    currentCategory ? "text-gray-900" : "text-gray-500"
                  }
                >
                  {categories.find((cat) => cat.id === currentCategory)
                    ?.title || "Category"}
                </span>
              </div>

              {isCategoryOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      placeholder="Search categories..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-60 overflow-auto">
                    {filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      >
                        {category.title}
                        {currentCategory === category.id && (
                          <Check className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Listing Type Select */}
            <div className="relative">
              <select
                className="w-full px-4 py-3 rounded-md bg-white appearance-none cursor-pointer"
                value={searchParams.get("listingType") || ""}
                onChange={(e) =>
                  handleFilterChange("listingType", e.target.value)
                }
              >
                <option value="">Listing Type</option>
                {[
                  { value: "RENT", label: "For Rent" },
                  { value: "SALE", label: "For Sale" },
                ].map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced Filters */}
            <div ref={filterRef} className="relative">
              <button
                type="button"
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 rounded-md flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <FilterIcon className="h-4 w-4" />
                <span>Filters</span>
                {filterOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <span className="text-xs bg-emerald-500 text-white rounded-full px-2">
                    {
                      Object.keys(getCurrentFilters()).filter(
                        (key) =>
                          getCurrentFilters()[key as keyof Filters] !== ""
                      ).length
                    }
                  </span>
                )}
              </button>

              {filterOpen && (
                <div className="absolute top-full mt-2 w-96 bg-white rounded-md shadow-lg p-4 z-10 right-0">
                  <div className="space-y-4">
                    {/* Price Range */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Min Price
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                          value={searchParams.get("minPrice") || ""}
                          onChange={(e) =>
                            handleFilterChange("minPrice", e.target.value)
                          }
                        >
                          {PRICE_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Price
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                          value={searchParams.get("maxPrice") || ""}
                          onChange={(e) =>
                            handleFilterChange("maxPrice", e.target.value)
                          }
                        >
                          {PRICE_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Beds & Baths */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Beds
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                          value={searchParams.get("minBeds") || ""}
                          onChange={(e) =>
                            handleFilterChange("minBeds", e.target.value)
                          }
                        >
                          {BEDS_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Baths
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                          value={searchParams.get("maxBaths") || ""}
                          onChange={(e) =>
                            handleFilterChange("maxBaths", e.target.value)
                          }
                        >
                          {BATHS_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Property Size */}
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Size (sq ft)
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                        placeholder="Min size"
                        value={searchParams.get("minSize") || ""}
                        onChange={(e) =>
                          handleFilterChange("minSize", e.target.value)
                        }
                      />
                    </div> */}

                    {/* Subcategory - Only show if category is selected */}
                    {currentCategory && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subcategory
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                          value={searchParams.get("subCategoryId") || ""}
                          onChange={(e) =>
                            handleFilterChange("subCategoryId", e.target.value)
                          }
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories
                            .filter((sub) => sub.categoryId === currentCategory)
                            .map((subcategory) => (
                              <option
                                key={subcategory.id}
                                value={subcategory.id}
                              >
                                {subcategory.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Filter Buttons */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                      onClick={() => setFilterOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
                      onClick={() => setFilterOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div>
              <button
                type="button"
                className="w-full px-4 py-3 bg-emerald-600 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                onClick={() => router.push(`/search${window.location.search}`)}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
