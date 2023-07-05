/*
  Warnings:

  - Made the column `role` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `Supervisor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "role" SET NOT NULL;

-- AlterTable
ALTER TABLE "Supervisor" ALTER COLUMN "role" SET NOT NULL;
