import { getCityBySlug } from "@/actions/cities";
import CityForm from "@/components/Dashboard/CityForm";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const city = (await getCityBySlug(slug))?.data;
  return (
    <div>
      {city && city.id && (
        <CityForm title="Update Service"  />
      )}
    </div>
  );
}
