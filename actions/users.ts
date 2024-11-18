'use server'

import bcrypt from 'bcrypt';
import { z } from 'zod';
import { prismaClient } from '@/lib/db';

// Move enums, types and interfaces to a separate types file
// Create a new file: types/user.ts
export type UserRole = 'USER' | 'ADMIN' | 'AGENT';

export type RegisterInputProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string | string[];
  plan?: string | string[];
};

export type UserSelect = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
};

export type ActionResponse = {
  success: boolean;
  data?: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: UserRole;
  } | null;
  error?: string;
};

// Validation schema
const UserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum(['USER', 'ADMIN', 'AGENT']).optional(),
  plan: z.string().optional(),
});



export async function createUser(data: RegisterInputProps): Promise<ActionResponse> {
  try {
    // Validate input data
    const validatedData = UserSchema.parse(data);

    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        error: 'Email already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const user = await prismaClient.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: validatedData.role as UserRole || 'USER',
        profile: {
          create: {
            // Add any additional profile fields here
          }
        }
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      }
    }) as UserSelect;

    // Optional: Handle plan subscription
    if (validatedData.plan) {
      // Add subscription logic here
    }


    return {
      success: true,
      data: user,
    };

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: 'Something went wrong during registration',
    };
  }
}

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
      select: { id: true }
    });
    
    return !!user;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}