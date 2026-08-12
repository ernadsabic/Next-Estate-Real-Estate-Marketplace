"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { PropertyType } from "@prisma/client";

interface Props {
  type?: PropertyType;
  price?: number;
  title?: string;
  description?: string;
  parkings?: number;
}

const updateProperty = async (formValues: Props, propertyId: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("You have to be authenticated first!");
  }
  const property = await prisma.propertySale.findUnique({
    where: { id: propertyId },
  });

  if (!property || property.userId !== session.user.id) {
    throw new Error("You don't have permission to edit this property.");
  }
  await prisma.propertySale.update({
    where: { id: propertyId },
    data: {
      type: formValues.type,
      price: formValues.price ? Number(formValues.price) : undefined,
      title: formValues.title?.trim() ? formValues.title : undefined,
      description: formValues.description?.trim()
        ? formValues.description
        : undefined,
      parkings: formValues.parkings ? Number(formValues.parkings) : undefined,
    },
  });

  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/marketplace", "layout");
};

export default updateProperty;
