"use client";

import { Check } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section className="flex flex-col space-y-12 mt-8 mb-10">
      {/* Main Intro Section */}
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Image with green corner design */}
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-0 w-full h-full -z-10 border-t-[60px] border-l-[60px] border-transparent border-t-green-500" />
          <Image
            src="/house1.jpg" // Replace with your actual image path
            alt="MarketHub"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            height={500}
            width={500}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome to MarketHub - Your Gateway to Zimbabwe&rsquo;s Finest Properties
          </h2>
          <p className="text-gray-600">
            Discover your dream home, investment opportunities, or rental options across Zimbabwe with MarketHub. Our platform connects you with trusted real estate listings and expert agents, making it easier to find the perfect property tailored to your needs.
          </p>
          
          {/* Bullet Points */}
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-gray-700">
              <Check className="text-green-500 w-5 h-5" />
              <span>Extensive listings of properties for rent, purchase, and investment</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <Check className="text-green-500 w-5 h-5" />
              <span>Detailed filters to find properties by location, price, size, and more</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <Check className="text-green-500 w-5 h-5" />
              <span>Connect directly with certified agents for a seamless experience</span>
            </li>
          </ul>

          {/* Button */}
          <button className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Why Choose MarketHub Section */}
      <div className="bg-slate-50 p-8 rounded-lg shadow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose MarketHub?</h3>
        <p className="text-gray-600 mb-4">
          MarketHub isn&rsquo;t just a listing site; it&rsquo;s a platform built to make real estate accessible, transparent, and efficient for everyone in Zimbabwe. Here&rsquo;s why MarketHub stands out:
        </p>
        <ul className="space-y-3">
          <li className="flex items-center space-x-2 text-gray-700">
            <Check className="text-green-500 w-5 h-5" />
            <span>Verified Listings: Every property is checked for accuracy and quality.</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <Check className="text-green-500 w-5 h-5" />
            <span>Direct Communication: Contact agents or property owners directly from the platform.</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <Check className="text-green-500 w-5 h-5" />
            <span>Local Expertise: Our team and partners know the Zimbabwean market intimately.</span>
          </li>
        </ul>
      </div>

      {/* How It Works Section */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h3>
        <p className="text-gray-600 mb-4">
          Getting started with MarketHub is simple. Here&rsquo;s how you can begin your property journey with us:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Browse our extensive catalog of properties by location, type, or amenities.</li>
          <li>Use our advanced filters to refine your search based on your preferences.</li>
          <li>Contact property agents or owners directly through our secure messaging feature.</li>
        </ol>
      </div>

      {/* Our Commitment Section */}
      <div className="bg-slate-50 p-8 rounded-lg shadow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h3>
        <p className="text-gray-600 mb-4">
          At MarketHub, we&rsquo;re committed to empowering our users with a reliable, transparent, and efficient real estate experience. We strive to:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center space-x-2">
            <Check className="text-green-500 w-5 h-5" />
            <span>Offer a seamless user experience across all devices</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="text-green-500 w-5 h-5" />
            <span>Continuously verify and update property information</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="text-green-500 w-5 h-5" />
            <span>Support sustainable and responsible property investments</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
