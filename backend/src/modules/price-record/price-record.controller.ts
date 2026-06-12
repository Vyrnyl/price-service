import { Request, Response } from 'express';
import AppError from '../../utils/AppError';
import { priceRecordService } from './price-record.service';
import { createPriceRecordSchema, updatePriceRecordSchema, priceRecordIdParamSchema } from './price-record.schema';

export const priceRecordController = {
  createPriceRecord: async (req: Request, res: Response) => {
    const validatedBody = createPriceRecordSchema.parse(req.body);
    const priceRecord = await priceRecordService.createPriceRecord(validatedBody);

    res.status(201).json({ status: 'success', data: priceRecord });
  },

  getPriceRecords: async (_req: Request, res: Response) => {
    const priceRecords = await priceRecordService.getPriceRecords();

    res.json({ status: 'success', data: priceRecords });
  },

  getPriceRecordById: async (req: Request, res: Response) => {
    const { id } = priceRecordIdParamSchema.parse(req.params);
    const priceRecord = await priceRecordService.getPriceRecordById(id);

    if (!priceRecord) {
      throw new AppError('Price record not found', 404);
    }

    res.json({ status: 'success', data: priceRecord });
  },

  updatePriceRecord: async (req: Request, res: Response) => {
    const { id } = priceRecordIdParamSchema.parse(req.params);
    const validatedBody = updatePriceRecordSchema.parse(req.body);
    const priceRecord = await priceRecordService.updatePriceRecord(id, validatedBody);

    if (!priceRecord) {
      throw new AppError('Price record not found', 404);
    }

    res.json({ status: 'success', data: priceRecord });
  },

  deletePriceRecord: async (req: Request, res: Response) => {
    const { id } = priceRecordIdParamSchema.parse(req.params);

    await priceRecordService.deletePriceRecord(id);

    res.status(204).send();
  },
};
