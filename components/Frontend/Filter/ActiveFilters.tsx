import React from 'react';
import { X } from 'lucide-react';
import { 
  Category, 
  City, 
  PropertyFilters, 
  SubCategory,
  Town
} from '@/types/types';

// Define a union type for possible filter value types
type FilterValue = string | number | { min?: number; max?: number } | null;

// Format filter keys to be more user-friendly
const formatFilterKey = (key: string) => {
  switch (key) {
    case 'categoryId':
      return 'Category';
    case 'subCategoryId':
      return 'SubCategory';
    case 'cityId':
      return 'City';
    case 'townId':
      return 'Town';
    case 'listingType':
      return 'Type';
    case 'minPrice':
    case 'maxPrice':
    case 'size':
    case 'beds':
    case 'baths':
      return '';  // We'll handle these in the value formatting
    default:
      return key.charAt(0).toUpperCase() + key.slice(1);
  }
};

// Helper function to format filter values with type-safe parameter
const formatFilterValue = (
  key: string, 
  value: FilterValue, 
  categories: Category[],
  cities: City[],
  towns: Town[],
  subcategories: SubCategory[]
) => {
  switch (key) {
    case 'categoryId':
      const category = categories.find(cat => cat.id === value);
      return category?.title || String(value);
    case 'subCategoryId':
      const subCategory = subcategories.find(subcat => subcat.id === value);
      return subCategory?.title || String(value);
    
    case 'cityId':
      const city = cities.find(c => c.id === value);
      return city?.title || String(value);
    case 'townId':
      const town = towns.find(t => t.id === value);
      if (!town) {
        console.debug('Town not found:', { value, availableTowns: towns });
      }
      return town?.title || String(value);
    
    case 'listingType':
      return typeof value === 'string' 
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() 
        : String(value);
    
    case 'size':
      if (typeof value === 'object' && value !== null) {
        const { min, max } = value;
        if (min !== undefined && max !== undefined) return `${min} - ${max} sqm`;
        if (min !== undefined) return `Min ${min} sqm`;
        if (max !== undefined) return `Max ${max} sqm`;
      }
      return String(value);
    
    case 'minPrice':
      return `Min $${Number(value).toLocaleString()}`;
    
    case 'maxPrice':
      return `Max $${Number(value).toLocaleString()}`;
    
    case 'beds':
      return `${value}+ beds`;
    
    case 'baths':
      return `${value}+ baths`;
    
    default:
      return typeof value === 'object' && value !== null 
        ? JSON.stringify(value) 
        : String(value);
  }
};

const ActiveFilters = ({
  filters,
  onRemoveFilter,
  categories,
  cities,
  subcategories,
  towns
}: {
  filters: PropertyFilters;
  onRemoveFilter: (key: keyof PropertyFilters) => void;
  categories: Category[];
  cities: City[];
  subcategories: SubCategory[];
  towns: Town[]
}) => {
  React.useEffect(() => {
    console.debug('Towns prop:', towns);
  }, [towns]);

  const activeFilters = Object.entries(filters).filter(([ , value]) => {
    if (value === undefined) return false;
    if (typeof value === 'object' && value !== null) 
      return Object.keys(value).length > 0;
    return value !== '' && value !== null;
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeFilters.map(([key, value]) => {
        const formattedKey = formatFilterKey(key);
        const formattedValue = formatFilterValue(
          key, 
          value as FilterValue, 
          categories, 
          cities, 
          subcategories, 
          towns
        );
        
        return (
          <div 
            key={key} 
            className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
          >
            <span className="mr-2">
              {formattedKey && `${formattedKey}: `}{formattedValue}
            </span>
            <button 
              onClick={() => onRemoveFilter(key as keyof PropertyFilters)}
              className="hover:text-emerald-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveFilters;