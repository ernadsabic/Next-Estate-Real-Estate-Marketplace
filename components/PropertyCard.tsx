import { Bath, Bed, MapPin, Ruler } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FormData } from "@/Types/formType";
import { formatPrice } from "@/lib/utils";
import SettingsButton from "./SettingsButton";

type PropertyCardType = FormData & {
  id: string;
  userId: string;
};

type Props = {
  property: PropertyCardType;
  currentUserId?: string;
};

const PropertyCard = ({ property, currentUserId }: Props) => {
  
  const isAuthor = currentUserId ? property.userId === currentUserId : false;
  return (
    <div className="relative overflow-hidden aspect-2/3 rounded-xl p-6 group shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
      <Image
        src={property.imageUrl[0]}
        alt={property.title}
        fill
        loading="lazy"
        className="object-cover object-center group-hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <div className="relative z-20 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-indigo-700 px-4 py-2 text-white">
              {property.type === "FOR_SALE" ? "For Sale" : "For Rent"}
            </div>
            <div className="rounded-full bg-slate-900/40 px-4 py-2 text-gray-200 capitalize">
              {property.category}
            </div>
          </div>
          {isAuthor && <SettingsButton propertyId={property.id} />}
        </div>
        <Link href={`/marketplace/${property.id}`}>
          <div>
            <p className="text-3xl md:text-4xl text-white font-medium mb-1">
              {formatPrice(property.price)}{" "}
              {property.type === "FOR_RENT" && (
                <span className="text-sm text-gray-300">/mo</span>
              )}
            </p>
            <div className="flex items-center gap-2 text-white mb-6">
              <MapPin className="text-gray-300 h-5 w-5" />
              <p className="text-sm text-gray-300">{property.location}</p>
            </div>
            <h2 className="text-2xl text-white font-bold pb-2 border-b border-white/20">
              {property.address}
            </h2>
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Bed className="text-gray-300 h-5 w-5" />
                <p className="text-white font-medium">{property.bedrooms}</p>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="text-gray-300 h-5 w-5" />
                <p className="text-white font-medium">{property.area} sqft</p>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="text-gray-300 h-5 w-5" />
                <p className="text-white font-medium">{property.bathrooms}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="absolute inset-0 z-10 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
    </div>
  );
};

export default PropertyCard;
