"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastIdParamSchema = exports.updateForecastSchema = exports.createForecastSchema = void 0;
const zod_1 = require("zod");
exports.createForecastSchema = zod_1.z.object({
    commodityId: zod_1.z.string().uuid('Invalid commodity ID'),
    predictedPrice: zod_1.z.coerce.number().positive('Predicted price must be greater than 0'),
    confidence: zod_1.z.coerce.number().min(0, 'Confidence must be at least 0').max(1, 'Confidence cannot exceed 1'),
    forecastDate: zod_1.z.coerce.date(),
});
exports.updateForecastSchema = exports.createForecastSchema.partial();
exports.forecastIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid forecast ID'),
});
