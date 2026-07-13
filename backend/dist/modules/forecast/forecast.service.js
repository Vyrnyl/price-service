"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastService = void 0;
const prisma_1 = require("../../prisma");
const forecast_repository_1 = require("./forecast.repository");
const arima_1 = require("./arima");
function toDecimal(value) {
    return Number(value.toFixed(4));
}
exports.forecastService = {
    createForecast: (data) => forecast_repository_1.forecastRepository.create(data),
    getForecasts: () => forecast_repository_1.forecastRepository.findAll(),
    getForecastById: (id) => forecast_repository_1.forecastRepository.findById(id),
    updateForecast: (id, data) => forecast_repository_1.forecastRepository.update(id, data),
    deleteForecast: (id) => forecast_repository_1.forecastRepository.delete(id),
    generateForecast: async ({ commodityId, horizon }) => {
        const priceRecords = await prisma_1.prisma.priceRecord.findMany({
            where: { commodityId },
            select: { price: true, dateAndTime: true },
            orderBy: { dateAndTime: 'asc' },
        });
        if (priceRecords.length < 3) {
            throw new Error('At least 3 historical price records are required for forecasting');
        }
        const series = priceRecords.map((record) => Number(record.price));
        const predictedValues = (0, arima_1.forecastArima)(series, horizon);
        const baseDate = priceRecords[priceRecords.length - 1]?.dateAndTime ?? new Date();
        const forecastItems = predictedValues.map((predictedPrice, index) => ({
            commodityId,
            predictedPrice: toDecimal(predictedPrice),
            confidence: Math.min(0.99, Math.max(0.2, 0.65 + index * 0.05)),
            forecastDate: new Date(baseDate.getTime() + (index + 1) * 24 * 60 * 60 * 1000),
        }));
        await prisma_1.prisma.forecast.deleteMany({ where: { commodityId } });
        await forecast_repository_1.forecastRepository.createMany(forecastItems);
        return forecast_repository_1.forecastRepository.findByCommodityId(commodityId);
    },
};
