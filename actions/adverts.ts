"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface AdvertProps {
  title: string;
  link: string;
  imageUrl: string;
}

// Create a new advert
export async function createAdvert(data: AdvertProps) {
  try {
    const newAdvert = await prismaClient.advert.create({
      data,
    });
    revalidatePath("/dashboard/adverts");

    return {
      data: newAdvert,
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

// Update an existing advert by ID
export async function updateAdvert(id: string, data: AdvertProps) {
  try {
    const existingAdvert = await prismaClient.advert.findUnique({
      where: {
        id,
      },
    });

    if (!existingAdvert) {
      return {
        data: null,
        status: 404,
        error: "Advert does not exist",
      };
    }

    const updatedAdvert = await prismaClient.advert.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/adverts");

    return {
      data: updatedAdvert,
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

// Fetch all adverts
export async function getAdverts() {
  try {
    const adverts = await prismaClient.advert.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: adverts,
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

// Fetch a single advert by ID
export async function getAdvertById(id: string) {
  try {
    const advert = await prismaClient.advert.findUnique({
      where: {
        id,
      },
    });

    return {
      data: advert,
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

// Fetch a single advert by slug
export async function getAdvertBySlug(slug: string) {
  try {
    const advert = await prismaClient.advert.findFirst({
      where: {
        link: {
          endsWith: slug,
        },
      },
    });

    if (!advert) {
      return {
        data: null,
        status: 404,
        error: "Advert not found",
      };
    }

    return {
      data: advert,
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

// Delete an advert by ID
export async function deleteAdvert(id: string) {
  try {
    await prismaClient.advert.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/adverts");

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
