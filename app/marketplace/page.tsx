import FilterForm from "@/components/FilterForm";
import PropertyCard from "@/components/PropertyCard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

interface SearchParams {
  searchParams: Promise<{
    category: string;
    location: string;
    min_price: number;
    max_price: number;
  }>;
}
const Marketplace = async ({ searchParams }: SearchParams) => {
  const resolvedParams = await searchParams;

  const minPrice = resolvedParams.min_price
    ? Number(resolvedParams.min_price)
    : undefined;
  const maxPrice = resolvedParams.max_price
    ? Number(resolvedParams.max_price)
    : undefined;

  const properties = await prisma.propertySale.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      category: resolvedParams.category,

      ...(resolvedParams.location && {
        location: {
          contains: resolvedParams.location,
          mode: "insensitive",
        },
      }),

      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      }),
    },
  });

  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserId = session?.user?.id;

  return (
    <section className="min-h-screen pt-16 md:pt-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-6 justify-between items-center relative mb-10">
          <div className="space-y-2">
            <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl">
              Exceptional Properties
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Curated spaces for the modern visionary. Explore our exclusive
              collection of architectural masterworks.
            </p>
          </div>
          <FilterForm />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} currentUserId={currentUserId}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
