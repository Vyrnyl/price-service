"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const prisma_1 = require("../../prisma");
exports.userRepository = {
    create: (data) => prisma_1.prisma.user.create({ data }),
    findAll: () => prisma_1.prisma.user.findMany(),
    findByEmail: (email) => prisma_1.prisma.user.findUnique({ where: { email } }),
    findById: (id) => prisma_1.prisma.user.findUnique({ where: { id } }),
    update: (id, data) => prisma_1.prisma.user.update({ where: { id }, data }),
    delete: (id) => prisma_1.prisma.user.delete({ where: { id } }),
};
