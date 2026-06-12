import { priceRecordRepository } from './price-record.repository';
import type { CreatePriceRecordInput, UpdatePriceRecordInput } from './price-record.schema';

export const priceRecordService = {
  createPriceRecord: (data: CreatePriceRecordInput) => priceRecordRepository.create(data),
  getPriceRecords: () => priceRecordRepository.findAll(),
  getPriceRecordById: (id: string) => priceRecordRepository.findById(id),
  updatePriceRecord: (id: string, data: UpdatePriceRecordInput) => priceRecordRepository.update(id, data),
  deletePriceRecord: (id: string) => priceRecordRepository.delete(id),
};
