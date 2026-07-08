"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRepository = void 0;
const prisma_1 = require("../../prisma");
exports.storeRepository = {
    create: (data, userId) => prisma_1.prisma.store.create({ data: { ...data, userId } }),
    findAll: (userId) => prisma_1.prisma.store.findMany({
        where: userId ? { userId } : undefined,
        include: { user: true },
    }),
    findById: (id) => prisma_1.prisma.store.findUnique({ where: { id }, include: { user: true } }),
    update: (id, data) => prisma_1.prisma.store.update({ where: { id }, data }),
    delete: (id) => prisma_1.prisma.store.delete({ where: { id } }),
};
