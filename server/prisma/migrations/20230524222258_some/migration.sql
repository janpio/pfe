/*
  Warnings:

  - Made the column `response` on table `Response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employeeId` on table `Response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questionId` on table `Response` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionId_fkey";

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "response" SET NOT NULL,
ALTER COLUMN "employeeId" SET NOT NULL,
ALTER COLUMN "questionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
