/*
  Warnings:

  - You are about to drop the column `beginTime` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `time` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "beginTime",
DROP COLUMN "day",
DROP COLUMN "endTime",
DROP COLUMN "name",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ActivityInvitation" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER,
    "senderId" INTEGER,
    "recipientId" INTEGER,
    "status" "InvitationStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityInvitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityInvitation" ADD CONSTRAINT "ActivityInvitation_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInvitation" ADD CONSTRAINT "ActivityInvitation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInvitation" ADD CONSTRAINT "ActivityInvitation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
