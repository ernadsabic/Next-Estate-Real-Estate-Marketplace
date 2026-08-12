import SinglePropertyClient from "@/components/SinglePropertyClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type ParamsType = {
  params: Promise<{ propId: string }>;
};
const SingleProperty = async ({ params }: ParamsType) => {
  const { propId } = await params;
  const property = await prisma.propertySale.findUnique({
    where: { id: propId },
    include: {
      user: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
  });

  if (!property) {
    notFound();
  }

  return <SinglePropertyClient property={property} />;
};

export default SingleProperty;
