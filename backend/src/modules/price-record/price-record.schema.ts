import { z } from 'zod';

const priceStatusEnum = z.enum(['COMPLIANT', 'OVERPRICE', 'UNDERPRICE']);

export const createPriceRecordSchema = z.object({
  commodityId: z.string().uuid('Invalid commodity ID'),
  storeId: z.string().uuid('Invalid store ID'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  dateAndTime: z.coerce.date(),
  status: priceStatusEnum,
});

export const updatePriceRecordSchema = createPriceRecordSchema.partial();

export const priceRecordIdParamSchema = z.object({
  id: z.string().uuid('Invalid PriceRecord ID'),
});

export type CreatePriceRecordInput = z.infer<typeof createPriceRecordSchema>;
export type UpdatePriceRecordInput = z.infer<typeof updatePriceRecordSchema>;
