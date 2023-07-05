/*
  Warnings:

  - You are about to drop the column `questionID` on the `Response` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionID_fkey";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "questionID",
ADD COLUMN     "questionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
