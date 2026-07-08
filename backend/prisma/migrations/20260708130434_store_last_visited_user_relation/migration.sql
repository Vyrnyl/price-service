/*
  Warnings:

  - You are about to drop the column `latitude` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Store` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "lastVisited" TIMESTAMP(3),
ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
