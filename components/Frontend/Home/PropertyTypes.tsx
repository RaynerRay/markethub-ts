import React from 'react';
import { Building2, Home, Building, Store, Warehouse, Castle, Hotel } from 'lucide-react';
import Link from 'next/link';

// Updated Category interface to match Prisma model exactly
interface Category {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date | null;  // Changed from Date | undefined to Date | null
}

interface PropertyCardProps {
  icon: React.ReactNode;
  title: string;
  id: string;
}

const getIconForCategory = (title: string): React.ReactNode => {
  const lowerTitle = title.toLowerCase();
  
  const iconMap: { [key: string]: React.ReactNode } = {
    'apartment': <Building2 size={32} />,
    'villa': <Castle size={32} />,
    'home': <Home size={32} />,
    'office': <Building size={32} />,
    'building': <Hotel size={32} />,
    'townhouse': <Home size={32} />,
    'shop': <Store size={32} />,
    'garage': <Store size={32} />,
    'warehouse': <Warehouse size={32} />
  };

  return iconMap[lowerTitle] || <Building2 size={32} />;
};

const PropertyCard = ({ icon, title, id }: PropertyCardProps) => (
  <Link href={`/search?categoryId=${id}`} className="bg-emerald-50 p-4 rounded-md hover:text-white">
    <div className="bg-white hover:bg-emerald-500 text-emerald-500 hover:text-white p-4 rounded-md shadow-sm border border-emerald-400 border-dashed hover:shadow-md hover:border-emerald-500 transition-shadow duration-300">
      <div className="flex flex-col items-center space-y-2">
        <div className="p-4 rounded-full border border-dashed border-emerald-500 mb-4">
          <div className="w-12 h-12 flex items-center justify-center ">
            {icon}
          </div>
        </div>
        <h3 className="text-md font-normal text-slate-800 ">{title}</h3>
      </div>
    </div>
  </Link>
);

const PropertyTypes = ({ categories }: { categories: Category[] }) => {
  return (
    <div className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Property Types</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover different types of properties available in our extensive real estate collection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0,8).map((category) => (
            <PropertyCard
              key={category.id}
              id={category.id}
              icon={getIconForCategory(category.title)}
              title={category.title}
              // slug={category.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyTypes;