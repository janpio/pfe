-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "buildingId" INTEGER;

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'immeuble',

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;
