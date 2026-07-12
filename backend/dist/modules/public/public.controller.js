"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicController = void 0;
const prisma_1 = require("../../prisma");
exports.publicController = {
    getPublicCommodities: async (_req, res) => {
        const commodities = await prisma_1.prisma.commodity.findMany({
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
                }
                else if (currentPrice < srpPrice) {
                    complianceStatus = 'Below SRP';
                }
                else {
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
