import { prisma } from '../../prisma';
import type { Prisma } from '@prisma/client';
import type { CreateCommodityInput, UpdateCommodityInput } from './commodity.schema';

export const commodityRepository = {
  create: (data: CreateCommodityInput) =>
    prisma.commodity.create({ data }),

  findAll: () =>
    prisma.commodity.findMany(),

  findById: (id: string) =>
    prisma.commodity.findUnique({ where: { id } }),

  update: (id: string, data: UpdateCommodityInput) =>
    prisma.commodity.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.commodity.delete({ where: { id } }),
};
