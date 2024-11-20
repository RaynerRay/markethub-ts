// components/CompanyList.tsx
import React from 'react';
import CompanyCard from './CompanyCard';
import { Company } from '@/types/types';


interface CompanyDetailProps {
  companies: Company[] | [];
}



const CompanyList: React.FC<CompanyDetailProps> = ({ companies }) => {
  if (!companies.length) {
    return <p>No companies found.</p>;
  }
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Company Listing
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Discover our top companies and listing agents.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
};

export default CompanyList;
