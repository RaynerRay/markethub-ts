import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

type TextAreaInputProps = {
  label: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  errors: FieldErrors;
  placeholder?: string;
  className?: string;
};

export function TextAreaInput({
  label,
  register,
  name,
  errors,
  placeholder = "",
  className = "col-span-full",
}: TextAreaInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        {...register(name, { required: true })}
        id={name}
        name={name}
        placeholder={placeholder}
      />
      {errors[name] && (
        <span className="text-red-600 text-sm">{label} is required</span>
      )}
    </div>
  );
}