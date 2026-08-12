-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('FOR_SALE', 'FOR_RENT');

-- CreateTable
CREATE TABLE "property_sale" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parkings" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT[],
    "type" "PropertyType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "property_sale" ADD CONSTRAINT "property_sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
