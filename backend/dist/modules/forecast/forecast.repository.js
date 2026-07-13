"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastRepository = void 0;
const prisma_1 = require("../../prisma");
exports.forecastRepository = {
    create: (data) => {
        const { commodityId, ...rest } = data;
        return prisma_1.prisma.forecast.create({
            data: {
                ...rest,
                commodity: { connect: { id: commodityId } },
            },
            include: { commodity: true },
        });
    },
    createMany: (items) => prisma_1.prisma.forecast.createMany({
        data: items,
    }),
    findAll: () => prisma_1.prisma.forecast.findMany({
        include: { commodity: true },
        orderBy: { forecastDate: 'asc' },
    }),
    findById: (id) => prisma_1.prisma.forecast.findUnique({
        where: { id },
        include: { commodity: true },
    }),
    findByCommodityId: (commodityId) => prisma_1.prisma.forecast.findMany({
        where: { commodityId },
        include: { commodity: true },
        orderBy: { forecastDate: 'asc' },
    }),
    update: (id, data) => {
        const { commodityId, ...rest } = data;
        const updateData = {
            ...rest,
            ...(commodityId ? { commodity: { connect: { id: commodityId } } } : {}),
        };
        return prisma_1.prisma.forecast.update({
            where: { id },
            data: updateData,
            include: { commodity: true },
        });
    },
    delete: (id) => prisma_1.prisma.forecast.delete({ where: { id } }),
};
