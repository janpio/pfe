-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Supervisor" DROP CONSTRAINT "Supervisor_teamId_fkey";

-- DropIndex
DROP INDEX "Employee_name_key";

-- DropIndex
DROP INDEX "Supervisor_name_key";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "supervisorId" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Supervisor" ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "teamId" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Supervisor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supervisor" ADD CONSTRAINT "Supervisor_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
