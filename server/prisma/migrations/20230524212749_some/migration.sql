-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionID_fkey";

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "response" DROP NOT NULL,
ALTER COLUMN "questionID" DROP NOT NULL,
ALTER COLUMN "employeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
