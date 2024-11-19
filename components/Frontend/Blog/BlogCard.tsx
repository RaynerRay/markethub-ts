import { Blog } from '@/types/types';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} passHref>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
        {/* Blog Image */}
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-48 object-cover"
            height={500}
            width={500}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Blog Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-semibold text-navy-900 mb-2">
            {blog.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-700 mb-4">
            {blog.description && blog.description.length > 100
              ? `${blog.description.slice(0, 100)}...`
              : blog.description || "No description available"}
          </p>
          
          {/* Date */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
