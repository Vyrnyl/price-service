"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const arima_1 = require("./arima");
(0, node_test_1.default)('forecastArima produces increasing future values for an upward trend', () => {
    const series = [10, 12, 13, 15, 16, 18];
    const forecast = (0, arima_1.forecastArima)(series, 3);
    strict_1.default.equal(forecast.length, 3);
    strict_1.default.ok(forecast[0] > series[series.length - 1]);
    strict_1.default.ok(forecast[2] > forecast[0]);
    strict_1.default.ok(forecast.every((value) => Number.isFinite(value) && value > 0));
});
