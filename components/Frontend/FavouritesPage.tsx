// components/Frontend/FavouritesPage.tsx
import React from 'react';
import PropertyCard from './PropertyCard';
import { Favourite, Property } from '@/types/types';

interface FavouritesPageProps {
  favourites: Favourite[];
}

const FavouritesPage: React.FC<FavouritesPageProps> = ({ favourites }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-normal mb-6 py-10">Your Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {favourites.map((favourite) => (
          <PropertyCard key={favourite.property.id} property={favourite.property} />
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;