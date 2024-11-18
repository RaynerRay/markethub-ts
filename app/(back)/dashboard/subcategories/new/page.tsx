
import { getCategories } from "@/actions/categories";
import SubCategoryForm from "@/components/Dashboard/SubCategoryForm";
import React from "react";

export default async function page() {
  const categories = (await getCategories()).data || [];
  return (
    <div>
      <SubCategoryForm 
        title="Create Sub Category"
        categories={categories} 
        // initialData={subcategoryData} 
  />
    </div>
  );
}
