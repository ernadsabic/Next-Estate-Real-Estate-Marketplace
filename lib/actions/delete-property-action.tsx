"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("You have to be authenticated first!");
  }
  const property = await prisma.propertySale.findUnique({
    where: { id: propertyId },
  });

  if (!property || property.userId !== session.user.id) {
    throw new Error("You don't have permission to delete this property.");
  }

  await prisma.propertySale.delete({
    where: { id: propertyId },
  });

  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/marketplace", "layout");
};

export default deleteProperty;
