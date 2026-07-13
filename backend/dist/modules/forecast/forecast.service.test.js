"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const forecast_service_1 = require("./forecast.service");
(0, node_test_1.default)('buildForecastItems creates dated forecast entries for the requested horizon', () => {
    const commodityId = '11111111-1111-1111-1111-111111111111';
    const baseDate = new Date('2026-07-13T00:00:00.000Z');
    const items = (0, forecast_service_1.buildForecastItems)({
        commodityId,
        predictedPrices: [12.34, 12.56, 12.78],
        baseDate,
        series: [10.2, 10.8, 11.3, 11.7],
        horizon: 3,
    });
    strict_1.default.equal(items.length, 3);
    strict_1.default.equal(items[0].commodityId, commodityId);
    strict_1.default.equal(items[0].predictedPrice, 12.34);
    strict_1.default.ok(items[1].forecastDate.getTime() > items[0].forecastDate.getTime());
    strict_1.default.ok(items[0].confidence >= 0 && items[0].confidence <= 1);
});
