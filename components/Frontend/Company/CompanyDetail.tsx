import React from 'react'; 
import PropertyCard from '../PropertyCard';
import { Company, Property } from '@/types/types';
import Image from 'next/image';

interface CompanyDetailProps {
  company?: Company | null; // company can be optional or null
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company }) => {
  // Handle case where company is null or undefined
  if (!company) {
    return <p className="text-center py-32 text-gray-800 text-xl">Company information not available.</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Company Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <div className="flex items-center mb-6">
          <Image
            src={company.imageUrl || "/placeholder.jpg"} // Fallback for image
            alt={`${company.title || 'Company'} logo`}
            className="w-20 h-20 object-cover rounded-full mr-4"
            width={60}
            height={60}
          />
          <div>
            <h2 className="text-3xl font-bold text-navy-900">{company.title || 'N/A'}</h2>
            <p className="text-gray-500">{company.address || 'Address not available'}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{company.description || 'Description not available'}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h3>
            <ul className="space-y-1">
              <li className="text-gray-600">
                <strong>Email:</strong> {company.email || 'Not available'}
              </li>
              <li className="text-gray-600">
                <strong>Phone:</strong> {company.phone || 'Not available'}
              </li>
              <li className="text-gray-600">
                <strong>Website:</strong>{' '}
                {company.website ? (
                  <a
                    href={company.website}
                    className="text-emerald-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.website}
                  </a>
                ) : (
                  'Not available'
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Property List */}
      <div>
        <h3 className="text-2xl font-semibold text-navy-900 mb-6">Company Properties</h3>
        {company.properties && company.properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No properties available for this company.</p>
        )}
      </div>
    </section>
  );
};

export default CompanyDetail;
