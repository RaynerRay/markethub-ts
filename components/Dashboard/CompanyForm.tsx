"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { Button } from "../ui/button";
import generateSlug from "@/utils/generateSlug";
import { CompanyProps, createCompany, updateCompany } from "@/actions/companies";

export default function CompanyForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: CompanyProps;
}) {
  const editingId = initialData?.slug || "";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyProps>({
    defaultValues: {
      title: initialData?.title,
      imageUrl: initialData?.imageUrl,
      description: initialData?.description,
      email: initialData?.email,
      phone: initialData?.phone,
      phone2: initialData?.phone2,
      address: initialData?.address,
      address2: initialData?.address2,
      website: initialData?.website,
    },
  });

  const router = useRouter();

  async function onSubmit(data: CompanyProps) {
    setIsLoading(true);
    try {
      const slug = generateSlug(data.title);
      data.slug = slug;

      if (editingId) {
        await updateCompany(editingId, data);
        toast.success("Company Updated Successfully");
      } else {
        await createCompany(data);
        toast.success("Company Created Successfully");
      }
      reset();
      router.push("/dashboard/companies");
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
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/companies">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <TextInput
            label="Company Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter company title"
            // rules={{ required: "Company title is required" }}
          />
          <TextInput
            label="Image URL"
            register={register}
            name="imageUrl"
            errors={errors}
            placeholder="Enter image URL"
          />
          <TextInput
            label="Description"
            register={register}
            name="description"
            errors={errors}
            placeholder="Enter description"
          />
          <TextInput
            label="Email"
            register={register}
            name="email"
            errors={errors}
            placeholder="Enter email"
          />
          <TextInput
            label="Phone"
            register={register}
            name="phone"
            errors={errors}
            placeholder="Enter phone number"
          />
          <TextInput
            label="Secondary Phone"
            register={register}
            name="phone2"
            errors={errors}
            placeholder="Enter secondary phone number"
          />
          <TextInput
            label="Address"
            register={register}
            name="address"
            errors={errors}
            placeholder="Enter address"
          />
          <TextInput
            label="Secondary Address"
            register={register}
            name="address2"
            errors={errors}
            placeholder="Enter secondary address"
          />
          <TextInput
            label="Website"
            register={register}
            name="website"
            errors={errors}
            placeholder="Enter website URL"
          />
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/companies">Cancel</Link>
          </Button>
          <SubmitButton
            title={editingId ? "Update Company" : "Create Company"}
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
