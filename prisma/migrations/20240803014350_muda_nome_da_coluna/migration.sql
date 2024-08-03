/*
  Warnings:

  - You are about to drop the column `total_hours` on the `shift` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shift" DROP COLUMN "total_hours",
ADD COLUMN     "total_duration_ms" INTEGER;
