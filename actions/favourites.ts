"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface FavouriteProps {
  userId: string;
  propertyId: string;
}

//add to favourites
export async function addToFavourites({ userId, propertyId }: FavouriteProps) {
  try {
    const favourite = await prismaClient.favourite.create({
      data: {
        userId,
        propertyId,
      },
    });


    return {
      data: favourite,
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

// Remove a property from user's favourites
export async function removeFromFavourites(userId: string, propertyId: string) {
  try {
    const favourite = await prismaClient.favourite.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (!favourite) {
      return {
        data: null,
        status: 404,
        error: "Favourite not found",
      };
    }

    await prismaClient.favourite.delete({
      where: {
        id: favourite.id,
      },
    });
    revalidatePath("/dashboard/favourites");
    revalidatePath("/properties");

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

// Get all favourites for a user
export async function getUserFavourites(userId: string) {
  try {
    const favourites = await prismaClient.favourite.findMany({
      where: {
        userId,
      },
      include: {
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: favourites.map((favourite) => ({
        id: favourite.id,
        propertyId: favourite.propertyId,
        property: favourite.property,
        createdAt: favourite.createdAt,
      })),
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

// Check if a property is in user's favourites
export async function checkIsFavourite(userId: string, propertyId: string) {
  try {
    const favourite = await prismaClient.favourite.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    return {
      data: !!favourite,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: false,
      status: 500,
      error,
    };
  }
}


// Toggle favourite status
export async function toggleFavourite(userId: string, propertyId: string) {
  try {
    const favourite = await prismaClient.favourite.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (favourite) {
      // Property is already a favorite, remove it
      await prismaClient.favourite.delete({
        where: {
          id: favourite.id,
        },
      });
      revalidatePath("/dashboard/favourites");
      revalidatePath("/properties");
      return {
        data: false,
        status: 200,
        error: null,
      };
    } else {
      // Property is not a favorite, add it
      await prismaClient.favourite.create({
        data: {
          userId,
          propertyId,
        },
      });
      revalidatePath("/dashboard/favourites");
      revalidatePath("/properties");
      return {
        data: true,
        status: 200,
        error: null,
      };
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

