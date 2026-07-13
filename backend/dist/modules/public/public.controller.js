"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicController = void 0;
const prisma_1 = require("../../prisma");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const forecast_service_1 = require("../forecast/forecast.service");
exports.publicController = {
    getPublicForecastByCommodityId: async (req, res) => {
        const { commodityId } = req.params;
        try {
            const forecasts = await forecast_service_1.forecastService.generateForecast({ commodityId, horizon: 7 });
            res.json({ status: 'success', data: forecasts });
        }
        catch (error) {
            if (error instanceof AppError_1.default) {
                res.json({ status: 'success', data: [] });
                return;
            }
            throw error;
        }
    },
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
                    take: 8,
                    include: {
                        store: true,
                    },
                },
            },
        });
        const payload = commodities.map((commodity) => {
            const latestSrp = commodity.srps[0];
            const latestPriceRecord = commodity.prices[0];
            const priceValues = commodity.prices
                .map((priceRecord) => (priceRecord.price != null ? Number(priceRecord.price) : null))
                .filter((price) => price != null);
            const currentPrice = priceValues.length > 0
                ? priceValues.reduce((sum, price) => sum + price, 0) / priceValues.length
                : null;
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
            const priceRecords = commodity.prices.map((priceRecord) => {
                const recordPrice = priceRecord.price != null ? Number(priceRecord.price) : null;
                let recordComplianceStatus = 'Unknown';
                if (recordPrice != null && srpPrice != null) {
                    if (recordPrice > srpPrice) {
                        recordComplianceStatus = 'Above SRP';
                    }
                    else if (recordPrice < srpPrice) {
                        recordComplianceStatus = 'Below SRP';
                    }
                    else {
                        recordComplianceStatus = 'Compliant';
                    }
                }
                return {
                    id: priceRecord.id,
                    price: recordPrice,
                    dateAndTime: priceRecord.dateAndTime,
                    status: priceRecord.status,
                    srpPrice,
                    storeName: priceRecord.store?.name ?? null,
                    storeLocation: priceRecord.store?.location ?? null,
                    complianceStatus: recordComplianceStatus,
                };
            });
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
                priceRecords,
            };
        });
        res.json({ status: 'success', data: payload });
    },
};
