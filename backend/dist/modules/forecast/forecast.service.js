"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastService = void 0;
exports.buildForecastItems = buildForecastItems;
const prisma_1 = require("../../prisma");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const forecast_repository_1 = require("./forecast.repository");
const arima_1 = require("./arima");
function toDecimal(value) {
    return Number(value.toFixed(4));
}
function calculateConfidence(series, horizon, index) {
    const values = series.filter((value) => Number.isFinite(value) && value > 0);
    if (values.length < 3) {
        return 0.2;
    }
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
    const volatility = Math.sqrt(variance) / Math.max(mean, 1);
    const dataSupport = Math.min(0.25, values.length / 100);
    const horizonPenalty = Math.min(0.15, (index + 1) * 0.03);
    const stabilityScore = Math.max(0.2, 0.9 - volatility * 1.2 - horizonPenalty + dataSupport);
    return Number(Math.min(0.99, Math.max(0.2, stabilityScore)).toFixed(2));
}
function buildForecastItems({ commodityId, predictedPrices, baseDate, series, horizon, }) {
    return predictedPrices.map((predictedPrice, index) => ({
        commodityId,
        predictedPrice: toDecimal(predictedPrice),
        confidence: calculateConfidence(series, horizon, index),
        forecastDate: new Date(baseDate.getTime() + (index + 1) * 24 * 60 * 60 * 1000),
    }));
}
exports.forecastService = {
    createForecast: (data) => forecast_repository_1.forecastRepository.create(data),
    getForecasts: () => forecast_repository_1.forecastRepository.findAll(),
    getForecastById: (id) => forecast_repository_1.forecastRepository.findById(id),
    getForecastsByCommodityId: (commodityId) => forecast_repository_1.forecastRepository.findByCommodityId(commodityId),
    updateForecast: (id, data) => forecast_repository_1.forecastRepository.update(id, data),
    deleteForecast: (id) => forecast_repository_1.forecastRepository.delete(id),
    generateForecast: async ({ commodityId, horizon }) => {
        const priceRecords = await prisma_1.prisma.priceRecord.findMany({
            where: { commodityId },
            select: { price: true, dateAndTime: true },
            orderBy: { dateAndTime: 'asc' },
        });
        if (priceRecords.length < 3) {
            throw new AppError_1.default('At least 3 historical price records are required for forecasting', 400);
        }
        const series = priceRecords.map((record) => Number(record.price));
        const predictedValues = (0, arima_1.forecastArima)(series, horizon);
        const baseDate = priceRecords[priceRecords.length - 1]?.dateAndTime ?? new Date();
        const forecastItems = buildForecastItems({
            commodityId,
            predictedPrices: predictedValues,
            baseDate,
            series,
            horizon,
        });
        await prisma_1.prisma.forecast.deleteMany({ where: { commodityId } });
        await forecast_repository_1.forecastRepository.createMany(forecastItems);
        console.log('deleted old forecasts and created new forecasts for commodityId:', commodityId);
        return forecast_repository_1.forecastRepository.findByCommodityId(commodityId);
    },
};
