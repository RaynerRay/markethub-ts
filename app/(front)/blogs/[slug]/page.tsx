// pages/BlogDetailPage.tsx
import BlogDetail from '@/components/Frontend/Blog/BlogDetail';
import React from 'react';

const blogData = {
  id: 1,
  title: 'The Future of Real Estate Technology',
  content: `Real estate technology is advancing at a rapid pace, revolutionizing how properties are bought, sold, and managed. From virtual tours to AI-driven insights, the possibilities are endless.

Imagine a world where potential buyers can explore homes from across the globe without stepping foot outside. With virtual reality, this is not only possible but increasingly common.

Furthermore, big data and AI are giving agents unprecedented insights into market trends, making it easier to find the perfect property for every client. Whether you're a buyer or an investor, these technologies are changing the game.\n\n
As we look to the future, it's clear that technology will continue to shape the real estate industry, bringing new opportunities and challenges. Stay ahead of the curve by embracing these innovations!`,
  image: '/blog-image1.jpg',
  author: 'John Doe',
  date: 'Oct 27, 2024',
};

const BlogDetailPage = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12">
      <BlogDetail blog={blogData} />
    </section>
  );
};

export default BlogDetailPage;
