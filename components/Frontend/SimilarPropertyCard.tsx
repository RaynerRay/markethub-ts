// components/Frontend/PropertyCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@prisma/client";
import { MapPin, Bath, Square, Bed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

const SimilarPropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/properties/${property.slug}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-video relative overflow-hidden rounded-t-xl">
          <Image
            src={property.propertyImages[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-emerald-500">
              $ {property.rentPrice
                ? `${property.rentPrice.toLocaleString()} per month`
                : property.salePrice?.toLocaleString()}
            </p>
            <h3 className="text-xl font-bold text-slate-800 line-clamp-1">
              {property.title}
            </h3>
            <p className="flex items-center text-slate-600">
              <MapPin className="mr-2 text-emerald-500" size={16} />
              {property.address}
            </p>
            <div className="flex gap-4 text-slate-700">
              <span className="flex items-center">
                <Bed className="mr-1 text-emerald-500" size={16} />
                {property.beds}
              </span>
              <span className="flex items-center">
                <Bath className="mr-1 text-emerald-500" size={16} />
                {property.baths}
              </span>
              <span className="flex items-center">
                <Square className="mr-1 text-emerald-500" size={16} />
                {property.size} sqft
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SimilarPropertyCard;