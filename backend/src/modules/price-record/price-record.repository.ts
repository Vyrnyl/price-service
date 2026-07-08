import { prisma } from '../../prisma';
import type { Prisma } from '@prisma/client';
import type { CreatePriceRecordInput, UpdatePriceRecordInput } from './price-record.schema';

export type CreatePriceRecordWithUserInput = CreatePriceRecordInput & {
  userId: string;
};

export const priceRecordRepository = {
  create: (data: CreatePriceRecordWithUserInput) => {
    const { commodityId, storeId, userId, ...rest } = data;

    return prisma.priceRecord.create({
      data: {
        ...rest,
        commodity: { connect: { id: commodityId } },
        store: { connect: { id: storeId } },
        user: { connect: { id: userId } },
      } as Prisma.PriceRecordCreateInput,
      include: { commodity: true, store: true, user: true },
    });
  },

  findAll: () =>
    prisma.priceRecord.findMany({
      include: { commodity: true, store: true, user: true },
    }),

  findById: (id: string) =>
    prisma.priceRecord.findUnique({
      where: { id },
      include: { commodity: true, store: true, user: true },
    }),

  update: (id: string, data: UpdatePriceRecordInput) => {
    const { commodityId, storeId, ...rest } = data;

    const updateData: Prisma.PriceRecordUpdateInput = {
      ...rest,
      ...(commodityId ? { commodity: { connect: { id: commodityId } } } : {}),
      ...(storeId ? { store: { connect: { id: storeId } } } : {}),
    };

    return prisma.priceRecord.update({
      where: { id },
      data: updateData,
      include: { commodity: true, store: true, user: true },
    });
  },

  delete: (id: string) =>
    prisma.priceRecord.delete({ where: { id } }),
};
