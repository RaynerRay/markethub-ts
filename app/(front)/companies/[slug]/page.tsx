import CompanyDetail from "@/components/Frontend/Company/CompanyDetail";
import { getCompanyBySlug } from "@/actions/companies";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  return (
    <>
      <CompanyDetail company={company.data} />
    </>
  );
}