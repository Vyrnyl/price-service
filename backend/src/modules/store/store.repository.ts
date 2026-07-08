import { prisma } from '../../prisma';
import type { CreateStoreInput, UpdateStoreInput } from './store.schema';

export const storeRepository = {
  create: (data: CreateStoreInput, userId: string) =>
    prisma.store.create({
      data: { ...data, userId },
      include: { user: true },
    }),

  findAll: (userId?: string) =>
    prisma.store.findMany({
      where: userId ? { userId } : undefined,
      include: { user: true },
    }),

  findById: (id: string) =>
    prisma.store.findUnique({ where: { id }, include: { user: true } }),

  update: (id: string, data: UpdateStoreInput) =>
    prisma.store.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.store.delete({ where: { id } }),
};
