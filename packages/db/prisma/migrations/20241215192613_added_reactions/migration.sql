-- CreateTable
CREATE TABLE "Reaction" (
    "emoji" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "RoomParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
