"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface CityProps {
  title: string;
  slug: string;
}

// Create a new city
export async function createCity(data: CityProps) {
  try {
    const existingCity = await prismaClient.city.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingCity) {
      return {
        data: null,
        status: 409,
        error: "City already exists",
      };
    }

    const newCity = await prismaClient.city.create({
      data,
    });
    revalidatePath("/dashboard/cities");

    return {
      data: newCity,
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

// Update an existing city by ID
export async function updateCity(id: string, data: CityProps) {
  try {
    const existingCity = await prismaClient.city.findUnique({
      where: {
        id,
      },
    });

    if (!existingCity) {
      return {
        data: null,
        status: 404,
        error: "City does not exist",
      };
    }

    const updatedCity = await prismaClient.city.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/cities");

    return {
      data: updatedCity,
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

// Create multiple predefined cities
export async function createManyCities() {
  try {
    const cities = [
      { title: "Alaska", slug: "alaska" },
      { title: "Arcturus", slug: "arcturus" },
      { title: "Banket", slug: "banket" },
      { title: "Battlefields", slug: "battlefields" },
      { title: "Beatrice", slug: "beatrice" },
      { title: "Bindura", slug: "bindura" },
      { title: "Birchenough Bridge", slug: "birchenough-bridge" },
      { title: "Bromley", slug: "bromley" },
      { title: "Buhera", slug: "buhera" },
      { title: "Caesar", slug: "caesar" },
      { title: "Cashel", slug: "cashel" },
      { title: "Centenary", slug: "centenary" },
      { title: "Chakari", slug: "chakari" },
      { title: "Charara", slug: "charara" },
      { title: "Chegutu", slug: "chegutu" },
      { title: "Chihota", slug: "chihota" },
      { title: "Chimanimani", slug: "chimanimani" },
      { title: "Chipinge", slug: "chipinge" },
      { title: "Chisumbanje", slug: "chisumbanje" },
      { title: "Chitungwiza", slug: "chitungwiza" },
      { title: "Chivhu", slug: "chivhu" },
      { title: "Chiweshe", slug: "chiweshe" },
      { title: "Chinhoyi", slug: "chinhoyi" },
      { title: "Concession", slug: "concession" },
      { title: "Craigmore", slug: "craigmore" },
      { title: "Darwendale", slug: "darwendale" },
      { title: "Domboshava", slug: "domboshava" },
      { title: "Dorowa", slug: "dorowa" },
      { title: "Eiffel Flats", slug: "eiffel-flats" },
      { title: "Eldorado", slug: "eldorado" },
      { title: "Epworth", slug: "epworth" },
      { title: "Feock", slug: "feock" },
      { title: "Gadzema", slug: "gadzema" },
      { title: "Golden Valley", slug: "golden-valley" },
      { title: "Goromonzi", slug: "goromonzi" },
      { title: "Guruve", slug: "guruve" },
      { title: "Gumira", slug: "gumira" },
      { title: "Hauna", slug: "hauna" },
      { title: "Headlands", slug: "headlands" },
      { title: "Harare", slug: "harare" },
      { title: "Juliasdale", slug: "juliasdale" },
      { title: "Junction Gate", slug: "junction-gate" },
      { title: "Jumbo", slug: "jumbo" },
      { title: "Kadoma", slug: "kadoma" },
      { title: "Kariba", slug: "kariba" },
      { title: "Karoi", slug: "karoi" },
      { title: "Kanyemba", slug: "kanyemba" },
      { title: "Kildonan", slug: "kildonan" },
      { title: "Kotwa", slug: "kotwa" },
      { title: "Kutama", slug: "kutama" },
      { title: "Lion's Den", slug: "lions-den" },
      { title: "Macheke", slug: "macheke" },
      { title: "Madadzi", slug: "madadzi" },
      { title: "Madziwa Mine", slug: "madziwa-mine" },
      { title: "Magunje", slug: "magunje" },
      { title: "Makuti", slug: "makuti" },
      { title: "Makwiro", slug: "makwiro" },
      { title: "Manhenga", slug: "manhenga" },
      { title: "Marondera", slug: "marondera" },
      { title: "Masvingo", slug: "masvingo" },
      { title: "Massi Kessi", slug: "massi-kessi" },
      { title: "Mazowe", slug: "mazowe" },
      { title: "Melfort", slug: "melfort" },
      { title: "Mhangura", slug: "mhangura" },
      { title: "Mount Darwin", slug: "mount-darwin" },
      { title: "Mount Hampden", slug: "mount-hampden" },
      { title: "Mount Selinda", slug: "mount-selinda" },
      { title: "Mukumbura", slug: "mukumbura" },
      { title: "Murambinda", slug: "murambinda" },
      { title: "Muriel", slug: "muriel" },
      { title: "Murombedzi", slug: "murombedzi" },
      { title: "Mutambara", slug: "mutambara" },
      { title: "Mutare", slug: "mutare" },
      { title: "Mutoko", slug: "mutoko" },
      { title: "Mutorashanga", slug: "mutorashanga" },
      { title: "Mushumbi Pools", slug: "mushumbi-pools" },
      { title: "Musweswenedi", slug: "musweswenedi" },
      { title: "Muzarabani District", slug: "muzarabani-district" },
      { title: "Muzvezve", slug: "muzvezve" },
      { title: "Mvurwi", slug: "mvurwi" },
      { title: "Mwami", slug: "mwami" },
      { title: "Norton", slug: "norton" },
      { title: "Nyabira", slug: "nyabira" },
      { title: "Nyamapanda", slug: "nyamapanda" },
      { title: "Nyanga", slug: "nyanga" },
      { title: "Nyanyadzi", slug: "nyanyadzi" },
      { title: "Nyazura", slug: "nyazura" },
      { title: "Odzi", slug: "odzi" },
      { title: "Penhalonga", slug: "penhalonga" },
      { title: "Raffingora", slug: "raffingora" },
      { title: "Redcliff", slug: "redcliff" },
      { title: "Rocky Spruit", slug: "rocky-spruit" },
      { title: "Rusape", slug: "rusape" },
      { title: "Ruwa", slug: "ruwa" },
      { title: "Sakubva", slug: "sakubva" },
      { title: "Sanyati", slug: "sanyati" },
      { title: "Sanyatwe", slug: "sanyatwe" },
      { title: "Selous", slug: "selous" },
      { title: "Shackleton", slug: "shackleton" },
      { title: "Shamva", slug: "shamva" },
      { title: "Shinga", slug: "shinga" },
      { title: "Shurugwi", slug: "shurugwi" },
      { title: "Stapleford", slug: "stapleford" },
      { title: "Tandaai", slug: "tandaai" },
      { title: "Tashinga", slug: "tashinga" },
      { title: "Tengenenge", slug: "tengenenge" },
      { title: "Tengwe", slug: "tengwe" },
      { title: "Tizvione", slug: "tizvione" },
      { title: "Triangle", slug: "triangle" },
      { title: "Troutbeck", slug: "troutbeck" },
      { title: "Tsanzaguru", slug: "tsanzaguru" },
      { title: "Tsunga", slug: "tsunga" },
      { title: "Umsweswe", slug: "umsweswe" },
      { title: "Vanad", slug: "vanad" },
      { title: "Venice", slug: "venice" },
      { title: "Vuti", slug: "vuti" },
      { title: "Watsomba", slug: "watsomba" },
      { title: "Wilton", slug: "wilton" },
      { title: "Zave", slug: "zave" },
      { title: "Zimunya", slug: "zimunya" }
    ]
    ;
    

    for (const city of cities) {
      try {
        await createCity(city);
      } catch (error) {
        console.error(`Error creating city "${city.title}":`, error);
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

// Fetch all cities
export async function getCities() {
  try {
    const cities = await prismaClient.city.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      data: cities,
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

// Fetch a single city by slug
export async function getCityBySlug(slug: string) {
  try {
    const city = await prismaClient.city.findUnique({
      where: {
        slug,
      },
    });

    return {
      data: city,
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

// Delete a city by ID
export async function deleteCity(id: string) {
  try {
    await prismaClient.city.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/cities");

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
