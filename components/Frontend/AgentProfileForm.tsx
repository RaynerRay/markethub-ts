'use client'

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createAgentProfile } from '@/actions/agentProfile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageInput from '../FormInputs/ImageInput';

interface AgentProfileFormProps {
  userId: string;
  companies: Array<{
    id: string;
    title: string;
  }>;
}

interface AgentProfileInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  code: string;
  bio: string;
  imageUrl: string;
  properties: string[];
  companyId: string;
}

interface CreateAgentProfileResponse {
  data: any;
  status: number;
  error: string | null;
}

const AgentProfileForm: React.FC<AgentProfileFormProps> = ({ userId, companies }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<AgentProfileInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      code: '',
      bio: '',
      imageUrl: '',
      properties: [],
      companyId: ''
    }
  });

  // Update form when imageUrl changes
  React.useEffect(() => {
    if (imageUrl) {
      setValue('imageUrl', imageUrl);
    }
  }, [imageUrl, setValue]);

  const onSubmit = async (data: AgentProfileInputs) => {
    setIsLoading(true);
    try {
      const result = await createAgentProfile({
        userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        code: data.code,
        bio: data.bio,
        profileImageUrl: imageUrl,
        properties: data.properties || [],
        companyId: data.companyId
      }) as CreateAgentProfileResponse;

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.status === 201) {
        toast.success('Agent profile created successfully!');
        reset();
        router.push('/dashboard/agents');
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to create profile');
      }
    } catch (error) {
      console.error('Profile creation error:', error);
      toast.error('Something went wrong while creating the profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Agent Profile</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Section */}
        <div className="mb-6">
          <ImageInput
            label="Agent Profile Picture"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="agentImage"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">First Name</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              type="text"
              className="mt-1 w-full p-3 border rounded-md"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Last Name</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              type="text"
              className="mt-1 w-full p-3 border rounded-md"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
              className="mt-1 w-full p-3 border rounded-md"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Phone</label>
            <input
              {...register("phone", { required: "Phone number is required" })}
              type="tel"
              className="mt-1 w-full p-3 border rounded-md"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Agent Code</label>
            <input
              {...register("code")}
              type="text"
              className="mt-1 w-full p-3 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Company
            </label>
            <Controller
              name="companyId"
              control={control}
              rules={{ required: "Company selection is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.companyId && (
              <p className="mt-1 text-sm text-red-600">{errors.companyId.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Bio</label>
          <textarea
            {...register("bio")}
            rows={4}
            className="mt-1 w-full p-3 border rounded-md"
            placeholder="Tell us about yourself..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-500 text-white py-3 px-4 rounded-md hover:bg-emerald-600 transition-colors disabled:bg-emerald-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Profile..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default AgentProfileForm;