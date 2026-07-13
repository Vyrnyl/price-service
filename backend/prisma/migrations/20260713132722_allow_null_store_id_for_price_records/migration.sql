-- DropForeignKey
ALTER TABLE "PriceRecord" DROP CONSTRAINT "PriceRecord_storeId_fkey";

-- AlterTable
ALTER TABLE "PriceRecord" ALTER COLUMN "storeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PriceRecord" ADD CONSTRAINT "PriceRecord_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
