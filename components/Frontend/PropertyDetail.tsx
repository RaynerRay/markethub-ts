"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
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
  userId: string | null | undefined;
  text?: string;
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
  const [expanded, setExpanded] = useState(false);
  const [sanitizedDescription, setSanitizedDescription] = useState<string>("");

  // Effect to sanitize description
  useEffect(() => {
    if (property?.description) {
      setSanitizedDescription(DOMPurify.sanitize(property.description));
    }
  }, [property?.description]);

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

  const handleAddToFavourites = async () => {
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
  };

  const handleRemoveFromFavourites = async () => {
    if (!userId || !property?.id) {
      toast.error("Please log in to manage favorites");
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
  };

  const renderPrice = () => {
    if (!property) return "N/A";
    if (property.listingType === "RENT" && property.rentPrice) {
      return `$${property.rentPrice.toLocaleString()} per month`;
    }
    return property.salePrice
      ? `$${property.salePrice.toLocaleString()}`
      : "Price on request";
  };

  // const sanitizedDescription = property?.description
  //   ? DOMPurify.sanitize(property.description)
  //   : "Description not available";

  // SEO metadata
  const propertyTitle = property?.title || "Property Listing";
  const propertyDescription = property?.description?.slice(0, 155) || "Discover this amazing property listing";
  const propertyAddress = property?.address || "";
  const propertyType = property?.listingType || "SALE";
  const propertyPrice = renderPrice();

  return (
    <>
      <Head>
        <title>{`${propertyTitle} | ${propertyPrice} | ${propertyAddress}`}</title>
        <meta name="description" content={propertyDescription} />
        <meta property="og:title" content={propertyTitle} />
        <meta property="og:description" content={propertyDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={property?.propertyImages?.[0] || ""} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content={`${property?.tags?.join(", ")}, property, real estate, ${propertyType.toLowerCase()}, ${propertyAddress}`} />
        <link rel="canonical" href={`/properties/${property?.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": propertyTitle,
            "description": propertyDescription,
            "price": propertyPrice,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": propertyAddress
            },
            "numberOfRooms": property?.beds,
            "numberOfBathrooms": property?.baths,
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": property?.size,
              "unitText": "SQUAREMETER"
            }
          })}
        </script>
      </Head>

      <section className="py-12 md:py-10 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main content wrapper */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column */}
            <div className="lg:w-2/3">
              {/* Image carousel */}
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
                      alt={`${propertyTitle} - Image ${index + 1}`}
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover"
                      priority={index === 0}
                    />
                  </Zoom>
                ))}
              </Carousel>

              {/* Property details */}
              <div className="mt-8 space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold text-emerald-500">
                    {renderPrice()}
                  </p>
                  <button 
                    onClick={isFavourite ? handleRemoveFromFavourites : handleAddToFavourites}
                    aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`text-red-500 ${isFavourite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">
                  {propertyTitle}
                </h1>

                <p className="flex items-center text-lg text-slate-600 mt-3">
                  <MapPin className="mr-2 text-emerald-500" size={20} />
                  {propertyAddress}
                </p>

                {/* Property specs */}
                <div className="flex flex-wrap gap-6 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <Bed className="mr-2 text-emerald-500" size={20} />
                    <span className="text-slate-700">{property?.beds || "N/A"} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="mr-2 text-emerald-500" size={20} />
                    <span className="text-slate-700">{property?.baths || "N/A"} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="mr-2 text-emerald-500" size={20} />
                    <span className="text-slate-700">{property?.size || "N/A"} sqm</span>
                  </div>
                </div>

              

                {/* Description */}
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
              {property?.description && property.description.length > 240 && (
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-1 text-emerald-500 hover:underline focus:outline-none"
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
              )}

                {/* Property details grid */}
                <PropertyDetailsGrid property={property} />

                {/* Features */}
                <PropertyFeatures property={property} />

                  {/* Mobile-only contact section */}
                  <div className="lg:hidden">
                  <ContactSection property={property} />
                </div>

                {/* Bond Calculator - Hidden on mobile until after contact section */}
                <div className="hidden lg:block">
                  <BondCalculator />
                </div>
              </div>
            </div>

            {/* Right column - Hidden on mobile */}
            <div className="hidden lg:block lg:w-1/3">
              <ContactSection property={property} />
              <SimilarProperties properties={similarProperties} />
            </div>
          </div>

          {/* Mobile-only sections */}
          <div className="lg:hidden mt-8">
            <BondCalculator />
            <div className="mt-8">
              <SimilarProperties properties={similarProperties} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Extracted components for better organization
const ContactSection = ({ property }: { property: Property | null }) => (
  <Card>
    <CardContent className="p-6">
      {property?.company ? (
        <>
          <CompanyInfo company={property.company} />
          <div className="h-1 bg-gray-100 mt-4"></div>
          <AgentInfo agent={property.agent} />
        </>
      ) : (
        <DefaultContactInfo />
      )}
    </CardContent>
  </Card>
);

const CompanyInfo = ({ company }: { company: any }) => (// eslint-disable-line @typescript-eslint/no-explicit-any
  <>
    <div className="flex items-center space-x-4 mb-6">
      <Image
        src={company.imageUrl || "/placeholder.jpg"}
        alt={`${company.title} logo`}
        className="w-16 h-16 object-cover rounded-full"
        width={60}
        height={60}
      />
      <div>
        <Link
          href={`/companies/${company.slug}`}
          className="text-xl font-semibold text-slate-800 hover:text-emerald-500"
        >
          {company.title}
        </Link>
        <p className="text-gray-500">Listing company</p>
      </div>
    </div>
    <div className="space-y-4">
      <a 
        href={`tel:${company.phone}`}
        className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors flex justify-center items-center"
      >
        Contact {company.phone}
      </a>
      <a 
        href={`mailto:${company.email}`}
        className="w-full border border-emerald-500 text-emerald-500 py-3 rounded-lg hover:bg-emerald-50 transition-colors flex justify-center items-center"
      >
        Email: {company.email}
      </a>
    </div>
  </>
);

const AgentInfo = ({ agent }: { agent: any }) => (// eslint-disable-line @typescript-eslint/no-explicit-any
  <div className="mt-6">
    <div className="flex items-center space-x-4 mb-6">
      <Image
        src={agent?.profileImage || "/placeholder.jpg"}
        alt={`${agent?.firstName} ${agent?.lastName}`}
        className="w-16 h-16 object-cover rounded-full"
        width={60}
        height={60}
      />
      <div>
        <h3 className="text-xl font-semibold text-slate-800">
          {agent?.firstName} {agent?.lastName}
        </h3>
        <p className="text-gray-500">Listing Agent</p>
      </div>
    </div>
    <div className="space-y-4">
      <a 
        href={`tel:${agent?.phone}`}
        className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors flex justify-center items-center"
      >
        Contact Agent {agent?.phone}
      </a>
      <a 
        href={`mailto:${agent?.email}`}
        className="w-full border border-emerald-500 text-emerald-500 py-3 rounded-lg hover:bg-emerald-50 transition-colors flex justify-center items-center"
      >
        Email: {agent?.email}
      </a>
    </div>
  </div>
);

const DefaultContactInfo = () => (
  <>
    <h3 className="text-lg font-semibold text-gray-800 py-4">
      Get more info about this property
    </h3>
    <a
      href="https://wa.me/0772340505?text=Hi,%20I%20want%20to%20more%20info%20on%20this%20property"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300 w-full flex justify-center items-center"
    >
      WhatsApp Us
    </a>
    <p className="text-xs font-light py-4">
      By continuing I understand and agree with our Terms & Conditions and Privacy Policy.
    </p>
  </>
);

const PropertyDetailsGrid = ({ property }: { property: Property | null }) => (
  <div className="text-slate-600 text-lg leading-relaxed bg-white border-2 border-gray-100 rounded-lg p-4 flex flex-col md:flex-row justify-between">
    {/* Left column */}
    <div className="mb-4 md:mb-0">
      <div className="flex items-center mb-3">
        <Bed className="mr-2 text-emerald-500" size={20} />
        <span className="text-gray-600 text-sm">
          Bedrooms: <span className="font-bold ml-2">{property?.beds}</span>
        </span>
      </div>
      <div className="flex items-center mb-3">
        <Bath className="mr-2 text-emerald-500" size={20} />
        <span className="text-gray-600 text-sm">
          Bathrooms: <span className="font-bold ml-2">{property?.baths}</span>
        </span>
      </div>
      <div className="flex items-center">
        <Square className="mr-2 text-emerald-500" size={20} />
        <span className="text-gray-600 text-sm">
          Property Size: <span className="font-bold ml-2">{property?.size} sqm</span>
        </span>
      </div>
    </div>

    {/* Right column */}
    <div>
      <div className="flex items-center mb-3">
        <Building2 className="mr-2 text-emerald-500" size={20} />
        <span className="text-gray-600 text-sm">
          Listed By: <span className="font-bold ml-2">{property?.company?.title}</span>
        </span>
      </div>
      <div className="flex items-center mb-3">
        <Calendar className="mr-2 text-emerald-500" size={20} />
        <span className="text-gray-600 text-sm">
          Listing Date:{" "}
          <span className="font-bold ml-2">
            {property?.createdAt ? new Date().toISOString().slice(0, 10).replace(/-/g, '/') : "N/A"}
          </span>
        </span>
      </div>
      <div className="flex items-center">
        <LocateFixedIcon className="mr-2 text-emerald-500" size={20} />
        <span className="text-gray-600 text-sm">
          Town: <span className="font-bold ml-2">{property?.town?.title}</span>
        </span>
      </div>
    </div>
  </div>
);

const PropertyFeatures = ({ property }: { property: Property | null }) => (
  <Card>
    <CardContent className="p-6">
      <h2 className="text-xl font-bold mb-8 text-slate-800 text-center">
        ✨ Property Features ✨
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gradient-to-r from-gray-50 to-gray-50 p-6 rounded-lg shadow-lg">
        {(property?.tags || []).map((tag, i) => (
          <div
            key={`${tag}-${i}`}
            className="px-3 py-2 rounded-full text-sm bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-green-700 flex items-center gap-2 transition duration-200 ease-in-out hover:bg-green-100 dark:hover:bg-green-700"
          >
            <Check className="text-emerald-500 flex-shrink-0" size={16} />
            <span className="truncate">{tag}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SimilarProperties = ({ properties }: { properties: Property[] | null }) => (
  <div className="mt-10">
    <h2 className="text-2xl font-semibold text-slate-800 mb-6">
      Similar Properties
    </h2>
    <div className="space-y-4">
      {properties && properties.length > 0 ? (
        properties.map((similarProperty) => (
          <div key={similarProperty.id} className="transition-transform hover:scale-105">
            <PropertyCard property={similarProperty} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No similar properties available.</p>
      )}
    </div>
  </div>
);

// Schema Generator for SEO


export default PropertyDetail;