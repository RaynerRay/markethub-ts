// components/BlogDetail.tsx
import Image from 'next/image';
import React from 'react';

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-12 mb-16 transition duration-300 transform hover:shadow-2xl">
      {/* Blog Image with Gradient Overlay */}
      <div className="relative">
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover"
          height={500}
          width={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-75"></div>
        <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white leading-tight drop-shadow-lg">
          {blog.title}
        </h1>
      </div>

      {/* Blog Content */}
      <div className="p-8">
        {/* Author and Date */}
        <div className="flex items-center space-x-3 text-sm text-slate-500 mb-8">
          <span className="text-emerald-500 font-semibold">{blog.author}</span>
          <span>|</span>
          <span>{blog.date}</span>
        </div>

        {/* Full Content */}
        <div className="text-slate-700 leading-relaxed space-y-6">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 first-letter:text-3xl first-letter:font-bold first-letter:text-emerald-500">
              {paragraph}
            </p>
          ))}

          {/* Example of Blockquote for Emphasis */}
          {/* <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-slate-600">
            "This is a beautiful example of a blockquote for emphasis, showing off important points in the article."
          </blockquote> */}

          {/* Example List */}
          <ul className="list-disc list-inside space-y-2 text-slate-700 pl-4">
            <li>First important point in the article</li>
            <li>Second crucial detail explained further</li>
            <li>Third point wrapping up the idea</li>
          </ul>
        </div>
      </div>

      {/* Related Tags or Categories */}
      <div className="flex items-center justify-start space-x-4 px-8 pb-8 pt-4 border-t border-slate-200">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium">Technology</span>
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium">Real Estate</span>
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium">Innovation</span>
      </div>
    </div>
  );
};

export default BlogDetail;
