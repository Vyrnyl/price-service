import { Request, Response } from 'express';
import AppError from '../../utils/AppError';
import { storeService } from './store.service';
import { createStoreSchema, updateStoreSchema, storeIdParamSchema } from './store.schema';

export const storeController = {
  createStore: async (req: Request, res: Response) => {
    const validatedBody = createStoreSchema.parse(req.body);
    const store = await storeService.createStore(validatedBody);

    res.status(201).json({ status: 'success', data: store });
  },

  getStores: async (_req: Request, res: Response) => {
    const stores = await storeService.getStores();

    res.json({ status: 'success', data: stores });
  },

  getStoreById: async (req: Request, res: Response) => {
    const { id } = storeIdParamSchema.parse(req.params);
    const store = await storeService.getStoreById(id);

    if (!store) {
      throw new AppError('Store not found', 404);
    }

    res.json({ status: 'success', data: store });
  },

  updateStore: async (req: Request, res: Response) => {
    const { id } = storeIdParamSchema.parse(req.params);
    const validatedBody = updateStoreSchema.parse(req.body);
    const store = await storeService.updateStore(id, validatedBody);

    if (!store) {
      throw new AppError('Store not found', 404);
    }

    res.json({ status: 'success', data: store });
  },

  deleteStore: async (req: Request, res: Response) => {
    const { id } = storeIdParamSchema.parse(req.params);

    await storeService.deleteStore(id);

    res.status(204).send();
  },
};
