-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "maxTimeLimit" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "maxUsers" INTEGER NOT NULL DEFAULT 100;
