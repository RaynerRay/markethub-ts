import React from 'react'
import { getServerSession } from 'next-auth';
import FavouritesPage from '../../../components/Frontend/FavouritesPage';
import { authOptions } from '@/lib/auth';
import { getUserFavourites } from '@/actions/favourites';

const page = async() => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className='max-w-7xl mx-auto'>
        <p className='font-normal text-center justify-center py-20 text-3xl'>You need to be logged in to view your favourites.</p>
      </div>
    );
  }

  const { data: favourites, status, error } = await getUserFavourites(session.user.id);

  if (status !== 200) {
    return (
      <div className='max-w-7xl mx-auto'>
        <p>Error fetching favourites: {error}</p>
      </div>
    );
  }

  return (
    <div  className='max-w-7xl mx-auto'>
       <FavouritesPage 
       favourites={favourites}
       />
    </div>
  )
}

export default page