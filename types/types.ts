import { ListingType as PrismaListingType } from '@prisma/client';

// Export Prisma's ListingType to ensure type consistency
export type ListingType = PrismaListingType;

// If you need the enum values elsewhere in your code, you can re-export them like this:
export const ListingTypeEnum = {
  SALE: 'SALE' as ListingType,
  RENT: 'RENT' as ListingType
} as const;

export enum AmenityType {
  WATER = "WATER",
  ELECTRICITY = "ELECTRICITY",
  SEWERAGE = "SEWERAGE",
  KITCHEN = "KITCHEN",
  BATHROOM = "BATHROOM",
  SECURITY = "SECURITY",
  PARKING = "PARKING"
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT"
}

// Category Model
export type Category = {
  id: string;
  title: string;
  slug: string;
  properties?: Property[];
  subcategories?: SubCategory[];
  createdAt: Date;
  updatedAt: Date | null;
};

// SubCategory Model
export type SubCategory = {
  id: string;
  title: string;
  slug: string;
  properties?: Property[];
  category?: Category;
  categoryId?: string;
  createdAt: Date;
  updatedAt: Date | null;
};

// Advert Model
export type Advert = {
  id: string;
  title: string;
  link: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

// City Model
export type City = {
  id: string;
  title: string;
  slug: string;
  properties?: Property[];
  towns?: Town[];
  createdAt: Date;
  updatedAt: Date | null;
};

// Town Model
export type Town = {
  id: string;
  title: string;
  slug: string;
  properties?: Property[];
  city?: City | null;
  cityId?: string;
  createdAt: Date;
  updatedAt: Date | null;
};
// Amenity Model
export type Amenity = {
  id: string;
  type: AmenityType;
  property: Property;
  propertyId: string;
};

// Blog Model types
export type Blog = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  content?: string | null;
  categorySlug: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};


// Favourite Model
export type Favourite = {
  id: string;
  createdAt: Date;
  userId: string;
  user: User;
  propertyId: string;
  property: Property;
};

export type UserProfile = {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  phone?: string;
  profileImage?: string;
  user: User;
};

// Property Types
export type Property = {
  id?: string;
  title?: string;
  slug?: string;
  imageUrl?: string;
  propertyImages?: string[];
  description?: string;
  propertyCode?: string;
  contact?: string;
  listingType?: ListingType;
  rentPrice?: number;
  salePrice?: number;
  size?: number;
  beds?: number;
  baths?: number;
  tags?: string[];
  amenities?: Amenity[];
  address?: string;
  latitude?: number;
  longitude?: number;
  favourites?: Favourite[];
  cityId?: string;
  city?: City;
  townId?: string;
  town?: Town;
  categoryId?: string;
  category?: Category;
  companyId?: string;
  company?: Company;
  agentProfileId?: string;
  agent?: AgentProfile;  //
  subCategoryId?: string;
  subCategory?: SubCategory;
  userId?: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date | null;
};

// Company Model
export type Company = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  email?: string | null;
  phone?: string | null;
  phone2?: string | null;
  address?: string | null;
  address2?: string | null;
  website?: string | null;
  properties: { id: string }[];
  agents: {
    id: string;
    email: string | null;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    companyId: string | null;
    userId: string;
  }[];
  _count?: {
    properties: number;
  };
  createdAt: Date;
  updatedAt: Date | null;
};


// AgentProfile Model
export type AgentProfile = {
  id: string;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  code?: string;
  bio?: string;
  properties: Property[];
  services: string[];
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date | null;
};

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  properties: Property[];
  role: UserRole;
  favourites: Favourite[];
  agentProfile?: AgentProfile;
  profile?: UserProfile;
  createdAt: Date;
  updatedAt?: Date | null;
}



// types/user.ts

// export type UserRole = 'USER' | 'ADMIN' | 'AGENT';

