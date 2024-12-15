"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { Button } from "../ui/button";
import { City } from "@prisma/client";
import generateSlug from "@/utils/generateSlug";
import { createCity, createManyCities, updateCity } from "@/actions/cities";

export type CityProps = {
  title: string;
  slug: string;
};

export default function CityForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: City;
}) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CityProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });

  const router = useRouter();

  async function onSubmit(data: CityProps) {
    setIsLoading(true);
    try {
      const slug = generateSlug(data.title);
      data.slug = slug;

      if (editingId) {
        await updateCity(editingId, data);
        toast.success("City Updated Successfully");
      } else {
        await createCity(data);
        toast.success("City Created Successfully");
      }
      reset();
      router.push("/dashboard/cities");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateMany() {
    setIsLoading(true);
    try {
      await createManyCities();
      toast.success("Cities Created Successfully");
      router.push("/dashboard/cities");
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
            <Link href="/dashboard/cities">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <TextInput
            label="City Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter city title"
            // rules={{
            //   required: "Category title is required",
            //   minLength: {
            //     value: 3,
            //     message: "Category title must be at least 3 characters",
            //   },
            // }}
          />
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/cities">Cancel</Link>
          </Button>

          <SubmitButton
            title={editingId ? "Update City" : "Create City"}
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