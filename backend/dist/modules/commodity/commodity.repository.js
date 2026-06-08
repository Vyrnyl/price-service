"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commodityRepository = void 0;
const prisma_1 = require("../../prisma");
exports.commodityRepository = {
    create: (data) => prisma_1.prisma.commodity.create({ data }),
    findAll: () => prisma_1.prisma.commodity.findMany(),
    findById: (id) => prisma_1.prisma.commodity.findUnique({ where: { id } }),
    update: (id, data) => prisma_1.prisma.commodity.update({ where: { id }, data }),
    delete: (id) => prisma_1.prisma.commodity.delete({ where: { id } }),
};
