import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  UseFormRegister, 
  FieldErrors, 
  FieldValues, 
  Path 
} from "react-hook-form";

type TextInputProps<TFieldValues extends FieldValues> = {
  label: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  type?: string;
  page?: string;
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
};

export default function TextInput<TFieldValues extends FieldValues>({
  label,
  register,
  name,
  errors,
  type = "text",
  placeholder = "",
  page,
  className = "col-span-full",
  isRequired = true,
}: TextInputProps<TFieldValues>) {
  return (
    <div className={cn("grid gap-2", className)}>
      {type === "password" && page === "login" ? (
        <div className="flex items-center">
          <Label htmlFor={name}>{label}</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
      ) : (
        <Label htmlFor={name}>{label}</Label>
      )}

      <Input
        {...register(name, { required: isRequired })}
        id={name}
        name={name}
        type={type}
        autoComplete="name"
        placeholder={placeholder}
      />
      {errors[name] && isRequired && (
        <span className="text-red-600 text-sm">{label} is required</span>
      )}
    </div>
  );
}