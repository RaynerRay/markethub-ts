import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCategories } from '@/actions/categories';
import { getSubCategories } from '@/actions/subCategories';
import { getCities } from '@/actions/cities';
import { getAllTowns } from '@/actions/towns';
import SearchFilter from './SearchFilter';
import Image from 'next/image';

const Hero = async () => {
  const [categoriesRes, subcategoriesRes, citiesRes, townsRes] = 
    await Promise.all([
      getCategories(),
      getSubCategories(),
      getCities(),
      getAllTowns(),
    ]);

  const categories = categoriesRes.data || [];
  const subcategories = subcategoriesRes.data || [];
  const cities = citiesRes.data || [];
  const towns = townsRes.data || [];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto py-8 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center order-2 md:order-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-navy-900">Find A </span>
              <span className="text-emerald-500">Perfect Home</span>
              <span className="text-navy-900 block md:inline"> To Live With Your Family</span>
            </h1>
            <p className="text-gray-600 mt-4 md:mt-6 mb-6 md:mb-8 text-sm sm:text-base">
            Discover a wide range of properties across Zimbabwe. Our platform simplifies your home search, connecting you with verified listings and reliable agents.
            </p>
            {/* <button className="bg-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md w-fit mx-auto md:mx-0 hover:bg-emerald-600 transition-colors">
              Get Started
            </button> */}
          </div>

          {/* Right Image */}
          <div className="order-2 md:order-2 h-[300px] sm:h-[400px] md:h-[500px] ">
            <Image
            height={500}
            width={500} 
              src="/house1.jpg"
              alt="Modern house with pool" 
              className="rounded-lg  w-full h-full"
            />
            {/* <div className="absolute inset-y-0 -left-3 flex flex-col items-center justify-center gap-2">
              <button className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors">
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors">
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div> */}
          </div>
          
        </div>
      
     {/* Search Section */}
      <SearchFilter subcategories={subcategories} categories={categories} cities={cities} towns={towns}/>
   
     
    
      </div>
    
    </div>
  );
};

export default Hero;