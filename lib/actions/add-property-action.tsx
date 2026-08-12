"use server";

import { FormData } from "@/Types/formType";
import { prisma } from "@/lib/prisma";
import { auth } from "../auth";
import { headers } from "next/headers";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export const addProperty = async (formValues: FormData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    throw new Error("Not authenticated");
  }

  const hasEmptyField = Object.values(formValues).some(
    (value) => value === "" || value === null || value === undefined
  );

  if (hasEmptyField) {
    toast.error("Please fill in all required fields.");
    return;
  }

  await prisma.propertySale.create({
    data: {
      category: formValues.category,
      location: formValues.location,
      address: formValues.address,
      bedrooms: formValues.bedrooms,
      bathrooms: formValues.bathrooms,
      parkings: formValues.parkings,
      area: formValues.area,
      title: formValues.title,
      description: formValues.description,
      imageUrl: formValues.imageUrl,
      type: formValues.type,
      price: formValues.price,
      userId: session.user.id,
    },
  });

  revalidatePath("/marketplace");

  
};
