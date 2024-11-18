import React from 'react';
import { X } from 'lucide-react';
import { 
  Category, 
  City, 
  ListingType,
  PropertyFilters, 
  SubCategory,
  Town
} from '@/types/types';

// Helper function to format filter values
const formatFilterValue = (
  key: string, 
  value: any, 
  categories: Category[],
  cities: City[],
  towns: Town[],
  subcategories: SubCategory[]
) => {
  switch (key) {
    case 'categoryId':
      const category = categories.find(cat => cat.id === value);
      return category?.title || value;
    case 'subCategoryId':
      const subCategory = subcategories.find(subcat => subcat.id === value);
      return subCategory?.title || value;
    
    case 'cityId':
      const city = cities.find(c => c.id === value);
      return city?.title || value;
    case 'townId':
      // Ensure we're using strict equality comparison for finding the town
      const town = towns.find(t => t.id === value);
      // Add debug logging to help identify issues
      if (!town) {
        console.debug('Town not found:', { value, availableTowns: towns });
      }
      return town?.title || value;
    
    case 'listingType':
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    
    case 'size':
      if (typeof value === 'object') {
        const { min, max } = value;
        if (min && max) return `${min} - ${max} sqm`;
        if (min) return `Min ${min} sqm`;
        if (max) return `Max ${max} sqm`;
      }
      return value;
    
    case 'minPrice':
      return `Min $${Number(value).toLocaleString()}`;
    
    case 'maxPrice':
      return `Max $${Number(value).toLocaleString()}`;
    
    case 'beds':
      return `${value}+ beds`;
    
    case 'baths':
      return `${value}+ baths`;
    
    default:
      return typeof value === 'object' ? JSON.stringify(value) : String(value);
  }
};

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
  // Add debug logging to check the towns prop
  React.useEffect(() => {
    console.debug('Towns prop:', towns);
  }, [towns]);

  const activeFilters = Object.entries(filters).filter(([_, value]) => {
    if (value === undefined) return false;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return value !== '' && value !== null;
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeFilters.map(([key, value]) => {
        const formattedKey = formatFilterKey(key);
        const formattedValue = formatFilterValue(key, value, categories, cities, subcategories, towns);
        
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