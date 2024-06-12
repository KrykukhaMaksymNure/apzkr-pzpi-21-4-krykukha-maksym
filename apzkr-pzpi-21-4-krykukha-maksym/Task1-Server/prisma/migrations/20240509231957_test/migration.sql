/*
  Warnings:

  - Changed the type of `description` on the `heartbeats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "heartbeats" DROP COLUMN "description",
ADD COLUMN     "description" TEXT NOT NULL;
