

'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { createUser } from '@/actions/users';

interface SignupFormProps {
  role?: string | string[];
  plan?: string | string[];
}

interface RegisterInputProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string | string[];
}

const SignupForm = ({ role = "USER",  }: SignupFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterInputProps>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role,
    }
  });
  
  const router = useRouter();

  const onSubmit = async (data: RegisterInputProps) => {
    setIsLoading(true);
    setEmailErr(null);

    try {
      const result = await createUser({
        ...data,
        role: role as string,
      });

      if (!result.success) {
        if (result.error?.includes('Email already exists')) {
          setEmailErr(result.error);
        }
        toast.error(result.error || 'Failed to create account');
        return;
      }

      toast.success('Account created successfully!');
      reset();
      
      if (result.data?.id) {
        router.push(`/`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Something went wrong during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              {...register("firstName", { 
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters"
                }
              })}
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              {...register("lastName", { 
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters"
                }
              })}
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
            {emailErr && (
              <p className="mt-1 text-sm text-red-600">{emailErr}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 8 characters"
                },
                // pattern: {
                //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //   message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                // }
              })}
              type="password"
              id="password"
              placeholder="Create a password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition-colors disabled:bg-emerald-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-500 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;