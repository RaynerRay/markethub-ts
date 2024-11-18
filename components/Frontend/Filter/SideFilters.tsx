import React, { useState } from 'react';
import { SubCategory } from '@/types/types';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

type SideFiltersProps = {
  subcategories: SubCategory[];
  currentFilters: {
    location?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: string;
    baths?: string;
    listingType?: string;
    propertySize?: string;
    subcategory?: string[];
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
};

const LISTING_TYPES = [
  { value: 'RENT', label: 'For Rent' },
  { value: 'SALE', label: 'For Sale' }
];

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-4 md:p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

// ... [PriceRangeFilter component remains the same]

const MobileFilterDropdown = ({
  currentFilters,
  onFilterChange,
  onClearFilters
}: {
  currentFilters: SideFiltersProps['currentFilters'];
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveFiltersCount = () => {
    return Object.values(currentFilters).filter(value => 
      value !== undefined && value !== '' && 
      (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  return (
    <div className="relative w-full lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-700">
            Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </span>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FiltersContent
              currentFilters={currentFilters}
              onFilterChange={(filters) => {
                onFilterChange(filters);
                setIsOpen(false);
              }}
              onClearFilters={() => {
                onClearFilters();
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const FiltersContent = ({
  currentFilters,
  onFilterChange,
  onClearFilters
}: {
  currentFilters: SideFiltersProps['currentFilters'];
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
}) => {
  const handleInputChange = (key: string, value: any) => {
    onFilterChange({
      ...currentFilters,
      [key]: value
    });
  };

  return (
    <div className="space-y-4">
      <FilterSection title="Listing Type">
        <div className="grid grid-cols-2 gap-4">
          {LISTING_TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleInputChange('listingType', value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${currentFilters.listingType === value
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rooms">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Bedrooms</label>
            <select
              value={currentFilters.beds || ''}
              onChange={(e) => handleInputChange('beds', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>{num}+ beds</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Bathrooms</label>
            <select
              value={currentFilters.baths || ''}
              onChange={(e) => handleInputChange('baths', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>{num}+ baths</option>
              ))}
            </select>
          </div>
        </div>
      </FilterSection>

      <button
        onClick={onClearFilters}
        className="w-full py-3 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
};

const SideFilters: React.FC<SideFiltersProps> = ({
  subcategories,
  currentFilters = {},
  onFilterChange,
  onClearFilters
}) => {
  return (
    <>
      {/* Mobile Dropdown View */}
      <MobileFilterDropdown
        currentFilters={currentFilters}
        onFilterChange={onFilterChange}
        onClearFilters={onClearFilters}
      />

      {/* Desktop View */}
      <div className="hidden lg:block sticky top-4">
        <FiltersContent
          currentFilters={currentFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      </div>
    </>
  );
};

export default SideFilters;