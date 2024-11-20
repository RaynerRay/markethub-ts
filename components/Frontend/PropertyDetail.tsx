"use client";
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Bath,
  Square,
  Bed,
  Heart,
  Calendar,
  Building2,
  LocateFixedIcon,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/types";
import Image from "next/image";
import {
  checkIsFavourite,
  addToFavourites,
  removeFromFavourites,
} from "@/actions/favourites";
import toast from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import DOMPurify from "dompurify"; 
import Link from "next/link";
import BondCalculator from "./BondCalculator";

interface PropertyDetailProps {
  property: Property | null;
  similarProperties: Property[] | null;
  userId: string | null | undefined;  // Updated to allow undefined
  text?: string;  // Made optiona
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  similarProperties = [],
  userId,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    async function fetchFavouriteStatus() {
      if (!userId || !property?.id) return;
      
      try {
        const { data } = await checkIsFavourite(userId, property.id);
        setIsFavourite(data);
      } catch (error) {
        console.error("Error checking favourite status:", error);
        toast.error("Error checking favourite status");
      }
    }

    fetchFavouriteStatus();
  }, [userId, property?.id]);

  async function handleAddToFavourites() {
    if (!userId) {
      toast.error("Please log in to add favorites");
      return;
    }

    if (!property?.id) {
      toast.error("Invalid property");
      return;
    }

    try {
      const { status } = await addToFavourites({
        userId: userId,
        propertyId: property.id,
      });
      
      if (status === 200) {
        setIsFavourite(true);
        toast.success("Property added to favorites");
      } else {
        toast.error("Error adding to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Error adding to favorites");
    }
  }

  async function handleRemoveFromFavourites() {
    if (!userId) {
      toast.error("Please log in to manage favorites");
      return;
    }

    if (!property?.id) {
      toast.error("Invalid property");
      return;
    }

    try {
      const { status } = await removeFromFavourites(userId, property.id);
      
      if (status === 200) {
        setIsFavourite(false);
        toast.success("Property removed from favorites");
      } else {
        toast.error("Error removing from favorites");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast.error("Error removing from favorites");
    }
  }

  const renderPrice = () => {
    if (!property) return "N/A";
    if (property.listingType === "RENT" && property.rentPrice) {
      return `$${property.rentPrice.toLocaleString()} per month`;
    }
    return property.salePrice
      ? `$${property.salePrice.toLocaleString()}`
      : "Price on request";
  };

  const [expanded, setExpanded] = useState(false);

  const sanitizedDescription = property?.description
    ? DOMPurify.sanitize(property.description)
    : "Description not available";



  return (
    <section className="py-12 md:py-10 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {(property?.propertyImages || []).map((image, index) => (
                <Zoom key={index}>
                  <Image
                    src={image}
                    alt={property?.title || "Property"}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                  />
                </Zoom>
              ))}
            </Carousel>

            <div className="mt-8 space-y-6">
              <div className="flex justify-between">
                <p className="text-xl font-semibold text-emerald-500">
                  {renderPrice()}
                </p>
                {isFavourite ? (
                  <button onClick={handleRemoveFromFavourites}>
                    <Heart className="text-red-500 fill-current" />
                  </button>
                ) : (
                  <button onClick={handleAddToFavourites}>
                    <Heart className="text-red-500" />
                  </button>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">
                {property?.title || "Property"}
              </h1>
              <p className="flex items-center text-lg text-slate-600 mt-3">
                <MapPin className="mr-2 text-emerald-500" size={20} />
                {property?.address || "Address not available"}
              </p>

              <div className="flex flex-wrap gap-6 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Bed className="mr-2 text-emerald-500" size={20} />
                  <span className="text-slate-700">
                    {property?.beds || "N/A"} Beds
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="mr-2 text-emerald-500" size={20} />
                  <span className="text-slate-700">
                    {property?.baths || "N/A"} Baths
                  </span>
                </div>
                <div className="flex items-center">
                  <Square className="mr-2 text-emerald-500" size={20} />
                  <span className="text-slate-700">
                    {property?.size || "N/A"} sqm
                  </span>
                </div>
              </div>

             <div
        className={`text-slate-600 text-lg leading-relaxed bg-white border-2 border-gray-100 rounded-lg p-4 overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-full" : "max-h-[240px]"
        }`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedDescription,
          }}
        />
      </div>
      {property?.description && property.description.length > 4 && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 text-emerald-500 hover:underline focus:outline-none flex max-w-2xl mx-auto"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}

              <div className="text-slate-600 text-lg leading-relaxed bg-white border-2 border-gray-100 ronded-lg p-4 flex justify-between">
                {/* left side */}
                <div className="">
                  <div className="flex items-center">
                    <Bed className="mr-2 text-emerald-500" size={20} />
                    <span className="text-gray-600 text-xs m-2">
                      Bedrooms:{" "}
                      <span className="font-bold mx-2">{property?.beds} </span>{" "}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="mr-2 text-emerald-500" size={20} />
                    <span className="text-gray-600 text-xs m-2">
                      Bathrooms:{" "}
                      <span className="font-bold mx-2">{property?.baths} </span>{" "}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square className="mr-2 text-emerald-500" size={20} />
                    <span className="text-gray-600 text-xs m-2">
                      Property Size:{" "}
                      <span className="font-bold mx-2">{property?.size} </span>{" "}
                    </span>
                  </div>
                </div>

                {/* right side */}
                <div className="">
                  <div className="flex items-center">
                    <Building2 className="mr-2 text-emerald-500" size={20} />
                    <span className="text-gray-600 text-xs m-2">
                      Listed By:{" "}
                      <span className="font-bold mx-2">
                        {property?.company?.title}{" "}
                      </span>{" "}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-emerald-500" size={20} />
                    <span className="text-gray-600 text-xs m-2">
                      Listing Date:{" "}
                      <span className="font-bold mx-2">
                        {property?.createdAt?.toDateString()}{" "}
                      </span>{" "}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <LocateFixedIcon
                      className="mr-2 text-emerald-500"
                      size={20}
                    />
                    <span className="text-gray-600 text-xs m-2">
                      Town:{" "}
                      <span className="font-bold mx-2">
                        {property?.town?.title}{" "}
                      </span>{" "}
                    </span>
                  </div>
                </div>
              </div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-8 text-slate-800 text-center">
                    ✨ Property Features ✨
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-r from-gray-50 to-gray-50 p-6 rounded-lg shadow-lg">
                    {(property?.tags || []).map((tag, i) => (
                      <p
                        key={`${tag}-${i}`}
                        className="flex items-center gap-3 p-3 bg-white text-gray-700 font-medium text-lg rounded-full shadow hover:shadow-lg hover:bg-slate-300 transition duration-200 ease-in-out"
                      >
                        <Check className="text-emerald-500" />
                        {tag}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <BondCalculator />
          </div>

          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-6 ">
                {property?.company ? (
                  <>
                    <div className="flex items-center space-x-4 mb-6 ">
                      <Image
                        src={
                          property.company.imageUrl
                            ? property.company.imageUrl
                            : "/placeholder.jpg"
                        }
                        alt={`${property.company.title} logo`}
                        className="w-16 h-16 object-cover rounded-full mr-4"
                        width={60}
                        height={60}
                      />
                      <div>
                        <Link
                          href={`/companies/${property.company.slug}`}
                          className="text-xl font-semibold text-slate-800"
                        >
                          {property.company.title}
                        </Link>
                        <p className="text-gray-500">Listing company</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {/* <h3>Listing Company</h3> */}
                      <button className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                        Contact  {property.company.phone}
                      </button>
                      <button className="w-full border border-emerald-500 text-emerald-500 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
                        Email: {property.company.email}
                      </button>
                    </div>  
                   
                   <div className="h-1 bg-gray-100 mt-4"></div>
                  {/* Agent Profile */}
                
                    <div className="flex items-center space-x-4 my-6">
                    
                      <Image
                        src={
                          property.agent?.profileImage
                            ? property.agent.profileImage
                            : "/placeholder.jpg"
                        }
                        alt={`${property.agent?.firstName} logo`}
                        className="w-16 h-16 object-cover rounded-full mr-4"
                        width={60}
                        height={60}
                      />
                      <div>
                        <Link
                          href={`/companies/${property.company.slug}`}
                          className="text-xl font-semibold text-slate-800"
                        >
                          {property.agent?.firstName} {" "}{property.agent?.lastName}
                        
                        </Link>
                        <p className="text-gray-500">Listing Agent</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <button className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                        Contact Agent {property.agent?.phone}
                      </button>
                      <button className="w-full border border-emerald-500 text-emerald-500 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
                        Email: {property.agent?.email}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800 py-4">
                      Get more info about this property
                    </h3>
                    <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300 w-full">
                      <Link
                        target="_blank"
                        href="https://wa.me/0772340505?text=Hi,%20I%20want%20to%20more%20info%20on%20this%20property"
                        className="flex justify-center items-center"
                      >
                        WhatsApp Us
                      </Link>
                    </button>
                    <p className="text-xs font-light py-4">
                      By continuing I understand and agree with our Terms &
                      Conditions and Privacy Policy.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Similar Properties
              </h2>
              <div className="space-y-4">
                {similarProperties && similarProperties.length > 0 ? (
                  similarProperties.map((similarProperty) => (
                    <PropertyCard
                      key={similarProperty.id}
                      property={similarProperty}
                    />
                  ))
                ) : (
                  <p>No similar properties available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetail;
