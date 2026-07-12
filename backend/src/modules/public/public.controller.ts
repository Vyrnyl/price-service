import { Request, Response } from 'express';
import { prisma } from '../../prisma';

export const publicController = {
  getPublicCommodities: async (_req: Request, res: Response) => {
    const commodities = await prisma.commodity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        srps: {
          orderBy: [
            { effectiveDate: 'desc' },
            { createdAt: 'desc' },
          ],
          take: 1,
        },
        prices: {
          orderBy: [
            { dateAndTime: 'desc' },
            { createdAt: 'desc' },
          ],
          take: 1,
          include: {
            store: true,
          },
        },
      },
    });

    const payload = commodities.map((commodity) => {
      const latestSrp = commodity.srps[0];
      const latestPriceRecord = commodity.prices[0];
      const currentPrice = latestPriceRecord?.price != null ? Number(latestPriceRecord.price) : null;
      const srpPrice = latestSrp?.price != null ? Number(latestSrp.price) : null;

      let complianceStatus = 'Unknown';
      if (currentPrice != null && srpPrice != null) {
        if (currentPrice > srpPrice) {
          complianceStatus = 'Above SRP';
        } else if (currentPrice < srpPrice) {
          complianceStatus = 'Below SRP';
        } else {
          complianceStatus = 'Compliant';
        }
      }

      return {
        id: commodity.id,
        name: commodity.name,
        category: commodity.category,
        status: commodity.status,
        currentPrice,
        srpPrice,
        complianceStatus,
        lastUpdatedAt: latestPriceRecord?.dateAndTime ?? latestPriceRecord?.createdAt ?? commodity.createdAt,
        storeName: latestPriceRecord?.store?.name ?? null,
        storeLocation: latestPriceRecord?.store?.location ?? null,
      };
    });

    res.json({ status: 'success', data: payload });
  },
};
