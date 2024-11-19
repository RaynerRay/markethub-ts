import { getBlogs } from '@/actions/blogs';
import BlogList from '@/components/Frontend/Blog/BlogList'
import { blogCategories } from '@/lib/utils';
import React from 'react'
import { Blog } from '@/types/types';

const page = async () => {
  const blogs = await getBlogs();
  
  // Type-safe handling of blogs data
  const blogData: Blog[] = blogs?.data ?? [];
  
  return (
    <div>
      <BlogList 
        blogs={blogData} 
        categories={blogCategories}
      />
    </div>
  )
}

export default page