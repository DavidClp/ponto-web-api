/*
  Warnings:

  - You are about to alter the column `total_hours` on the `shift` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "shift" ALTER COLUMN "total_hours" SET DATA TYPE INTEGER;
