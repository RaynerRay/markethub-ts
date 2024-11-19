"use client";

import { useForm } from "react-hook-form";
import { useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City, Town } from "@prisma/client";
import generateSlug from "@/utils/generateSlug";
import { createTown, updateTown, createManyTowns } from "@/actions/towns";

export type TownFormProps = {
  title: string;
  slug: string;
  cityId: string;
};

export default function TownForm({
  title,
  initialData,
  cities,
}: {
  title: string;
  initialData?: Town;
  cities: City[];
}) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const defaultCityId = searchParams.get("cityId") || "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TownFormProps>({
    defaultValues: {
      title: initialData?.title || "",
      cityId: initialData?.cityId || defaultCityId,
    },
  });

  const router = useRouter();
  const selectedCityId = watch("cityId");

  async function onSubmit(data: TownFormProps) {
    setIsLoading(true);
    try {
      const slug = generateSlug(data.title);
      data.slug = slug;

      if (editingId) {
        await updateTown(editingId, data);
        toast.success("Town Updated Successfully");
      } else {
        await createTown(data);
        toast.success("Town Created Successfully");
      }
      reset();
      router.push(`/dashboard/towns?cityId=${data.cityId}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateMany() {
    if (!selectedCityId) {
      toast.error("Please select a city first");
      return;
    }
    setIsLoading(true);
    try {
      await createManyTowns(selectedCityId);
      toast.success("Towns Created Successfully");
      router.push(`/dashboard/towns?cityId=${selectedCityId}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
          {/* Uncomment if you want to add bulk creation */}
          <Button type="button" onClick={handleCreateMany}>
            {isLoading ? "Creating..." : "Create Many"}
          </Button>
          
          <Button type="button" asChild variant="outline">
            <Link href={`/dashboard/towns${selectedCityId ? `?cityId=${selectedCityId}` : ''}`}>
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="cityId" className="text-sm font-medium">
              Select City
            </label>
            <Select
              value={selectedCityId}
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

          <TextInput
            label="Town Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter town title"
            // rules={{
            //   required: "Town title is required",
            //   minLength: {
            //     value: 3,
            //     message: "Town title must be at least 3 characters",
            //   },
            // }}
          />
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button type="button" asChild variant="outline">
            <Link href={`/dashboard/towns${selectedCityId ? `?cityId=${selectedCityId}` : ''}`}>
              Cancel
            </Link>
          </Button>

          <SubmitButton
            title={editingId ? "Update Town" : "Create Town"}
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