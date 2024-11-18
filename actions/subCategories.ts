"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface SubCategoryProps {
  title: string;
  slug: string;
  categoryId: string;
}

// Create a new subcategory
export async function createSubCategory(data: SubCategoryProps) {
  try {
    const existingSubCategory = await prismaClient.subCategory.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingSubCategory) {
      return {
        data: null,
        status: 409,
        error: "Subcategory already exists",
      };
    }

    const newSubCategory = await prismaClient.subCategory.create({
      data,
    });
    revalidatePath(`/dashboard/subcategories?categoryId=${data.categoryId}`);

    return {
      data: newSubCategory,
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

// Update an existing subcategory by ID
export async function updateSubCategory(id: string, data: SubCategoryProps) {
  try {
    const existingSubCategory = await prismaClient.subCategory.findUnique({
      where: {
        id,
      },
    });

    if (!existingSubCategory) {
      return {
        data: null,
        status: 404,
        error: "Subcategory does not exist",
      };
    }

    const updatedSubCategory = await prismaClient.subCategory.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath(`/dashboard/subcategories?categoryId=${data.categoryId}`);

    return {
      data: updatedSubCategory,
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

// Fetch all subcategories
export async function getSubCategories() {
  try {
    const subcategories = await prismaClient.subCategory.findMany({
      include: {
        category: true, // Include the related category data
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: subcategories,
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

// Create multiple predefined subcategories for a specific category
export async function createManySubCategories(categoryId: string) {
  try {
    const subcategories = [
     
    
      { title: "Townhouses & Complexes", slug: "townhouses-complexes", categoryId },
      { title: "Cottages", slug: "cottages", categoryId },
      { title: "Detached Houses", slug: "detached-houses",categoryId },
      { title: "Semi-Detached Houses", slug: "semi-detached-houses", categoryId },
    ];

    for (const subcategory of subcategories) {
      try {
        await createSubCategory(subcategory);
      } catch (error) {
        console.error(`Error creating subcategory "${subcategory.title}":`, error);
      }
    }
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Fetch all subcategories for a specific category
export async function getSubCategoriesByCategory(categoryId: string) {
  try {
    const subcategories = await prismaClient.subCategory.findMany({
      where: {
        categoryId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: subcategories,
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

// Fetch a single subcategory by slug
export async function getSubCategoryBySlug(slug: string) {
  try {
    const subcategory = await prismaClient.subCategory.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
      },
    });

    return {
      data: subcategory,
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

// Delete a subcategory by ID
export async function deleteSubCategory(id: string) {
  try {
    const deletedSubCategory = await prismaClient.subCategory.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/dashboard/subcategories?categoryId=${deletedSubCategory.categoryId}`);

    return {
      ok: true,
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