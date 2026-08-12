import Link from "next/link";
import { ArrowRight, Bath, Bed, MapPin, Ruler } from "lucide-react";
import { Button } from "../ui/button";
import { prisma } from "@/lib/prisma";
import PropertyCard from "../PropertyCard";

const Recent = async () => {
  const properties = await prisma.propertySale.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });
  return (
    <section className="pt-16 md:pt-20 min-h-dvh bg-[#F8FAFC]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>
            <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Market Overview
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-2">
              Recent Listings
            </h2>
            <p className="max-w-2xl text-gray-600">
              Browse the latest homes, apartments, villas, and investment
              opportunities added to our marketplace by trusted property owners
              and agents.
            </p>
          </div>
          <Button
            nativeButton={false}
            variant={"outline"}
            render={<Link href={"/marketplace"}></Link>}
            className="px-8 py-6 rounded-full border-slate-300 text-slate-800 font-medium hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-12">
          {properties.map((property, key) => (
            <PropertyCard key={key} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recent;
