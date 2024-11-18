
import { getCities } from "@/actions/cities";
import TownForm from "@/components/Dashboard/TownForm";
import React from "react";

export default async function page() {
  const cities = (await getCities()).data || [];
  return (
    <div>
      <TownForm 
        title="Create Town" 
        cities={cities} // Array of City objects
        // initialData={townData}   
      />
    </div>
  );
}
