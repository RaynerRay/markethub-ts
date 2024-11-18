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
import { Category } from "@prisma/client";
import generateSlug from "@/utils/generateSlug";
import { createCategory, createManyCategories, updateCategory } from "@/actions/categories";

export type CategoryProps = {
  title: string;
  slug: string;
};

export default function CategoryForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Category;
}) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });

  const router = useRouter();

  async function onSubmit(data: CategoryProps) {
    setIsLoading(true);
    try {
      const slug = generateSlug(data.title);
      data.slug = slug;

      if (editingId) {
        await updateCategory(editingId, data);
        toast.success("Category Updated Successfully");
      } else {
        await createCategory(data);
        toast.success("Category Created Successfully");
      }
      reset();
      router.push("/dashboard/categories");
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
      await createManyCategories();
      toast.success("Categories Created Successfully");
      router.push("/dashboard/categories");
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
            <Link href="/dashboard/categories">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <TextInput
            label="Category Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter category title"
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
            <Link href="/dashboard/categories">Cancel</Link>
          </Button>

          <SubmitButton
            title={editingId ? "Update Category" : "Create Category"}
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