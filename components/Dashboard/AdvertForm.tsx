"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";


import { Button } from "../ui/button";
import { Advert } from "@prisma/client";
import { createAdvert, updateAdvert } from "@/actions/adverts";
import TextInput from "../FormInputs/TextInput";
import ImageInput from "../FormInputs/ImageInput";
import SubmitButton from "../FormInputs/SubmitButton";

export type AdvertProps = {
  title: string;
  link: string;
  imageUrl: string;
};

export default function AdvertForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Advert;
}) {
  const editingId = initialData?.id || "";
  const [isLoading, setIsLoading] = useState(false);
  const initialImageUrl = initialData?.imageUrl || "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdvertProps>({
    defaultValues: {
      title: initialData?.title,
      link: initialData?.link,
    },
  });

  const router = useRouter();

  async function onSubmit(data: AdvertProps) {
    setIsLoading(true);
    try {
      data.imageUrl = imageUrl;

      if (!data.imageUrl) {
        toast.error("Please upload an image");
        setIsLoading(false);
        return;
      }

      if (editingId) {
        await updateAdvert(editingId, data);
        toast.success("Advert Updated Successfully");
      } else {
        await createAdvert(data);
        toast.success("Advert Created Successfully");
      }
      reset();
      router.push("/dashboard/adverts");
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
            <Link href="/dashboard/adverts">
              <X className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <div className="space-y-4">
            <TextInput
              label="Advert Title"
              register={register}
              name="title"
              errors={errors}
              placeholder="Enter advert title"
            //   rules={{
            //     required: "Advert title is required",
            //     minLength: {
            //       value: 3,
            //       message: "Advert title must be at least 3 characters",
            //     },
            //   }}
            />
            <TextInput
              label="Advert Link"
              register={register}
              name="link"
              errors={errors}
              placeholder="Enter advert link"
            //   rules={{
            //     required: "Advert link is required",
            //     pattern: {
            //       value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            //       message: "Please enter a valid URL",
            //     },
            //   }}
            />
          </div>
          <ImageInput
            label="Advert Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="advertImage"
          />
        </div>

        <div className="mt-8 flex justify-between gap-4 items-center">
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/adverts">Cancel</Link>
          </Button>

          <SubmitButton
            title={editingId ? "Update Advert" : "Create Advert"}
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