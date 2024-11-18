"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ListingType } from "@prisma/client";
import { PropertyFilters } from "@/types/types";

// Custom error class for property-related errors
class PropertyError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "PropertyError";
  }
}

// TypeScript interface for property validation
export interface PropertyProps {
  title: string;
  slug: string;
  imageUrl?: string;
  propertyImages?: string[];
  description?: string;
  propertyCode?: string;
  contact?: string;
  listingType: ListingType;
  rentPrice?: number;
  salePrice?: number;
  size?: number;
  beds?: number;
  baths?: number;
  tags?: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
  cityId: string;
  townId: string;
  categoryId: string;
  companyId: string;
  subCategoryId: string;
  userId: string;
  agentProfileId: string; // Added missing required field
}

// Validation function to replace Zod schema
function validateProperty(data: Partial<PropertyProps>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title) {
    errors.push("Title is required");
  }

  if (!data.slug) {
    errors.push("Slug is required");
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push(
      "Slug must contain only lowercase letters, numbers, and hyphens"
    );
  }

  if (data.imageUrl && !/^https?:\/\/.+/.test(data.imageUrl)) {
    errors.push("Invalid image URL format");
  }

  if (data.propertyImages?.some((url) => !/^https?:\/\/.+/.test(url))) {
    errors.push("Invalid property image URL format");
  }

  if (data.size !== undefined && data.size <= 0) {
    errors.push("Size must be a positive number");
  }

  if (
    data.beds !== undefined &&
    (data.beds < 0 || !Number.isInteger(data.beds))
  ) {
    errors.push("Beds must be a non-negative integer");
  }

  if (data.baths !== undefined && data.baths < 0) {
    errors.push("Baths must be a non-negative number");
  }

  if (
    data.latitude !== undefined &&
    (data.latitude < -90 || data.latitude > 90)
  ) {
    errors.push("Latitude must be between -90 and 90");
  }

  if (
    data.longitude !== undefined &&
    (data.longitude < -180 || data.longitude > 180)
  ) {
    errors.push("Longitude must be between -180 and 180");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
interface PropertyResponse {
  properties: any[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

function buildWhereClause(filters?: PropertyFilters) {
  const where: any = {};

  if (filters?.listingType) {
    where.listingType = filters.listingType;
  }
  if (filters?.cityId) {
    where.cityId = filters.cityId;
  }
  if (filters?.townId) {
    where.townId = filters.townId;
  }
  if (filters?.categoryId) {
    where.categoryId = filters.categoryId;
  }
  if (filters?.beds) {
    where.beds = { gte: filters.beds };
  }
  if (filters?.baths) {
    where.baths = { gte: filters.baths };
  }
  if (filters?.size?.min || filters?.size?.max) {
    where.size = {
      ...(filters.size.min && { gte: filters.size.min }),
      ...(filters.size.max && { lte: filters.size.max }),
    };
  }
  if (filters?.minPrice || filters?.maxPrice) {
    where.OR = [
      {
        rentPrice: {
          ...(filters.minPrice && { gte: filters.minPrice }),
          ...(filters.maxPrice && { lte: filters.maxPrice }),
        },
      },
      {
        salePrice: {
          ...(filters.minPrice && { gte: filters.minPrice }),
          ...(filters.maxPrice && { lte: filters.maxPrice }),
        },
      },
    ];
  }

  if (filters?.searchTerm) {
    where.OR = [
      { title: { contains: filters.searchTerm, mode: "insensitive" } },
      { description: { contains: filters.searchTerm, mode: "insensitive" } },
      { propertyCode: { contains: filters.searchTerm, mode: "insensitive" } },
      { address: { contains: filters.searchTerm, mode: "insensitive" } },
    ];
  }

  return where;
}

 

export async function getFeaturedProperties(limit: number = 6) {
  try {
    const featuredProperties = await prismaClient.property.findMany({
      where: {
        tags: {
          has: 'featured'
        }
      },
      // include: {
      //   category: {
      //     select: {
      //       id: true,
      //       title: true,
      //     }
      //   },
      //   city: {
      //     select: {
      //       id: true,
      //       name: true,
      //     }
      //   },
      // },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        listingType: true,
        rentPrice: true,
        salePrice: true,
        size: true,
        beds: true,
        baths: true,
        address: true,
        createdAt: true,
        category: true,
        city: true,
        town: true,
      },
      take: limit,
      orderBy: {
        createdAt: 'asc'
      }
    });

    return {
      success: true,
      data: featuredProperties
    };
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return {
      success: false,
      error: "Failed to fetch featured properties"
    };
  }
}
export async function getProperties(filters: PropertyFilters) {
  return prismaClient.property.findMany({
    where: {
      ...(filters.listingType && { listingType: filters.listingType }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.subCategoryId && {
        subCategory: {
          title: filters.subCategoryId
        }
      }),
      ...(filters.cityId && { cityId: filters.cityId }),
      ...(filters.minPrice && { rentPrice: { gte: filters.minPrice } }),
      ...(filters.maxPrice && { rentPrice: { lte: filters.maxPrice } }),
      ...(filters.beds && { beds: { gte: filters.beds } }),
      ...(filters.baths && { baths: { gte: filters.baths } }),
      ...(filters.size?.min && { size: { gte: filters.size.min } }),

      ...(filters.searchTerm && {
        OR: [
          { title: { contains: filters.searchTerm, mode: 'insensitive' } },
          { description: { contains: filters.searchTerm, mode: 'insensitive' } }
        ]
      })
    },
    include: {
      city: true,
      category: true,
      subCategory: true,
    }
  });
}

export async function createProperty(data: PropertyProps) {
  try {
    console.log("Creating property with data:", data);
    const validation = validateProperty(data);

    if (!validation.isValid) {
      return {
        data: null,
        status: 400,
        error: {
          code: "VALIDATION_ERROR",
          details: validation.errors,
        },
      };
    }

    const newProperty = await prismaClient.property.create({
      data: {
        ...data,
      },
      include: {
        city: true,
        town: true,
        category: true,
        subCategory: true,
        company: true,
      },
    });

    revalidatePath("/dashboard/properties");

    return {
      data: newProperty,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error("Detailed error:", error);
    if (error instanceof PropertyError) {
      return {
        data: null,
        status: error.status,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }
    console.error(error);
    return {
      data: null,
      status: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function updateProperty(id: string, data: Partial<PropertyProps>) {
  try {
    const validation = validateProperty(data);

    if (!validation.isValid) {
      return {
        data: null,
        status: 400,
        error: {
          code: "VALIDATION_ERROR",
          details: validation.errors,
        },
      };
    }

    const existingProperty = await prismaClient.property.findUnique({
      where: { id },
      include: { amenities: true },
    });

    if (!existingProperty) {
      throw new PropertyError("Property not found", 404, "PROPERTY_NOT_FOUND");
    }

    await prismaClient.amenity.deleteMany({
      where: { propertyId: id },
    });

    const updatedProperty = await prismaClient.property.update({
      where: { id },
      data: {
        ...data,
      },
      include: {
        city: true,
        town: true,
        category: true,
        subCategory: true,
        company: true,
        amenities: true,
      },
    });

    revalidatePath("/dashboard/properties");

    return {
      data: updatedProperty,
      status: 200,
      error: null,
    };
  } catch (error) {
    if (error instanceof PropertyError) {
      return {
        data: null,
        status: error.status,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }
    console.error(error);
    return {
      data: null,
      status: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function getPropertyBySlug(slug: string) {
  try {
    if (!slug) {
      throw new PropertyError("Slug is required", 400, "INVALID_SLUG");
    }

    const property = await prismaClient.property.findUnique({
      where: { slug },
      include: {
        city: true,
        town: true,
        category: true,
        subCategory: true,
        company: true,
        amenities: true,
        agent: true,
      },
    });

    if (!property) {
      throw new PropertyError("Property not found", 404, "PROPERTY_NOT_FOUND");
    }

    return {
      data: property,
      status: 200,
      error: null,
    };
  } catch (error) {
    if (error instanceof PropertyError) {
      return {
        data: null,
        status: error.status,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }
    console.error(error);
    return {
      data: null,
      status: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function getAllPropertySlugs() {
  try {
    const slugs = await prismaClient.property.findMany({
      select: {
        slug: true,
      },
    });

    if (slugs.length === 0) {
      throw new PropertyError(
        "No property slugs found",
        404,
        "SLUGS_NOT_FOUND"
      );
    }

    return {
      data: slugs,
      status: 200,
      error: null,
    };
  } catch (error) {
    if (error instanceof PropertyError) {
      return {
        data: null,
        status: error.status,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }
    console.error(error);
    return {
      data: null,
      status: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function getSimilarPropertiesBySlug(slug: string) {
  try {
    if (!slug) {
      throw new PropertyError("Slug is required", 400, "INVALID_SLUG");
    }

    // First, fetch the property to get its category ID
    const property = await prismaClient.property.findUnique({
      where: { slug },
      select: {
        id: true,
        categoryId: true,
      },
    });

    if (!property) {
      throw new PropertyError("Property not found", 404, "PROPERTY_NOT_FOUND");
    }

    // Fetch properties in the same category, excluding the current property, limit to 5
    const similarProperties = await prismaClient.property.findMany({
      where: {
        categoryId: property.categoryId,
        id: { not: property.id }, // Exclude the current property
      },
      include: {
        city: true,
        town: true,
        category: true,
        subCategory: true,
        company: true,
        amenities: true,
      },
      take: 5, // Limit to 5 properties
    });

    return {
      data: similarProperties,
      status: 200,
      error: null,
    };
  } catch (error) {
    if (error instanceof PropertyError) {
      return {
        data: null,
        status: error.status,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }
    console.error(error);
    return {
      data: null,
      status: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function deleteProperty(id: string) {
  try {
    if (!id) {
      throw new PropertyError("Property ID is required", 400, "INVALID_ID");
    }

    const property = await prismaClient.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new PropertyError("Property not found", 404, "PROPERTY_NOT_FOUND");
    }

    await prismaClient.property.delete({
      where: { id },
    });

    revalidatePath("/dashboard/properties");

    return {
      data: null,
      status: 200,
      error: null,
    };
  } catch (error) {
    if (error instanceof PropertyError) {
      return {
        data: null,
        status: error.status,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }
    console.error(error);
    return {
      data: null,
      status: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
}

export async function getUserProperties(
  userId: string,
  pagination?: PaginationParams
) {
  try {
    if (!userId) {
      throw new PropertyError("User ID is required", 400, "INVALID_USER_ID");
    }

    const skip = pagination
      ? (pagination.page - 1) * pagination.limit
      : undefined;
    const take = pagination?.limit;

    const [properties, total] = await prismaClient.$transaction([
      prismaClient.property.findMany({
        where: { userId },
        skip,
        take,
        include: {
          city: true,
          town: true,
          category: true,
          subCategory: true,
          company: true,
          amenities: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prismaClient.property.count({ where: { userId } }),
    ]);

    return {
      data: properties,
      total,
      pages: pagination ? Math.ceil(total / pagination.limit) : 1,
      currentPage: pagination?.page ?? 1,
      status: 200,
      error: null,
    };
  } catch (error) {
    if (error instanceof PropertyError) {
      return {
        data: null,
        status: error.status,
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }
    console.error(error);
    return {
      data: null,
      status: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
}
