import { z } from 'zod';

export const createCommoditySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  unit: z.string().min(1, 'Unit is required'),
  category: z.string().min(1, 'Category is required'),
});

export const updateCommoditySchema = createCommoditySchema.partial();

export const commodityIdParamSchema = z.object({
  id: z.string().uuid('Invalid commodity ID'),
});

export type CreateCommodityInput = z.infer<typeof createCommoditySchema>;
export type UpdateCommodityInput = z.infer<typeof updateCommoditySchema>;
