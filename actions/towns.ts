"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface TownProps {
  title: string;
  slug: string;
  cityId: string;
}

// Create a new town
export async function createTown(data: TownProps) {
  try {
    const existingTown = await prismaClient.town.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingTown) {
      return {
        data: null,
        status: 409,
        error: "Town already exists",
      };
    }

    const newTown = await prismaClient.town.create({
      data,
    });
    revalidatePath(`/dashboard/towns?cityId=${data.cityId}`);

    return {
      data: newTown,
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

//Get all Towns
export async function getAllTowns() {
  try {
    const towns = await prismaClient.town.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      data: towns,
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
// Update an existing town by ID
export async function updateTown(id: string, data: TownProps) {
  try {
    const existingTown = await prismaClient.town.findUnique({
      where: {
        id,
      },
    });

    if (!existingTown) {
      return {
        data: null,
        status: 404,
        error: "Town does not exist",
      };
    }

    const updatedTown = await prismaClient.town.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath(`/dashboard/towns?cityId=${data.cityId}`);

    return {
      data: updatedTown,
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

// Create multiple predefined towns for a specific city
export async function createManyTowns(cityId: string) {
  try {
   
    const towns = [
      { title: "Adylinn", slug: "adylinn", cityId },
      { title: "Alexandra Park", slug: "alexandra-park", cityId },
      { title: "Amby", slug: "amby", cityId },
      { title: "Arcadia", slug: "arcadia", cityId },
      { title: "Arcadia South", slug: "arcadia-south", cityId },
      { title: "Arcadia West", slug: "arcadia-west", cityId },
      { title: "Ardbennie", slug: "ardbennie", cityId },
      { title: "Arlington", slug: "arlington", cityId },
      { title: "Ashbrittle", slug: "ashbrittle", cityId },
      { title: "Ashdown Park", slug: "ashdown-park", cityId },
      { title: "Aspindale Park", slug: "aspindale-park", cityId },
      { title: "Athlone", slug: "athlone", cityId },
      { title: "Avenues", slug: "avenues", cityId },
      { title: "Avon Rise", slug: "avon-rise", cityId },
      { title: "Avondale", slug: "avondale", cityId },
      { title: "Avondale West", slug: "avondale-west", cityId },
      { title: "Avonlea", slug: "avonlea", cityId },
      { title: "Ballantyne Park", slug: "ballantyne-park", cityId },
      { title: "Barrington", slug: "barrington", cityId },
      { title: "Belgravia", slug: "belgravia", cityId },
      { title: "Belvedere North", slug: "belvedere-north", cityId },
      { title: "Belvedere South", slug: "belvedere-south", cityId },
      { title: "Beverley", slug: "beverley", cityId },
      { title: "Beverley West", slug: "beverley-west", cityId },
      { title: "Bingley", slug: "bingley", cityId },
      { title: "Bloomingdale", slug: "bloomingdale", cityId },
      { title: "Bluff Hill", slug: "bluff-hill", cityId },
      { title: "Bluff Hill Park", slug: "bluff-hill-park", cityId },
      { title: "Borrowdale", slug: "borrowdale", cityId },
      { title: "Borrowdale Brooke", slug: "borrowdale-brooke", cityId },
      { title: "Borrowdale West", slug: "borrowdale-west", cityId },
      { title: "Braeside", slug: "braeside", cityId },
      { title: "Brooke Ridge", slug: "brooke-ridge", cityId },
      { title: "Chadcombe", slug: "chadcombe", cityId },
      { title: "Chisipite", slug: "chisipite", cityId },
      { title: "Chitungwiza", slug: "chitungwiza", cityId },
      { title: "Chizanje", slug: "chizanje", cityId },
      { title: "Civic Centre", slug: "civic-centre", cityId },
      { title: "Cleveland Park", slug: "cleveland-park", cityId },
      { title: "Colne Valley", slug: "colne-valley", cityId },
      { title: "Colray", slug: "colray", cityId },
      { title: "Comet Rise", slug: "comet-rise", cityId },
      { title: "Coronation Park", slug: "coronation-park", cityId },
      { title: "Cotswold Hills", slug: "cotswold-hills", cityId },
      { title: "Cranborne", slug: "cranborne", cityId },
      { title: "Crawborough", slug: "crawborough", cityId },
      { title: "Dawn Hill", slug: "dawn-hill", cityId },
      { title: "Derbyshire Township", slug: "derbyshire-township", cityId },
      { title: "Donnybrook", slug: "donnybrook", cityId },
      { title: "Downlands Park", slug: "downlands-park", cityId },
      { title: "Dungarven", slug: "dungarven", cityId },
      { title: "Dunowen", slug: "dunowen", cityId },
      { title: "Eastlea", slug: "eastlea", cityId },
      { title: "Eastlea South", slug: "eastlea-south", cityId },
      { title: "Emerald Hill", slug: "emerald-hill", cityId },
      { title: "Epworth", slug: "epworth", cityId },
      { title: "Glen Lorne", slug: "glen-lorne", cityId
    
     },
      { title: "Glen Norah", slug: "glen-norah", cityId },
      { title: "Glen View", slug: "glen-view", cityId },
      { title: "Glenavon Est", slug: "glenavon-est", cityId },
      { title: "Glenwood", slug: "glenwood", cityId },
      { title: "Gletwyn A", slug: "gletwyn-a", cityId },
      { title: "Graniteside", slug: "graniteside", cityId },
      { title: "Green Grove", slug: "green-grove", cityId },
      { title: "Greencroft", slug: "greencroft", cityId },
      { title: "Greendale", slug: "greendale", cityId },
      { title: "Greystone Park", slug: "greystone-park", cityId },
      { title: "Grobbie Park", slug: "grobbie-park", cityId },
      { title: "Groombridge", slug: "groombridge", cityId },
      { title: "Gun Hill", slug: "gun-hill", cityId },
      { title: "Haig Park", slug: "haig-park", cityId },
      { title: "Harare CBD", slug: "harare-cbd", cityId },
      { title: "Hartlands", slug: "hartlands", cityId },
      { title: "Hatcliffe", slug: "hatcliffe", cityId },
      { title: "Hatfield", slug: "hatfield", cityId },
      { title: "Helensvale", slug: "helensvale", cityId },
      { title: "Highfield", slug: "highfield", cityId },
      { title: "Highlands", slug: "highlands", cityId },
      { title: "Hillside", slug: "hillside", cityId },
      { title: "Hopley", slug: "hopley", cityId },
      { title: "Houghton Park", slug: "houghton-park", cityId },
      { title: "Induna", slug: "induna", cityId },
      { title: "Inkubusi", slug: "inkubusi", cityId },
      { title: "Kambanji", slug: "kambanji", cityId },
      { title: "Kambuzuma", slug: "kambuzuma", cityId },
      { title: "Kaseke", slug: "kaseke", cityId },
      { title: "Kensington", slug: "kensington", cityId },
      { title: "Kingsmead", slug: "kingsmead", cityId },
      { title: "Kopje", slug: "kopje", cityId },
      { title: "Kutsaga Village", slug: "kutsaga-village", cityId },
      { title: "Letombo Park", slug: "letombo-park", cityId },
      { title: "Lewisam", slug: "lewisam", cityId },
      { title: "Lichendale", slug: "lichendale", cityId },
      { title: "Lincoln Green", slug: "lincoln-green", cityId },
      { title: "Little Norfolk", slug: "little-norfolk", cityId },
      { title: "Lochinvar", slug: "lochinvar", cityId },
      { title: "Logan Park", slug: "logan-park", cityId },
      { title: "Lorelei", slug: "lorelei", cityId },
      { title: "Luna", slug: "luna", cityId },
      { title: "Mabelreign", slug: "mabelreign", cityId },
      { title: "Mabvuku", slug: "mabvuku", cityId },
      { title: "Mainway Meadows", slug: "mainway-meadows", cityId },
      { title: "Malvern", slug: "malvern", cityId },
      { title: "Mandara", slug: "mandara", cityId },
      { title: "Manresa", slug: "manresa", cityId },
      { title: "Marlborough", slug: "marlborough", cityId },
      { title: "Matidoda Park", slug: "matidoda-park", cityId },
      { title: "Mayfield Park", slug: "mayfield-park", cityId },
      { title: "Mbare", slug: "mbare", cityId },
      { title: "Meyrick Park", slug: "meyrick-park", cityId },
      { title: "Midlands", slug: "midlands", cityId },
      { title: "Milton Park", slug: "milton-park", cityId },
      { title: "Mon Abri", slug: "mon-abri", cityId },
      { title: "Monovale", slug: "monovale", cityId },
      { title: "Mount Pleasant", slug: "mount-pleasant", cityId },
      { title: "Mount Pleasant Heights", slug: "mount-pleasant-heights", cityId },
      { title: "Mufakose", slug: "mufakose", cityId },
      { title: "Murray", slug: "murray", cityId },
      { title: "Norton", slug: "norton", cityId },
      { title: "Oldfields", slug: "oldfields", cityId },
      { title: "Olive Tree", slug: "olive-tree", cityId },
      { title: "Parktown", slug: "parktown", cityId },
      { title: "Pinewood", slug: "pinewood", cityId },
      { title: "Pomona", slug: "pomona", cityId },
      { title: "Prospect", slug: "prospect", cityId },
      { title: "Redan", slug: "redan", cityId },
      { title: "Richmond", slug: "richmond", cityId },
      { title: "Rockview", slug: "rockview", cityId },
      { title: "Sable Valley", slug: "sable-valley", cityId },
      { title: "Sanctuary", slug: "sanctuary", cityId },
      { title: "Sunningdale", slug: "sunningdale", cityId },
      { title: "Sunridge", slug: "sunridge", cityId },
      { title: "The Grange", slug: "the-grange", cityId },
      { title: "The Meadows", slug: "the-meadows", cityId },
      { title: "The Ridge", slug: "the-ridge", cityId },
      { title: "Thornhill", slug: "thornhill", cityId },
      { title: "Tynwald", slug: "tynwald", cityId },
      { title: "Vainona", slug: "vainona", cityId },
      { title: "Vainona Park", slug: "vainona-park", cityId },
      { title: "Windsor Park", slug: "windsor-park", cityId },
      { title: "Woodland", slug: "woodland", cityId },
      { title: "Zimre Park", slug: "zimre-park", cityId },
      { title: "Zimre Park Heights", slug: "zimre-park-heights", cityId },
      { title: "Zimre Park N", slug: "zimre-park-n", cityId },
      { title: "Zimre Park South", slug: "zimre-park-south", cityId }
    ];

    for (const town of towns) {
      try {
        await createTown(town);
      } catch (error) {
        console.error(`Error creating town "${town.title}":`, error);
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

// Fetch all towns for a specific city
export async function getTownsByCity(cityId: string) {
  try {
    const towns = await prismaClient.town.findMany({
      where: {
        cityId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: towns,
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

// Fetch a single town by slug
export async function getTownBySlug(slug: string) {
  try {
    const town = await prismaClient.town.findUnique({
      where: {
        slug,
      },
      include: {
        city: true, // Include city details for context
      },
    });

    return {
      data: town,
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

// Delete a town by ID
export async function deleteTown(id: string) {
  try {
    const deletedTown = await prismaClient.town.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/dashboard/towns?cityId=${deletedTown.cityId}`);

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
