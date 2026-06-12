import { z } from 'zod';

export const createSrpSchema = z.object({
  commodityId: z.string().uuid('Invalid commodity ID'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  effectiveDate: z.coerce.date(),
});

export const updateSrpSchema = createSrpSchema.partial();

export const srpIdParamSchema = z.object({
  id: z.string().uuid('Invalid SRP ID'),
});

export type CreateSrpInput = z.infer<typeof createSrpSchema>;
export type UpdateSrpInput = z.infer<typeof updateSrpSchema>;
