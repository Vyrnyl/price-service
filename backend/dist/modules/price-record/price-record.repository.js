"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceRecordRepository = void 0;
const prisma_1 = require("../../prisma");
exports.priceRecordRepository = {
    create: (data) => {
        const { commodityId, storeId, userId, ...rest } = data;
        return prisma_1.prisma.priceRecord.create({
            data: {
                ...rest,
                commodity: { connect: { id: commodityId } },
                store: { connect: { id: storeId } },
                user: { connect: { id: userId } },
            },
            include: { commodity: true, store: true, user: true },
        });
    },
    findAll: () => prisma_1.prisma.priceRecord.findMany({
        include: { commodity: true, store: true, user: true },
    }),
    findById: (id) => prisma_1.prisma.priceRecord.findUnique({
        where: { id },
        include: { commodity: true, store: true, user: true },
    }),
    update: (id, data) => {
        const { commodityId, storeId, ...rest } = data;
        const updateData = {
            ...rest,
            ...(commodityId ? { commodity: { connect: { id: commodityId } } } : {}),
            ...(storeId ? { store: { connect: { id: storeId } } } : {}),
        };
        return prisma_1.prisma.priceRecord.update({
            where: { id },
            data: updateData,
            include: { commodity: true, store: true, user: true },
        });
    },
    delete: (id) => prisma_1.prisma.priceRecord.delete({ where: { id } }),
};
