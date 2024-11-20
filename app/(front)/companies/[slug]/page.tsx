import CompanyDetail from "@/components/Frontend/Company/CompanyDetail";
import { getCompanyBySlug } from "@/actions/companies";
import { Company } from "@/types/types";

type PageProps = {
  params: {
    slug: string;
  };
};

// Type guard to ensure company data matches Company type
function isValidCompany(data: any): data is Company {// eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    data &&
    typeof data === "object" &&
    "id" in data &&
    "title" in data &&
    "slug" in data &&
    Array.isArray(data.properties) &&
    Array.isArray(data.agents) &&
    "createdAt" in data
  );
}

// Transform API response to match Company type
function transformCompanyData(apiResponse: any): Company {// eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    id: apiResponse.id,
    title: apiResponse.title,
    slug: apiResponse.slug,
    imageUrl: apiResponse.imageUrl || null,
    description: apiResponse.description || null,
    email: apiResponse.email || null,
    phone: apiResponse.phone || null,
    phone2: apiResponse.phone2 || null,
    address: apiResponse.address || null,
    address2: apiResponse.address2 || null,
    website: apiResponse.website || null,
    properties: apiResponse.properties.map((p: any) => ({ id: p.id })),// eslint-disable-line @typescript-eslint/no-explicit-any
    agents: apiResponse.agents || [],
    _count: apiResponse._count || { properties: 0 },
    createdAt: new Date(apiResponse.createdAt),
    updatedAt: apiResponse.updatedAt ? new Date(apiResponse.updatedAt) : null
  };
}

export default async function Page({ params }: PageProps) {
  const awaitedParams = await Promise.resolve(params);
  const companyResponse = await getCompanyBySlug(awaitedParams.slug);
  
  // Transform and validate the company data
  let companyData: Company | null = null;
  
  if (companyResponse.data) {
    const transformedData = transformCompanyData(companyResponse.data);
    if (isValidCompany(transformedData)) {
      companyData = transformedData;
    }
  }

  // If no valid company data is found, you might want to handle this case
  if (!companyData) {
    return <div>Company not found</div>;
  }

  return <CompanyDetail company={companyData} />;
}