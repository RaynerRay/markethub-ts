import { getBlogBySlug } from '@/actions/blogs';
import BlogDetail from '@/components/Frontend/Blog/BlogDetail';

type PageProps = {
  params: {
    slug: string;
  };
};

interface Blog {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  content?: string | null;
  categorySlug: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

// Type guard to ensure blog data matches Blog interface
function isValidBlog(data: any): data is Blog {// eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    data &&
    typeof data === "object" &&
    "id" in data &&
    "title" in data &&
    "slug" in data &&
    "categorySlug" in data &&
    "createdAt" in data
  );
}

// Transform API response to match Blog type
function transformBlogData(apiResponse: any): Blog {// eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    id: apiResponse.id,
    title: apiResponse.title,
    slug: apiResponse.slug,
    imageUrl: apiResponse.imageUrl || null,
    description: apiResponse.description || null,
    content: apiResponse.content || null,
    categorySlug: apiResponse.categorySlug || null,
    createdAt: new Date(apiResponse.createdAt),
    updatedAt: apiResponse.updatedAt ? new Date(apiResponse.updatedAt) : null
  };
}

export default async function Page({ params }: PageProps) {
  const blogResponse = await getBlogBySlug(params.slug);

  // Handle error cases
  if (blogResponse.status === 404) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Blog Not Found</h1>
          <p className="mt-2 text-gray-600">The blog post you&#39;re looking for doesn&#39;t exist or has been removed.</p>

        </div>
      </div>
    );
  }

  if (blogResponse.status === 500) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Transform and validate the blog data
  let blogData: Blog | null = null;

  if (blogResponse.data) {
    const transformedData = transformBlogData(blogResponse.data);
    if (isValidBlog(transformedData)) {
      blogData = transformedData;
    }
  }

  // Handle case where data transformation failed
  if (!blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Invalid Blog Data</h1>
          <p className="mt-2 text-gray-600">There was a problem loading the blog post.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12">
      <BlogDetail blog={blogData} />
    </section>
  );
}