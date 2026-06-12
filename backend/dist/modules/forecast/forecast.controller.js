"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastController = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const forecast_service_1 = require("./forecast.service");
const forecast_schema_1 = require("./forecast.schema");
exports.forecastController = {
    createForecast: async (req, res) => {
        const validatedBody = forecast_schema_1.createForecastSchema.parse(req.body);
        const forecast = await forecast_service_1.forecastService.createForecast(validatedBody);
        res.status(201).json({ status: 'success', data: forecast });
    },
    getForecasts: async (_req, res) => {
        const forecasts = await forecast_service_1.forecastService.getForecasts();
        res.json({ status: 'success', data: forecasts });
    },
    getForecastById: async (req, res) => {
        const { id } = forecast_schema_1.forecastIdParamSchema.parse(req.params);
        const forecast = await forecast_service_1.forecastService.getForecastById(id);
        if (!forecast) {
            throw new AppError_1.default('Forecast not found', 404);
        }
        res.json({ status: 'success', data: forecast });
    },
    updateForecast: async (req, res) => {
        const { id } = forecast_schema_1.forecastIdParamSchema.parse(req.params);
        const validatedBody = forecast_schema_1.updateForecastSchema.parse(req.body);
        const forecast = await forecast_service_1.forecastService.updateForecast(id, validatedBody);
        if (!forecast) {
            throw new AppError_1.default('Forecast not found', 404);
        }
        res.json({ status: 'success', data: forecast });
    },
    deleteForecast: async (req, res) => {
        const { id } = forecast_schema_1.forecastIdParamSchema.parse(req.params);
        await forecast_service_1.forecastService.deleteForecast(id);
        res.status(204).send();
    },
};
