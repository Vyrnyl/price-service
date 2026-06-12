"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRepository = void 0;
const prisma_1 = require("../../prisma");
exports.reportRepository = {
    create: (data) => {
        const { generatedBy, ...rest } = data;
        return prisma_1.prisma.report.create({
            data: {
                ...rest,
                user: { connect: { id: generatedBy } },
            },
            include: { user: true },
        });
    },
    findAll: () => prisma_1.prisma.report.findMany({
        include: { user: true },
    }),
    findById: (id) => prisma_1.prisma.report.findUnique({
        where: { id },
        include: { user: true },
    }),
    update: (id, data) => {
        const { generatedBy, ...rest } = data;
        const updateData = {
            ...rest,
            ...(generatedBy ? { user: { connect: { id: generatedBy } } } : {}),
        };
        return prisma_1.prisma.report.update({
            where: { id },
            data: updateData,
            include: { user: true },
        });
    },
    delete: (id) => prisma_1.prisma.report.delete({ where: { id } }),
};
