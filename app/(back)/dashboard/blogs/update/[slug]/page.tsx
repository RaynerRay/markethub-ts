import { getBlogBySlug } from "@/actions/blogs";
import BlogForm from "@/components/Dashboard/BlogForm";
import React from "react";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blog = (await getBlogBySlug(slug))?.data;
  return (
    <div>
      {blog && blog.id && (
        <BlogForm title="Update Blog" categories={["cat", "dog"]} />
      )}
    </div>
  );
}
