import { getCompanies } from "@/actions/companies";
import AgentProfileForm from "@/components/Frontend/AgentProfileForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch all required data
  const [companiesRes] = await Promise.all([getCompanies()]);

  const companies = companiesRes.data || [];
  return (
    <div>
      <AgentProfileForm userId={session.user.id} companies={companies} />;
    </div>
  );
};

export default page;
