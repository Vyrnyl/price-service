import { commodityRepository } from './commodity.repository';
import type { CreateCommodityInput, UpdateCommodityInput } from './commodity.schema';

export const commodityService = {
  createCommodity: (data: CreateCommodityInput) => commodityRepository.create(data),
  getCommodities: () => commodityRepository.findAll(),
  getCommodityById: (id: string) => commodityRepository.findById(id),
  updateCommodity: (id: string, data: UpdateCommodityInput) => commodityRepository.update(id, data),
  deleteCommodity: (id: string) => commodityRepository.delete(id),
};