export type SearchFilterProps = {
  categories: Category[];
  subcategories: SubCategory[];
  cities: City[];
  towns: Town[]
  
}
export type SortOption = {
  label: string;
  value: string;
  sortFn: (a: Property, b: Property) => number;
};



export type RegisterInputProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string | string[];
  plan?: string | string[];
};
export interface PropertyFilters {
  categoryId?: string;
  subCategoryId?: string;
  // subcategoryTitle: string;
  cityId?: string;
  townId?: string;
  minPrice?: number;
  maxPrice?: number;
  listingType?: ListingType;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minSize?: number;
  maxSize?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type UserSelect = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
};

export type ActionResponse = {
  success: boolean;
  data?: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: UserRole;
  } | null;
  error?: string;
};

export interface PropertyFilters {
  listingType?: ListingType;
  cityId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  size?: {
    min?: number;
    max?: number;
  };
  amenities?: string[];
  searchTerm?: string;
}

export type Filters = {
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  amenities: string[];
  subcategory: string;
  propertySize: string;
  // yearBuilt: string;
  listingType: ListingType | '';
  category: string;
  // town: string;
  // city:string;
};

// types/types.ts

import {  Property as PrismaProperty } from "@prisma/client";

// API Response type that matches your Prisma schema relationships
export interface PropertyApiResponse extends Omit<PrismaProperty, 'createdAt' | 'updatedAt'> {
  category: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date | null;
  } | null;
  subCategory: {
    id: string;
    title: string;
    slug: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date | null;
  } | null;
  city: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date | null;
  } | null;
  town: {
    id: string;
    title: string;
    slug: string;
    cityId: string;
    createdAt: Date;
    updatedAt: Date | null;
  } | null;
  company: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date | null;
  } | null;
  agent: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  } | null;
  createdAt: Date | string;
  updatedAt: Date | string | null;
}

// Search page property interface (simplified for the search results)
export interface SearchProperty {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  propertyImages: string[];
  description?: string;
  propertyCode?: string;
  contact?: string;
  listingType: ListingType;
  rentPrice?: number;
  salePrice?: number;
  size?: number;
  beds?: number;
  baths?: number;
  tags: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
  cityId: string;
  townId: string;
  categoryId: string;
  subCategoryId: string;
  companyId: string;
  agentProfileId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

// Transform function to convert API response to SearchProperty
export function transformPropertyData(apiProperty: PropertyApiResponse): SearchProperty {
  return {
    id: apiProperty.id,
    title: apiProperty.title,
    slug: apiProperty.slug,
    imageUrl: apiProperty.imageUrl || undefined,
    propertyImages: apiProperty.propertyImages,
    description: apiProperty.description || undefined,
    propertyCode: apiProperty.propertyCode || undefined,
    contact: apiProperty.contact || undefined,
    listingType: apiProperty.listingType,
    rentPrice: apiProperty.rentPrice || undefined,
    salePrice: apiProperty.salePrice || undefined,
    size: apiProperty.size || undefined,
    beds: apiProperty.beds || undefined,
    baths: apiProperty.baths || undefined,
    tags: apiProperty.tags,
    address: apiProperty.address || undefined,
    latitude: apiProperty.latitude || undefined,
    longitude: apiProperty.longitude || undefined,
    cityId: apiProperty.cityId,
    townId: apiProperty.townId,
    categoryId: apiProperty.categoryId,
    subCategoryId: apiProperty.subCategoryId,
    companyId: apiProperty.companyId,
    agentProfileId: apiProperty.agentProfileId,
    userId: apiProperty.userId,
    createdAt: new Date(apiProperty.createdAt),
    updatedAt: apiProperty.updatedAt ? new Date(apiProperty.updatedAt) : null
  };
}

// Update PropertyFilters interface to match your needs
export interface PropertyFilters {
  listingType?: ListingType;
  cityId?: string;
  townId?: string;
  categoryId?: string;
  subCategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minSize?: number;
  maxSize?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}


