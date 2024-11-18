import React, { KeyboardEvent, useState, useEffect } from 'react';
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PropertyFormData } from '../Dashboard/PropertyForm';  // Adjust import path as needed

interface TagsInputProps {
  register: UseFormRegister<PropertyFormData>;
  setValue: UseFormSetValue<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
  name: 'tags';
  placeholder?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({ 
  register, 
  setValue, 
  watch, 
  name, 
  placeholder = "Add tags..." 
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const tags = watch(name) || [];

  // Register the field with react-hook-form
  useEffect(() => {
    register(name);
  }, [register, name]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = inputValue.trim();
      if (tag && !tags.includes(tag)) {
        setValue(name, [...tags, tag], { 
          shouldValidate: true,
          shouldDirty: true 
        });
        setInputValue("");
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      setValue(name, tags.slice(0, -1), { 
        shouldValidate: true,
        shouldDirty: true 
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      name, 
      tags.filter(tag => tag !== tagToRemove),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-primary/80"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-0 outline-none focus-visible:ring-0 p-0 min-w-[120px] bg-transparent"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Press enter or comma to add tags
      </p>
    </div>
  );
};

export default TagsInput;