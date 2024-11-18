"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextInput from "../FormInputs/TextInput";
import ImageInput from "../FormInputs/ImageInput";
import SubmitButton from "../FormInputs/SubmitButton";
import {
  PropertyProps,
  createProperty,
  updateProperty,
} from "@/actions/properties";
import generateSlug from "@/utils/generateSlug";
import { ListingType } from "@prisma/client";
import { TextAreaInput } from "../FormInputs/TextAreaInput";
import MultipleImageInput from "../FormInputs/MultipleImageInput";
import { generateUniqueCode } from "@/lib/generateUniqueCode";
import { Checkbox } from "@/components/ui/checkbox";
import TagsInput from "../FormInputs/TagsInput";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

interface PropertyFormProps {
  title: string;
  userId: string;
  initialData?: {
    id: string;
    title: string;
    slug: string;
    imageUrl?: string;
    propertyImages?: string[];
    description?: string;
    propertyCode?: string;
    contact?: string;
    listingType: ListingType;
    rentPrice?: number;
    salePrice?: number;
    size?: number;
    beds?: number;
    baths?: number;
    tags?: string[];
    address?: string;
    latitude?: number;
    longitude?: number;
    cityId: string;
    townId: string;
    categoryId: string;
    companyId: string;
    agentProfileId: string;
    subCategoryId: string;
  } | null;
  categories: { id: string; title: string }[];
  cities: { id: string; title: string }[];
  towns: { id: string; title: string }[];
  companies: { id: string; title: string }[];
  agents: { id: string; firstName: string; lastName: string }[];
  subCategories: { id: string; title: string }[];
}
export type PropertyFormData = {
  title: string;
  slug?: string;
  imageUrl?: string;
  propertyImages?: string[];
  description?: string;
  propertyCode?: string;
  contact?: string;
  listingType: ListingType;
  rentPrice?: number;
  salePrice?: number;
  size?: number;
  beds?: number;
  baths?: number;
  tags?: string[];
  address?: string;
  latitude?: number;
  longitude?: number;
  cityId: string;
  townId: string;
  categoryId: string;
  companyId: string;
  agentProfileId: string;
  subCategoryId: string;
  userId: string; // Add this field
};

// export type PropertyFormData = Omit<PropertyProps, 'userId'>;

