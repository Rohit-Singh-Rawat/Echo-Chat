/*
  Warnings:

  - A unique constraint covering the columns `[emoji,messageId,senderId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_roomId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_emoji_messageId_senderId_key" ON "Reaction"("emoji", "messageId", "senderId");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
