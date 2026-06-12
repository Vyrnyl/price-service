import { prisma } from '../../prisma';
import type { Prisma } from '@prisma/client';
import type { CreateReportInput, UpdateReportInput } from './report.schema';

export const reportRepository = {
  create: (data: CreateReportInput) => {
    const { generatedBy, ...rest } = data;

    return prisma.report.create({
      data: {
        ...rest,
        user: { connect: { id: generatedBy } },
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

  update: (id: string, data: UpdateReportInput) => {
    const { generatedBy, ...rest } = data;

    const updateData: Prisma.ReportUpdateInput = {
      ...rest,
      ...(generatedBy ? { user: { connect: { id: generatedBy } } } : {}),
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
