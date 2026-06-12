import { z } from 'zod';

export const createStoreSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
});

export const updateStoreSchema = createStoreSchema.partial();

export const storeIdParamSchema = z.object({
  id: z.string().uuid('Invalid store ID'),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
