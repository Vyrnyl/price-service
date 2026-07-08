/*
  Warnings:

  - You are about to drop the column `date` on the `PriceRecord` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `PriceRecord` table. All the data in the column will be lost.
  - Added the required column `dateAndTime` to the `PriceRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriceRecord" DROP COLUMN "date",
DROP COLUMN "photoUrl",
ADD COLUMN     "dateAndTime" TIMESTAMP(3) NOT NULL;
