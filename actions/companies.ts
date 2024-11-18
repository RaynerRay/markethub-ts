"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface CompanyProps {
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
}

// Create a new company
export async function createCompany(data: CompanyProps) {
  try {
    const existingCompany = await prismaClient.company.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingCompany) {
      return {
        data: null,
        status: 409,
        error: "Company with this slug already exists",
      };
    }

    const newCompany = await prismaClient.company.create({
      data,
    });
    revalidatePath("/dashboard/companies");
    revalidatePath("/companies"); // If there's a public companies page

    return {
      data: newCompany,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Update an existing company
export async function updateCompany(id: string, data: Partial<CompanyProps>) {
  try {
    const existingCompany = await prismaClient.company.findUnique({
      where: {
        id,
      },
    });

    if (!existingCompany) {
      return {
        data: null,
        status: 404,
        error: "Company not found",
      };
    }

    const updatedCompany = await prismaClient.company.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/companies");
    revalidatePath("/companies");
    revalidatePath(`/companies/${updatedCompany.slug}`);

    return {
      data: updatedCompany,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Get all companies with optional pagination and filtering
export async function getCompanies(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  try {
    const where: any = {};
    
    if (params?.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    // Calculate pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prismaClient.company.count({ where });

    const companies = await prismaClient.company.findMany({
      where,
      include: {
        properties: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            properties: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    return {
      data: companies,
      metadata: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      metadata: null,
      status: 500,
      error,
    };
  }
}

// Get a single company by slug
export async function getCompanyBySlug(slug: string) {
  try {
    const company = await prismaClient.company.findUnique({
      where: {
        slug,
      },
      include: {
        properties: {
          include: {
            city: true,
            category: true,
            subCategory: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            properties: true,
          },
        },
      },
    });

    if (!company) {
      return {
        data: null,
        status: 404,
        error: "Company not found",
      };
    }

    return {
      data: company,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Delete a company
export async function deleteCompany(id: string) {
  try {
    const company = await prismaClient.company.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            properties: true,
          },
        },
      },
    });

    if (!company) {
      return {
        ok: false,
        status: 404,
        error: "Company not found",
      };
    }

    if (company._count.properties > 0) {
      return {
        ok: false,
        status: 400,
        error: "Cannot delete company with existing properties",
      };
    }

    await prismaClient.company.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/companies");
    revalidatePath("/companies");

    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: 500,
      error,
    };
  }
}

// Get company statistics
export async function getCompanyStats(id: string) {
  try {
    const company = await prismaClient.company.findUnique({
      where: {
        id,
      },
      include: {
        properties: {
          select: {
            listingType: true,
            rentPrice: true,
            salePrice: true,
          },
        },
        _count: {
          select: {
            properties: true,
          },
        },
      },
    });

    if (!company) {
      return {
        data: null,
        status: 404,
        error: "Company not found",
      };
    }

    const stats = {
      totalProperties: company._count.properties,
      forSale: company.properties.filter(p => p.listingType === 'SALE').length,
      forRent: company.properties.filter(p => p.listingType === 'RENT').length,
      totalRentValue: company.properties
        .filter(p => p.listingType === 'RENT')
        .reduce((sum, p) => sum + (p.rentPrice || 0), 0),
      totalSaleValue: company.properties
        .filter(p => p.listingType === 'SALE')
        .reduce((sum, p) => sum + (p.salePrice || 0), 0),
    };

    return {
      data: stats,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Get top companies by property count
export async function getTopCompanies(limit: number = 5) {
  try {
    const companies = await prismaClient.company.findMany({
      take: limit,
      include: {
        _count: {
          select: {
            properties: true,
          },
        },
      },
      orderBy: {
        properties: {
          _count: 'desc',
        },
      },
    });

    return {
      data: companies,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Search companies
export async function searchCompanies(query: string) {
  try {
    const companies = await prismaClient.company.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { address: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        _count: {
          select: {
            properties: true,
          },
        },
      },
      take: 10,
    });

    return {
      data: companies,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}