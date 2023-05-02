-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_deskId_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "deskId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_deskId_fkey" FOREIGN KEY ("deskId") REFERENCES "Desk"("id") ON DELETE SET NULL ON UPDATE CASCADE;
