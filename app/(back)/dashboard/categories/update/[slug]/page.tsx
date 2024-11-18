import { getCategoryBySlug } from "@/actions/categories";
import CategoryForm from "@/components/Dashboard/CategoryForm";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const category = (await getCategoryBySlug(slug))?.data;
  return (
    <div>
      {category && category.id && (
        <CategoryForm title="Update Service" initialData={category} />
      )}
    </div>
  );
}
