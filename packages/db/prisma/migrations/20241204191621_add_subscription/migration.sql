/*
  Warnings:

  - You are about to drop the column `maxRoomDuration` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `maxRoomUsers` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `maxRoomsPerDay` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `maxRooms` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_planId_fkey";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "maxRoomDuration",
DROP COLUMN "maxRoomUsers",
DROP COLUMN "maxRoomsPerDay",
DROP COLUMN "price",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxRooms" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "planId",
ADD COLUMN     "roomsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "savedRoomsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subscriptionId" TEXT;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "isPro" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "isMonthly" BOOLEAN NOT NULL DEFAULT true,
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "Room_createdById_createdAt_idx" ON "Room"("createdById", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_subscriptionId_key" ON "User"("subscriptionId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
