import { PropertyType } from "@/Types/PropertyType";
import { Bath, Bed, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import ContactForm from "./ContactForm";
import { formatPrice } from "@/lib/utils";

type Props = {
  property: PropertyType;
};

const SinglePropertyClient = ({ property }: Props) => {
  const hasMoreImages = property.imageUrl.length > 1;
  return (
    <section className="min-h-screen pt-16 md:pt-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center flex-wrap gap-6 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-2 rounded-full border border-indigo-100">
              {property.type === "FOR_RENT" ? "FOR RENT" : "FOR SALE"}
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl  font-bold tracking-tighter">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 flex-wrap mt-8 text-gray-800">
              <div className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1 font-medium">
                <MapPin className="text-slate-500 w-5 h-5" />
                {property.location}
              </div>
              <div className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1 font-medium">
                <Ruler className="text-slate-500 w-5 h-5" />
                {property.area} sqft
              </div>
              <div className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1 font-medium">
                <Bed className="text-slate-500 w-5 h-5" />
                {property.bedrooms} rooms
              </div>
              <div className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1 font-medium">
                <Bath className="text-slate-500 w-5 h-5" />
                {property.bathrooms} baths
              </div>
            </div>
          </div>
          <div className="py-6 px-8 flex flex-col gap-2 bg-white rounded-3xl shadow-md">
            <span className="text-gray-400">Property Price</span>
            <p className="text-5xl text-indigo-600 truncate font-bold tracking-wide">
              {formatPrice(property.price)}
              {property.type === "FOR_RENT" && (
                <span className="text-sm text-gray-400 font-medium">/mo</span>
              )}
            </p>
          </div>
        </div>
        <div
          className={`${
            hasMoreImages &&
            "grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 h-125"
          }`}
        >
          <div className="relative overflow-hidden w-full h-full aspect-4/3 md:aspect-2/1 lg:aspect-2.5/1 rounded-2xl  shadow-md">
            <Image
              src={property.imageUrl[0]}
              alt={property.title}
              loading="lazy"
              fill
              className="object-cover object-center"
            />
          </div>
          {hasMoreImages && (
            <div className="grid grid-rows-2 h-full gap-4">
              {property.imageUrl.slice(1, 3).map((img) => (
                <div
                  className="relative overflow-hidden w-full  rounded-2xl  shadow-md"
                  key={img}
                >
                  <Image
                    src={img}
                    alt={property.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-start mt-10">
          <div className="p-8 bg-white shadow-md rounded-4xl">
            <p className="text-3xl font-bold mb-4">About This Property</p>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>
          <ContactForm user={property.user} />
        </div>
      </div>
    </section>
  );
};

export default SinglePropertyClient;
