import { prisma } from '../../prisma';
import { forecastRepository } from './forecast.repository';
import { forecastArima } from './arima';
import type { CreateForecastInput, UpdateForecastInput, GenerateForecastInput } from './forecast.schema';

function toDecimal(value: number) {
  return Number(value.toFixed(4));
}

export const forecastService = {
  createForecast: (data: CreateForecastInput) => forecastRepository.create(data),
  getForecasts: () => forecastRepository.findAll(),
  getForecastById: (id: string) => forecastRepository.findById(id),
  updateForecast: (id: string, data: UpdateForecastInput) => forecastRepository.update(id, data),
  deleteForecast: (id: string) => forecastRepository.delete(id),

  generateForecast: async ({ commodityId, horizon }: GenerateForecastInput) => {
    const priceRecords = await prisma.priceRecord.findMany({
      where: { commodityId },
      select: { price: true, dateAndTime: true },
      orderBy: { dateAndTime: 'asc' },
    });

    if (priceRecords.length < 3) {
      throw new Error('At least 3 historical price records are required for forecasting');
    }

    const series = priceRecords.map((record) => Number(record.price));
    const predictedValues = forecastArima(series, horizon);
    const baseDate = priceRecords[priceRecords.length - 1]?.dateAndTime ?? new Date();

    const forecastItems: CreateForecastInput[] = predictedValues.map((predictedPrice, index) => ({
      commodityId,
      predictedPrice: toDecimal(predictedPrice),
      confidence: Math.min(0.99, Math.max(0.2, 0.65 + index * 0.05)),
      forecastDate: new Date(baseDate.getTime() + (index + 1) * 24 * 60 * 60 * 1000),
    }));

    await prisma.forecast.deleteMany({ where: { commodityId } });
    await forecastRepository.createMany(forecastItems);

    return forecastRepository.findByCommodityId(commodityId);
  },
};
