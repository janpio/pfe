/*
  Warnings:

  - You are about to drop the column `abreviati` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "abreviati",
ADD COLUMN     "abreviatipn" TEXT;
