import { prisma } from '../../prisma';
import type { Prisma } from '@prisma/client';
import type { CreateForecastInput, UpdateForecastInput } from './forecast.schema';

export const forecastRepository = {
  create: (data: CreateForecastInput) => {
    const { commodityId, ...rest } = data;

    return prisma.forecast.create({
      data: {
        ...rest,
        commodity: { connect: { id: commodityId } },
      } as Prisma.ForecastCreateInput,
      include: { commodity: true },
    });
  },

  createMany: (items: CreateForecastInput[]) =>
    prisma.forecast.createMany({
      data: items,
    }),

  findAll: () =>
    prisma.forecast.findMany({
      include: { commodity: true },
      orderBy: { forecastDate: 'asc' },
    }),

  findById: (id: string) =>
    prisma.forecast.findUnique({
      where: { id },
      include: { commodity: true },
    }),

  findByCommodityId: (commodityId: string) =>
    prisma.forecast.findMany({
      where: { commodityId },
      include: { commodity: true },
      orderBy: { forecastDate: 'asc' },
    }),

  update: (id: string, data: UpdateForecastInput) => {
    const { commodityId, ...rest } = data;

    const updateData: Prisma.ForecastUpdateInput = {
      ...rest,
      ...(commodityId ? { commodity: { connect: { id: commodityId } } } : {}),
    };

    return prisma.forecast.update({
      where: { id },
      data: updateData,
      include: { commodity: true },
    });
  },

  delete: (id: string) =>
    prisma.forecast.delete({ where: { id } }),
};
