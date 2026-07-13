import { z } from 'zod';

export const createForecastSchema = z.object({
  commodityId: z.string().uuid('Invalid commodity ID'),
  predictedPrice: z.coerce.number().positive('Predicted price must be greater than 0'),
  confidence: z.coerce.number().min(0, 'Confidence must be at least 0').max(1, 'Confidence cannot exceed 1'),
  forecastDate: z.coerce.date(),
});

export const generateForecastSchema = z.object({
  commodityId: z.string().uuid('Invalid commodity ID'),
  horizon: z.coerce.number().int().min(1).max(12).default(3),
});

export const updateForecastSchema = createForecastSchema.partial();

export const forecastIdParamSchema = z.object({
  id: z.string().uuid('Invalid forecast ID'),
});

export type CreateForecastInput = z.infer<typeof createForecastSchema>;
export type UpdateForecastInput = z.infer<typeof updateForecastSchema>;
export type GenerateForecastInput = z.infer<typeof generateForecastSchema>;
