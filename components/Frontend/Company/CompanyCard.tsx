// components/CompanyCard.tsx
import { Company } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Link href={`/companies/${company.slug}`}>
    <div className="bg-white shadow-md drop-shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center p-4">
        <Image
          src={company.imageUrl ? company.imageUrl : "/placeholder.jpg"}
          alt={`${company.title} logo`}
          className="w-16 h-16 object-cover rounded-full mr-4"
          width={60}
          height={60}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{company.title}</h3>
          <p className="text-sm text-gray-500">{company.address}</p>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          {company.description}
        </p>
      </div>
      <div className="flex justify-between">
      <div className="px-4 py-4 border-t border-gray-200 ">
      <h3 className="text-md font-semibold text-gray-800">{company.phone}</h3>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 flex ">
        <button className="bg-emerald-500 text-white px-3 py-2 rounded-md hover:bg-emerald-600 transition-colors">
          View Details
        </button>
      </div>
      </div>
    </div>
    </Link>
  );
};

export default CompanyCard;
