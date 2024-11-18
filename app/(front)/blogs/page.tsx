import { getBlogs } from '@/actions/blogs';
import BlogList from '@/components/Frontend/Blog/BlogList'
import { blogCategories } from '@/lib/utils';
import React from 'react'

const page = async () => {
  const blogs = await getBlogs();
  
  return (
    <div>
        <BlogList blogs={blogs.data} categories={blogCategories}/>
    </div>
  )
}

export default page