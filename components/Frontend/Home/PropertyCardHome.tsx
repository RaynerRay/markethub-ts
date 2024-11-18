import React from 'react';
import { MapPin, Bath, BedDouble, Home } from 'lucide-react';
import Link from 'next/link';

interface PropertyCardProps {
  id: string;
  type: "RENT" | "SALE";
  category: string;
  price: number;
  title: string;
  address: string;
  sqft: number;
  beds: number;
  baths: number;
  image: string;
  slug: string;
}

const PropertyCard: React.FC<{ property: PropertyCardProps }> = ({ property }) => {
  const formatPrice = () => {
    const formattedPrice = property.price.toLocaleString();
    console.log(property)
    return (
      <div className="flex items-baseline gap-1">
        <span>${formattedPrice}</span>
        {property.type === "RENT" && (
          <span className="text-sm text-gray-600 font-normal">/ month</span>
        )}
      </div>
    );
  };

  return (
    <Link href={`/properties/${property.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* Image Container */}
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[250px] object-cover"
          />
          <span className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-md">
            {property.type}
          </span>
          <span className="absolute bottom-4 left-4 bg-white text-emerald-500 px-3 py-1 rounded-md">
            {property.category}
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
              {property.sqft} Sqm
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