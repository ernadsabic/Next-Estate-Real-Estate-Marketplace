import { PropertySale, User } from "@/lib/generated/prisma";

export type PropertyType = PropertySale & {
  user: Pick<User, "id" | "name" | "email" | "image">;
};
