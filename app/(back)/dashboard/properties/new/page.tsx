import { getAgentProfiles } from "@/actions/agentProfile";
import { getCategories } from "@/actions/categories";
import { getCities } from "@/actions/cities";
import { getCompanies } from "@/actions/companies";
import { getSubCategories } from "@/actions/subCategories";
import { getAllTowns } from "@/actions/towns";
import PropertyForm from "@/components/Dashboard/PropertyForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function CreatePropertyPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [categoriesRes, subcategoriesRes, citiesRes, townsRes, companiesRes, agentsRes] = 
    await Promise.all([
      getCategories(),
      getSubCategories(),
      getCities(),
      getAllTowns(),
      getCompanies(),
      getAgentProfiles()
    ]);

  const categories = categoriesRes.data || [];
  const subcategories = subcategoriesRes.data || [];
  const cities = citiesRes.data || [];
  const towns = townsRes.data || [];
  const companies = companiesRes.data || [];
  const agents = (agentsRes.data || []).map((agent: any) => ({// eslint-disable-line @typescript-eslint/no-explicit-any
    id: agent.id,
    firstName: agent.user?.firstName || "",
    lastName: agent.user?.lastName || "",
  }));

  return (
    <div>
      <PropertyForm
        title="Create Property"
        userId={session.user.id}
        categories={categories}
        cities={cities}
        towns={towns}
        companies={companies}
        agents={agents}
        subCategories={subcategories}
      />
    </div>
  );
}
