/*
  Warnings:

  - A unique constraint covering the columns `[razorpaySignature]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "razorpaySignature" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_razorpaySignature_key" ON "Purchase"("razorpaySignature");
