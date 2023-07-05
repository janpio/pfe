-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Supervisor" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '';
