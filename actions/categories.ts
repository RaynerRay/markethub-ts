"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface CategoryProps {
  title: string;
  slug: string;
}

// Create a new category
export async function createCategory(data: CategoryProps) {
  try {
    const existingCategory = await prismaClient.category.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingCategory) {
      return {
        data: null,
        status: 409,
        error: "Category already exists",
      };
    }

    const newCategory = await prismaClient.category.create({
      data,
    });
    revalidatePath("/dashboard/categories");

    return {
      data: newCategory,
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

// Update an existing category by ID
export async function updateCategory(id: string, data: CategoryProps) {
  try {
    const existingCategory = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      return {
        data: null,
        status: 404,
        error: "Category does not exist",
      };
    }

    const updatedCategory = await prismaClient.category.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/categories");

    return {
      data: updatedCategory,
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

// Create multiple predefined categories
export async function createManyCategories() {
  try {
    const categories = [
      { title: "Houses", slug: "houses" },
  { title: "Flats & Apartments", slug: "flats-and-apartments" },
  { title: "Commercial Properties", slug: "commercial-properties" },
  { title: "Land", slug: "land" },
  { title: "Student Accomodation", slug: "student-accomodation" },
  { title: "Rooms", slug: "rooms" },
  { title: "Hotels & Lodges", slug: "hotels-and-lodges" },
  { title: "Warehouses & Factories", slug: "warehouses-and-factories" },
   
    ];

    for (const category of categories) {
      try {
        await createCategory(category);
      } catch (error) {
        console.error(`Error creating category "${category.title}":`, error);
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

// Fetch all categories
export async function getCategories() {
  try {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      data: categories,
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

// Fetch a single category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const category = await prismaClient.category.findUnique({
      where: {
        slug,
      },
    });

    return {
      data: category,
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

// Delete a category by ID
export async function deleteCategory(id: string) {
  try {
    await prismaClient.category.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/categories");

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
