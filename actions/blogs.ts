"use server";

import { prismaClient } from "@/lib/db";
import { Blog } from "@/types/types";
import { revalidatePath } from "next/cache";

// export interface BlogProps {
//   title: string;
//   slug: string;
//   imageUrl?: string;
//   description?: string;
//   content?: string;
//   categorySlug: string;
// }
export interface BlogsResponseMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogsResponse {
  data: Blog[] | null;
  metadata: BlogsResponseMetadata | null;
  status: number;
  error: any;
}

// Create a new blog post
export async function createBlog(data: Blog) {
  try {
    const existingBlog = await prismaClient.blog.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingBlog) {
      return {
        data: null,
        status: 409,
        error: "Blog post with this slug already exists",
      };
    }

    const newBlog = await prismaClient.blog.create({
      data,
    });
    revalidatePath("/dashboard/blogs");
    revalidatePath("/blog"); // Revalidate public blog page if exists

    return {
      data: newBlog,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Update an existing blog post
export async function updateBlog(id: string, data: Partial<Blog>) {
  try {
    const existingBlog = await prismaClient.blog.findUnique({
      where: {
        id,
      },
    });

    if (!existingBlog) {
      return {
        data: null,
        status: 404,
        error: "Blog post not found",
      };
    }

    const updatedBlog = await prismaClient.blog.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/blogs");
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedBlog.slug}`);

    return {
      data: updatedBlog,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Get all blog posts with optional filters
export async function getBlogs(params?: {
  category?: string;
  limit?: number;
  page?: number;
}): Promise<BlogsResponse> {
  try {
    const where: any = {};

    if (params?.category) {
      where.categorySlug = params.category;
    }

    // Calculate pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prismaClient.blog.count({ where });

    const blogs = await prismaClient.blog.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    return {
      data: blogs,
      metadata: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      metadata: null,
      status: 500,
      error,
    };
  }
}

// Get a single blog post by slug
export async function getBlogBySlug(slug: string) {
  try {
    const blog = await prismaClient.blog.findUnique({
      where: {
        slug,
      },
    });

    if (!blog) {
      return {
        data: null,
        status: 404,
        error: "Blog post not found",
      };
    }

    return {
      data: blog,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Delete a blog post
export async function deleteBlog(id: string) {
  try {
    const blog = await prismaClient.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      return {
        ok: false,
        status: 404,
        error: "Blog post not found",
      };
    }

    await prismaClient.blog.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/blogs");
    revalidatePath("/blog");

    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: 500,
      error,
    };
  }
}

// Get blogs by category
// export async function getBlogsByCategory(category: string) {
//   try {
//     const blogs = await prismaClient.blog.findMany({
//       where: {
//         categoryId,
    
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return {
//       data: blogs,
//       status: 200,
//       error: null,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       data: null,
//       status: 500,
//       error,
//     };
//   }
// }

// Toggle blog active status
export async function toggleBlogStatus(id: string) {
  try {
    const blog = await prismaClient.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      return {
        data: null,
        status: 404,
        error: "Blog post not found",
      };
    }

    const updatedBlog = await prismaClient.blog.update({
      where: {
        id,
      },
      data: {
    
      },
    });
    revalidatePath("/dashboard/blogs");
    revalidatePath("/blog");

    return {
      data: updatedBlog,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}