import { PropertyType } from "@prisma/client";

export interface FormData {
  category: string;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  parkings: number;
  area: number;
  title: string;
  description: string;
  imageUrl: string[];
  type: PropertyType;
  price: number;
}
