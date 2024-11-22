import React from 'react';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { Calendar, User } from 'lucide-react';
import Head from 'next/head';
import DOMPurify from 'isomorphic-dompurify';

interface BlogDetailProps {
  blog: {
    id: string;
    title: string;
    slug: string;
    imageUrl?: string | null;
    description?: string | null;
    content?: string | null;
    categorySlug: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    author?: {
      name: string;
      avatar?: string;
    };
    metaDescription?: string;
    keywords?: string[];
  };
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  const formattedDate = (date: Date) => {
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  // Create a clean excerpt for meta description if none provided
  const getMetaDescription = () => {
    if (blog.metaDescription) return blog.metaDescription;
    if (blog.description) return blog.description;
    
    // Strip HTML and create excerpt from content
    const contentText = blog.content ? 
      DOMPurify.sanitize(blog.content, { ALLOWED_TAGS: [] }) : '';
    return contentText.slice(0, 160) + (contentText.length > 160 ? '...' : '');
  };

  // Format the date for schema markup
  const publishDate = blog.createdAt.toISOString();
  const modifiedDate = blog.updatedAt?.toISOString() || publishDate;

  return (
    <>
      <Head>
        <title>{`${blog.title} | Blog Name`}</title>
        <meta name="description" content={getMetaDescription()} />
        {blog.keywords && (
          <meta name="keywords" content={blog.keywords.join(', ')} />
        )}
        <meta name="author" content={blog.author?.name || 'Your Blog Name'} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:type" content="article" />
        {blog.imageUrl && <meta property="og:image" content={blog.imageUrl} />}
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={getMetaDescription()} />
        {blog.imageUrl && <meta name="twitter:image" content={blog.imageUrl} />}

        {/* Article Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: blog.title,
            description: getMetaDescription(),
            image: blog.imageUrl,
            datePublished: publishDate,
            dateModified: modifiedDate,
            author: {
              '@type': 'Person',
              name: blog.author?.name || ' Author'
            }
          })}
        </script>
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section with Image */}
        <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{blog.title}</h1>
            {blog.description && (
              <p className="text-lg text-gray-200">{blog.description}</p>
            )}
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          {blog.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={blog.createdAt.toISOString()}>
              {formattedDate(blog.createdAt)}
            </time>
          </div>
          {blog.categorySlug && (
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {blog.categorySlug}
            </span>
          )}
        </div>

        {/* Main Content - React Quill */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: DOMPurify.sanitize(blog.content || '') 
          }}
        />

        {/* Update Information */}
        {blog.updatedAt && (
          <div className="mt-8 text-sm text-gray-500">
            Last updated: {formattedDate(blog.updatedAt)}
          </div>
        )}
      </article>
    </>
  );
};

export default BlogDetail;