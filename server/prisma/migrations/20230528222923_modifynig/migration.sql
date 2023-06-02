/*
  Warnings:

  - The values [PENDING,ACCEPTED,DECLINED] on the enum `InvitationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvitationStatus_new" AS ENUM ('Pending', 'Accepted', 'Declined');
ALTER TABLE "ActivityInvitation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ActivityInvitation" ALTER COLUMN "status" TYPE "InvitationStatus_new" USING ("status"::text::"InvitationStatus_new");
ALTER TYPE "InvitationStatus" RENAME TO "InvitationStatus_old";
ALTER TYPE "InvitationStatus_new" RENAME TO "InvitationStatus";
DROP TYPE "InvitationStatus_old";
ALTER TABLE "ActivityInvitation" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "ActivityInvitation" ALTER COLUMN "status" SET DEFAULT 'Pending';
