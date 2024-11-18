"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { Category, SubCategory } from "@prisma/client";
import generateSlug from "@/utils/generateSlug";
import { createSubCategory, updateSubCategory, createManySubCategories } from "@/actions/subCategories";

export type SubCategoryFormProps = {
  title: string;
  slug: string;
  categoryId: string;
};

export default function SubCategoryForm({
  title,
  initialData,
  categories,
}: {
  title: string;
  initialData?: SubCategory;
  categories: Category[];
}) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const defaultCategoryId = searchParams.get("categoryId") || "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubCategoryFormProps>({
    defaultValues: {
      title: initialData?.title || "",
      categoryId: initialData?.categoryId || defaultCategoryId,
    },
  });

  const router = useRouter();
  const selectedCategoryId = watch("categoryId");

  async function onSubmit(data: SubCategoryFormProps) {
    setIsLoading(true);
    try {
      const slug = generateSlug(data.title);
      data.slug = slug;

      if (editingId) {
        await updateSubCategory(editingId, data);
        toast.success("Subcategory Updated Successfully");
      } else {
        await createSubCategory(data);
        toast.success("Subcategory Created Successfully");
      }
      reset();
      router.push(`/dashboard/subcategories?categoryId=${data.categoryId}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateMany() {
    if (!selectedCategoryId) {
      toast.error("Please select a category first");
      return;
    }
    setIsLoading(true);
    try {
      await createManySubCategories(selectedCategoryId);
      toast.success("Subcategories Created Successfully");
      router.push(`/dashboard/subcategories?categoryId=${selectedCategoryId}`);
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
            <Link href={`/dashboard/subcategories${selectedCategoryId ? `?categoryId=${selectedCategoryId}` : ''}`}>
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Select Category
            </label>
            <Select
              value={selectedCategoryId}
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

          <TextInput
            label="Subcategory Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter subcategory title"
            // rules={{
            //   required: "Subcategory title is required",
            //   minLength: {
            //     value: 3,
            //     message: "Subcategory title must be at least 3 characters",
            //   },
            // }}
          />
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button type="button" asChild variant="outline">
            <Link href={`/dashboard/subcategories${selectedCategoryId ? `?categoryId=${selectedCategoryId}` : ''}`}>
              Cancel
            </Link>
          </Button>

          <SubmitButton
            title={editingId ? "Update Subcategory" : "Create Subcategory"}
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