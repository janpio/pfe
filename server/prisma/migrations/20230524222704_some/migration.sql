-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionId_fkey";

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "response" DROP NOT NULL,
ALTER COLUMN "employeeId" DROP NOT NULL,
ALTER COLUMN "questionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
