import { forecastRepository } from './forecast.repository';
import type { CreateForecastInput, UpdateForecastInput } from './forecast.schema';

export const forecastService = {
  createForecast: (data: CreateForecastInput) => forecastRepository.create(data),
  getForecasts: () => forecastRepository.findAll(),
  getForecastById: (id: string) => forecastRepository.findById(id),
  updateForecast: (id: string, data: UpdateForecastInput) => forecastRepository.update(id, data),
  deleteForecast: (id: string) => forecastRepository.delete(id),
};
