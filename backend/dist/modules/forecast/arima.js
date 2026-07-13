"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastArima = forecastArima;
const arima_1 = __importDefault(require("arima"));
function getTrend(series) {
    if (series.length < 2) {
        return 0.01;
    }
    const changes = series.slice(1).map((value, index) => value - series[index]);
    const averageChange = changes.reduce((sum, value) => sum + value, 0) / changes.length;
    return Number.isFinite(averageChange) && averageChange !== 0 ? averageChange : 0.01;
}
function forecastArima(series, horizon = 3) {
    const cleanedSeries = series.filter((value) => Number.isFinite(value) && value > 0);
    if (cleanedSeries.length < 3) {
        throw new Error('At least 3 positive observations are required for forecasting');
    }
    if (cleanedSeries.length < 8) {
        const lastValue = cleanedSeries[cleanedSeries.length - 1];
        const trend = getTrend(cleanedSeries);
        return Array.from({ length: horizon }, (_, index) => {
            const nextValue = lastValue + trend * (index + 1);
            return Number(Math.max(0.01, nextValue).toFixed(2));
        });
    }
    try {
        const model = new arima_1.default({ p: 1, d: 0, q: 0, auto: false, verbose: false });
        model.train(cleanedSeries);
        const [predictedValues] = model.predict(horizon);
        if (Array.isArray(predictedValues) && predictedValues.length === horizon && predictedValues.every((value) => Number.isFinite(value) && value > 0)) {
            return predictedValues.map((value) => Number(value.toFixed(2)));
        }
    }
    catch {
        // Fall back to a simple trend-based forecast when the ARIMA model cannot be fitted.
    }
    const lastValue = cleanedSeries[cleanedSeries.length - 1];
    const trend = getTrend(cleanedSeries);
    return Array.from({ length: horizon }, (_, index) => {
        const nextValue = lastValue + trend * (index + 1);
        return Number(Math.max(0.01, nextValue).toFixed(2));
    });
}
