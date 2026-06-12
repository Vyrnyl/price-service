"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastService = void 0;
const forecast_repository_1 = require("./forecast.repository");
exports.forecastService = {
    createForecast: (data) => forecast_repository_1.forecastRepository.create(data),
    getForecasts: () => forecast_repository_1.forecastRepository.findAll(),
    getForecastById: (id) => forecast_repository_1.forecastRepository.findById(id),
    updateForecast: (id, data) => forecast_repository_1.forecastRepository.update(id, data),
    deleteForecast: (id) => forecast_repository_1.forecastRepository.delete(id),
};
