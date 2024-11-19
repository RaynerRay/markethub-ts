import CompanyDetail from "@/components/Frontend/Company/CompanyDetail";
import { getCompanyBySlug } from "@/actions/companies";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  // Explicitly await params if needed
  const awaitedParams = await Promise.resolve(params);
  const company = await getCompanyBySlug(awaitedParams.slug);

  return (
    <>
      <CompanyDetail company={company.data} />
    </>
  );
}