export default function PropertyForm({
  title,
  userId,
  initialData,
  categories,
  cities,
  towns,
  companies,
  agents,
  subCategories,
}: PropertyFormProps) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);
  const initialImageUrl = initialData?.imageUrl || "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [propertyImages, setPropertyImages] = useState<string[]>(
    initialData?.propertyImages || []
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      propertyCode: initialData?.propertyCode || "",
      contact: initialData?.contact || "",
      listingType: initialData?.listingType || ListingType.RENT,
      rentPrice: initialData?.rentPrice || undefined,
      salePrice: initialData?.salePrice || undefined,
      size: initialData?.size || undefined,
      beds: initialData?.beds || undefined,
      baths: initialData?.baths || undefined,
      tags: initialData?.tags || [],
      address: initialData?.address || "",
      latitude: initialData?.latitude || undefined,
      longitude: initialData?.longitude || undefined,
      cityId: initialData?.cityId || "",
      townId: initialData?.townId || "",
      categoryId: initialData?.categoryId || "",
      companyId: initialData?.companyId || "",
      agentProfileId: initialData?.agentProfileId || "",
      subCategoryId: initialData?.subCategoryId || "",
    },
  });

  const router = useRouter();
  const selectedListingType = watch("listingType");

  async function onSubmit(data: PropertyFormData) {
    setIsLoading(true);
    try {
      if (!imageUrl) {
        toast.error("Please upload a main image");
        setIsLoading(false);
        return;
      }

      if (!userId) {
        toast.error("User ID is required");
        setIsLoading(false);
        return;
      }

      const slug = generateSlug(data.title);
      const propertyCode = generateUniqueCode(data.title);

      // Convert string values to numbers and handle the userId
      const propertyData = {
        ...data,
        slug,
        propertyCode,
        imageUrl,
        propertyImages,
        userId, // Add the userId from props
        // Convert numeric fields
        rentPrice: data.rentPrice ? Number(data.rentPrice) : undefined,
        salePrice: data.salePrice ? Number(data.salePrice) : undefined,
        size: data.size ? Number(data.size) : undefined,
        beds: data.beds ? Number(data.beds) : undefined,
        baths: data.baths ? Number(data.baths) : undefined,
        latitude: data.latitude ? Number(data.latitude) : undefined,
        longitude: data.longitude ? Number(data.longitude) : undefined,
        // Ensure all required fields are included
        listingType: data.listingType || ListingType.RENT,
        cityId: data.cityId,
        townId: data.townId,
        categoryId: data.categoryId,
        companyId: data.companyId,
        agentProfileId: data.agentProfileId,
        subCategoryId: data.subCategoryId,
      };

      const response = await createProperty(propertyData);

      if (response.error) {
        if (response.error.code === "VALIDATION_ERROR") {
          toast.error("Please check all required fields");
          console.error("Validation errors:", response.error.details);
          return;
        }
        throw new Error(response.error.message || "Failed to create property");
      }

      if (response.data) {
        toast.success("Property Created Successfully");
        reset();
        router.push("/dashboard/properties");
        router.refresh();
      }
    } catch (error) {
      console.error("Property creation error:", error);
      toast.error("Failed to create property. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageUpload = (url: string) => {
    setPropertyImages((prev) => [...prev, url]);
  };

  const removeImage = (index: number) => {
    setPropertyImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-4xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/properties">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <TextInput
              label="Property Title"
              register={register}
              name="title"
              errors={errors}
              placeholder="Enter property title"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <label htmlFor="cityId" className="text-sm font-medium">
                Select City
              </label>
              <Select
                value={watch("cityId")}
                onValueChange={(value) => setValue("cityId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="townId" className="text-sm font-medium">
                Select Town
              </label>
              <Select
                value={watch("townId")}
                onValueChange={(value) => setValue("townId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a town" />
                </SelectTrigger>
                <SelectContent>
                  {towns.map((town) => (
                    <SelectItem key={town.id} value={town.id}>
                      {town.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="companyId" className="text-sm font-medium">
                Select Company
              </label>
              <Select
                value={watch("companyId")}
                onValueChange={(value) => setValue("companyId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* agent */}
              <label htmlFor="agentProfileId" className="text-sm font-medium">
                Select Agent
              </label>
              <Select
                value={watch("agentProfileId")}
                onValueChange={(value) => setValue("agentProfileId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an Agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.firstName} {" "} {agent.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          // {/* Categories */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <label htmlFor="categoryId" className="text-sm font-medium">
                Select Category
              </label>
              <Select
                value={watch("categoryId")}
                onValueChange={(value) => setValue("categoryId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="subCategoryId" className="text-sm font-medium">
                Select Sub Category
              </label>
              <Select
                value={watch("subCategoryId")}
                onValueChange={(value) => setValue("subCategoryId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sub category" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((subCategory) => (
                    <SelectItem key={subCategory.id} value={subCategory.id}>
                      {subCategory.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Listing Type and Prices */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <label htmlFor="listingType" className="text-sm font-medium">
                Listing Type
              </label>
              <Select
                value={selectedListingType}
                onValueChange={(value: ListingType) =>
                  setValue("listingType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select listing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ListingType.RENT}>For Rent</SelectItem>
                  <SelectItem value={ListingType.SALE}>For Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedListingType === ListingType.RENT && (
              <TextInput
                label="Rent Price"
                register={register}
                name="rentPrice"
                type="number"
                errors={errors}
                placeholder="Enter rent price"
              />
            )}

            {selectedListingType === ListingType.SALE && (
              <TextInput
                label="Sale Price"
                register={register}
                name="salePrice"
                type="number"
                errors={errors}
                placeholder="Enter sale price"
              />
            )}
          </div>
          {/* Property Details */}
          <div className="grid grid-cols-2 gap-6">
            <TextInput
              label="Size (sq ft)"
              register={register}
              name="size"
              type="number"
              errors={errors}
              placeholder="Enter size"
              className="col-span-full"
            />

            <TextInput
              label="Bedrooms"
              register={register}
              name="beds"
              type="number"
              errors={errors}
              placeholder="Number of bedrooms"
            />

            <TextInput
              label="Bathrooms"
              register={register}
              name="baths"
              type="number"
              errors={errors}
              placeholder="Number of bathrooms"
            />
          </div>
          // {/* Location Details */}
          <div className="grid md:grid-cols-3 gap-6">
            <TextInput
              label="Address"
              register={register}
              name="address"
              errors={errors}
              placeholder="Enter address"
            />

            <TextInput
              label="Latitude"
              register={register}
              name="latitude"
              type="number"
              // step="any"
              errors={errors}
              placeholder="Enter latitude"
            />

            <TextInput
              label="Longitude"
              register={register}
              name="longitude"
              type="number"
              // step="any"
              errors={errors}
              placeholder="Enter longitude"
            />
          </div>
          {/* Description and Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 mb-8">
              <label className="text-sm font-medium">Description</label>
              <div className="">
                <ReactQuill
                  value={watch("description")}
                  onChange={(content) => setValue("description", content)}
                  modules={modules}
                  className="h-[250px] sm:w-[800px]"
                />
              </div>
            </div>
            //
            <TextInput
              label="Contact Information"
              register={register}
              name="contact"
              errors={errors}
              placeholder="Enter contact information"
            />
          </div>
          {/* Tags Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <TagsInput
              register={register}
              setValue={setValue}
              watch={watch}
              name="tags"
              placeholder="Enter tags for your property..."
            />
          </div>
          {/* Images Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <ImageInput
              label="Main Property Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="propertyImage"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Images</label>
              <div className="grid grid-cols-2 gap-2">
                {propertyImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <MultipleImageInput
                  label="Add Image"
                  imageUrls={propertyImages}
                  setImageUrls={setPropertyImages}
                  endpoint="multiplePropertyImages"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/properties">Cancel</Link>
          </Button>

          <SubmitButton
            title={editingId ? "Update Property" : "Create Property"}
            isLoading={isLoading}
            loadingTitle={
              editingId ? "Updating please wait..." : "Saving please wait..."
            }
          />
        </div>
      </form>
    </div>
  );
}
