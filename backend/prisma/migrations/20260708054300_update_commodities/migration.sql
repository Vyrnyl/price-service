/*
  Warnings:

  - You are about to drop the column `unit` on the `Commodity` table. All the data in the column will be lost.
  - Added the required column `status` to the `Commodity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commodity" DROP COLUMN "unit",
ADD COLUMN     "status" TEXT NOT NULL;
