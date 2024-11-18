// types/models.ts

export enum ListingType {
  SALE = "SALE",
  RENT = "RENT"
}

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
  imageUrl?: string;
  description?: string;
  content?: string;
  categorySlug: string;
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

// User Model


// UserProfile Model
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

// Company Model
export type Company = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  email?: string;
  phone?: string;
  phone2?: string;
  address?: string;
  address2?: string;
  website?: string;
  agents: AgentProfile[];  // Added agents relationship
  properties: Property[];
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
