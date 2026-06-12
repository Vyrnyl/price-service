import { prisma } from '../../prisma';
import type { Prisma } from '@prisma/client';
import type { CreateSrpInput, UpdateSrpInput } from './srp.schema';

export const srpRepository = {
  create: (data: CreateSrpInput) => {
    const { commodityId, ...rest } = data;

    return prisma.sRP.create({
      data: {
        ...rest,
        commodity: {
          connect: { id: commodityId },
        },
      } as Prisma.SRPCreateInput,
      include: { commodity: true },
    });
  },

  findAll: () =>
    prisma.sRP.findMany({
      include: { commodity: true },
    }),

  findById: (id: string) =>
    prisma.sRP.findUnique({
      where: { id },
      include: { commodity: true },
    }),

  update: (id: string, data: UpdateSrpInput) => {
    const { commodityId, ...rest } = data;

    const updateData: Prisma.SRPUpdateInput = {
      ...rest,
      ...(commodityId
        ? {
            commodity: {
              connect: { id: commodityId },
            },
          }
        : {}),
    };

    return prisma.sRP.update({
      where: { id },
      data: updateData,
      include: { commodity: true },
    });
  },

  delete: (id: string) =>
    prisma.sRP.delete({ where: { id } }),
};
