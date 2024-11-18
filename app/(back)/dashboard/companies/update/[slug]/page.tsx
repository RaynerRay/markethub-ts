import { getCompanyBySlug } from "@/actions/companies";
import CompanyForm from "@/components/Dashboard/CompanyForm";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const company = (await getCompanyBySlug(slug))?.data;
  return (
    <div>
      {company && company.id && (
        <CompanyForm title="Update Company"  />
      )}
    </div>
  );
}
