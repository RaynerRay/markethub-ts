import { getAllPropertySlugs, getPropertyBySlug, getSimilarPropertiesBySlug } from "@/actions/properties";
import PropertyDetail from "@/components/Frontend/PropertyDetail";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";


interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const session = await getServerSession(authOptions);
  
  if (!slug) {
    notFound();
  }

  try {
    const [property, similarProperties] = await Promise.all([
      getPropertyBySlug(slug),
      getSimilarPropertiesBySlug(slug),
    ]);
  
    if (!property || !property.data) {
      console.error('Property data not found or error fetching property:', property?.error);
      notFound();
    }
  
    return (
      <main className="min-h-screen bg-slate-50">
        <PropertyDetail
          property={property.data}
          similarProperties={similarProperties?.data || []}
          userId={session?.user.id}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching property:', error);
    notFound();
  }
  
}

// Generate static params for all property slugs
export async function generateStaticParams() {
  try {
    const { data: slugs } = await getAllPropertySlugs();
    
    if (!slugs) return [];
    
    return slugs.map((slug) => ({
      slug: slug.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}