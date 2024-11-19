// import { getAdvertBySlug } from "@/actions/adverts";
// import AdvertForm from "@/components/Dashboard/AdvertForm";
// import React from "react";

// export default async function page({
//   params: { slug },
// }: {
//   params: { slug: string };
// }) {
//   const advert = (await getAdvertBySlug(slug))?.data;
//   return (
//     <div>
//       {advert && advert.id && (
//         <AdvertForm title="Update Service" initialData={advert} />
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