"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRepository = void 0;
const prisma_1 = require("../../prisma");
exports.storeRepository = {
    create: (data) => prisma_1.prisma.store.create({ data }),
    findAll: () => prisma_1.prisma.store.findMany(),
    findById: (id) => prisma_1.prisma.store.findUnique({ where: { id } }),
    update: (id, data) => prisma_1.prisma.store.update({ where: { id }, data }),
    delete: (id) => prisma_1.prisma.store.delete({ where: { id } }),
};
