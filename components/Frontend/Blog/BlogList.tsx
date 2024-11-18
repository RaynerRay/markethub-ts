'use client'
import React, { useState, useEffect } from 'react';
import { Blog } from '@/types/types';
import BlogCard from './BlogCard';

interface FilteredBlogsProps {
  blogs: Blog[];
}

const FilteredBlogs: React.FC<FilteredBlogsProps> = ({ blogs }) => {
  const blogList = Array.isArray(blogs) ? blogs : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogList.length > 0 ? (
        blogList.map((blog) => <BlogCard key={blog.id} blog={blog} />)
      ) : (
        <p className="text-center text-slate-600">No blogs found for selected categories.</p>
      )}
    </div>
  );
};

interface BlogListProps {
  blogs: Blog[];
  categories: { slug: string; title: string }[];
}

// Side Filters Component
interface SideFiltersProps {
  categories: { slug: string; title: string }[];
  selectedCategories: string[];
  onCategoryChange: (categorySlug: string) => void;
}

const SideFilters: React.FC<SideFiltersProps> = ({ categories, selectedCategories, onCategoryChange }) => {
  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <div className="space-y-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Categories</h3>
        {categoryList.length > 0 ? (
          categoryList.map((category) => (
            <label key={category.slug} className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.slug)}
                onChange={() => onCategoryChange(category.slug)}
                className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-slate-600">{category.title}</span>
            </label>
          ))
        ) : (
          <p className="text-slate-600">No categories available</p>
        )}
      </div>
    </div>
  );
};

const BlogList: React.FC<BlogListProps> = ({ blogs, categories }) => {
  const initialBlogs = Array.isArray(blogs) ? blogs : [];
  const initialCategories = Array.isArray(categories) ? categories : [];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(initialBlogs);

  useEffect(() => {
    const blogsArray = Array.isArray(blogs) ? blogs : [];

    if (selectedCategories.length > 0) {
      const filtered = blogsArray.filter((blog) =>
        blog && blog.categorySlug && selectedCategories.includes(blog.categorySlug)
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogsArray);
    }
  }, [selectedCategories, blogs]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categorySlug)
        ? prevCategories.filter((slug) => slug !== categorySlug)
        : [...prevCategories, categorySlug]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/4 px-4">
            <SideFilters
              categories={initialCategories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="w-full lg:w-3/4 px-4">
            <FilteredBlogs blogs={filteredBlogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;