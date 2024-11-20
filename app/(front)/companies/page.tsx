import { getCompanies } from "@/actions/companies";
import CompanyList from "@/components/Frontend/Company/CompanyList";


export default async function page() {
  const companies = await getCompanies();
return (
  <div>
    <CompanyList companies={companies.data || []} />
  </div>
);
  
}

