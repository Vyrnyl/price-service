import { prisma } from '../../prisma';
import type { CreateStoreInput, UpdateStoreInput } from './store.schema';

export const storeRepository = {
  create: (data: CreateStoreInput) =>
    prisma.store.create({ data }),

  findAll: () =>
    prisma.store.findMany(),

  findById: (id: string) =>
    prisma.store.findUnique({ where: { id } }),

  update: (id: string, data: UpdateStoreInput) =>
    prisma.store.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.store.delete({ where: { id } }),
};
