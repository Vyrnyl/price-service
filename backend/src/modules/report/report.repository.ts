import { prisma } from '../../prisma';
import type { Prisma } from '@prisma/client';
import type { CreateReportInput, UpdateReportInput } from './report.schema';

export const reportRepository = {
  create: (data: CreateReportInput, userId: string) => {
    const { format, commodityGroup, storeId, ...rest } = data;

    return prisma.report.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
      } as Prisma.ReportCreateInput,
      include: { user: true },
    });
  },

  findAll: () =>
    prisma.report.findMany({
      include: { user: true },
    }),

  findById: (id: string) =>
    prisma.report.findUnique({
      where: { id },
      include: { user: true },
    }),

  deleteAll: () => prisma.report.deleteMany(),

  update: (id: string, data: UpdateReportInput) => {
    const { format, commodityGroup, storeId, ...rest } = data;
    const updateData: Prisma.ReportUpdateInput = {
      ...rest,
    };

    return prisma.report.update({
      where: { id },
      data: updateData,
      include: { user: true },
    });
  },

  delete: (id: string) =>
    prisma.report.delete({ where: { id } }),
};
