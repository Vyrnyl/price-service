"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.srpRepository = void 0;
const prisma_1 = require("../../prisma");
exports.srpRepository = {
    create: (data) => {
        const { commodityId, ...rest } = data;
        return prisma_1.prisma.sRP.create({
            data: {
                ...rest,
                commodity: {
                    connect: { id: commodityId },
                },
            },
            include: { commodity: true },
        });
    },
    findAll: () => prisma_1.prisma.sRP.findMany({
        include: { commodity: true },
    }),
    findById: (id) => prisma_1.prisma.sRP.findUnique({
        where: { id },
        include: { commodity: true },
    }),
    update: (id, data) => {
        const { commodityId, ...rest } = data;
        const updateData = {
            ...rest,
            ...(commodityId
                ? {
                    commodity: {
                        connect: { id: commodityId },
                    },
                }
                : {}),
        };
        return prisma_1.prisma.sRP.update({
            where: { id },
            data: updateData,
            include: { commodity: true },
        });
    },
    delete: (id) => prisma_1.prisma.sRP.delete({ where: { id } }),
};
