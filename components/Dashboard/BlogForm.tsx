"use client";

import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from "lucide-react";
import Link from "next/link";
import { toast } from 'sonner';
// import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextInput from "../FormInputs/TextInput";
import ImageInput from '../FormInputs/ImageInput';
import SubmitButton from "../FormInputs/SubmitButton";
import { createBlog, updateBlog } from '@/actions/blogs';
import generateSlug from '@/utils/generateSlug';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { blogCategories } from "@/lib/utils";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

interface BlogFormProps {
  title: string;
  initialData?: {
    id: string;
    title: string;
    slug: string;
    imageUrl?: string;
    description?: string;
    content?: string;
    categorySlug?: string;
    category: string;
  } | null;

}

export type BlogFormData = {
  title: string;
  slug: string;
  description: string;
  content: string;
  categorySlug: string;
  category: string;
};


export default function BlogForm({ title, initialData }: BlogFormProps) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);
  const initialImageUrl = initialData?.imageUrl || "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      categorySlug: initialData?.categorySlug || "",
    },
  });

  const router = useRouter();
  const selectedCategorySlug = watch("categorySlug");

  async function onSubmit(data: BlogFormData) {
    setIsLoading(true);
    try {
      if (!imageUrl) {
        toast.error("Please upload an image");
        setIsLoading(false);
        return;
      }

      const slug = generateSlug(data.title);
      const blogData = {
        ...data,
        slug,
        imageUrl,
      };

      if (editingId) {
        await updateBlog(editingId, blogData);
        toast.success("Blog Updated Successfully");
      } else {
        await createBlog(blogData);
        toast.success("Blog Created Successfully");
      }
      reset();
      router.push('/dashboard/blogs');
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
      <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
        <div className="flex items-center justify-between px-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/blogs">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="categorySlug" className="text-sm font-medium">
              Select Category
            </label>
            <Select
              value={selectedCategorySlug}
              onValueChange={(value) => setValue("categorySlug", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {blogCategories.map((category) => (
                  <SelectItem key={category.title} value={category.slug}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TextInput
            label="Blog Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter blog title"
          />

          <TextInput
            label="Description"
            register={register}
            name="description"
            errors={errors}
            placeholder="Enter blog description"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <ImageInput
              label="Blog Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="blogImage"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <div className=" border rounded-lg">
                <ReactQuill
                  value={watch("content")}
                  onChange={(content) => setValue("content", content)}
                  modules={modules}
                  className="h-[250px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/blogs">Cancel</Link>
          </Button>

          <SubmitButton
            title={editingId ? "Update Blog" : "Create Blog"}
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