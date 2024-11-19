// import { getPropertyBySlug } from "@/actions/properties";
// import PropertyForm from "@/components/Dashboard/PropertyForm";
// import React from "react";

// export default async function page({
//   params: { slug },
// }: {
//   params: { slug: string };
// }) {
//   const company = (await getPropertyBySlug(slug))?.data;
//   return (
//     <div>
//       {company && company.id && (
//         <PropertyForm title="Update Property" cities={[]} categories={[]} towns={[]} companies={[]} subCategories={[]} userId="" />
//       )}
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page