import { storeRepository } from './store.repository';
import type { CreateStoreInput, UpdateStoreInput } from './store.schema';

export const storeService = {
  createStore: (data: CreateStoreInput) => storeRepository.create(data),
  getStores: () => storeRepository.findAll(),
  getStoreById: (id: string) => storeRepository.findById(id),
  updateStore: (id: string, data: UpdateStoreInput) => storeRepository.update(id, data),
  deleteStore: (id: string) => storeRepository.delete(id),
};
