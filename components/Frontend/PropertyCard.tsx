import React from 'react';
import { MapPin, Bath, BedDouble, Home } from 'lucide-react';
import { Property } from '@/types/types';
import Link from 'next/link';
import Image from 'next/image';

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const formatPrice = () => {
    if (property.listingType === "RENT" && property.rentPrice) {
      return (
        <div className="flex items-baseline gap-1">
          <span>${property.rentPrice.toLocaleString()}</span>
          <span className="text-sm text-gray-600 font-normal">/ month</span>
        </div>
      );
    }
    return <span>${property.salePrice?.toLocaleString()}</span>;
  };

  return (
    <Link href={`/properties/${property.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* Image Container */}
        <div className="relative">
          <Image 
          height={500}
          width={500}
            src={property.imageUrl} 
            alt={property.title}
            className="w-full h-[250px] object-cover"
          />
          <span className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-md">
            {property.listingType}
          </span>
          <span className="absolute bottom-4 left-4 bg-white text-emerald-500 px-3 py-1 rounded-md">
            {property.category?.title}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-emerald-500 text-xl font-semibold mb-2">
            {formatPrice()}
          </div>
          
          <h3 className="text-navy-900 text-xl font-bold mb-2">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            {property.address}
          </div>

          {/* Property Features */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center text-gray-600">
              <Home className="w-4 h-4 mr-2 text-emerald-500" />
              {property.size} Sqm
            </div>
            <div className="flex items-center text-gray-600">
              <BedDouble className="w-4 h-4 mr-2 text-emerald-500" />
              {property.beds} Bed
            </div>
            <div className="flex items-center text-gray-600">
              <Bath className="w-4 h-4 mr-2 text-emerald-500" />
              {property.baths} Bath
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;