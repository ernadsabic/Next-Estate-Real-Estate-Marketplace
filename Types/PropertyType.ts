import { PropertySale, User } from "@prisma/client";

export type PropertyType = PropertySale & {
  user: Pick<User, "id" | "name" | "email" | "image">;
};
