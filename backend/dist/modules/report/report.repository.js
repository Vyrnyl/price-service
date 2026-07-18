"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRepository = void 0;
const prisma_1 = require("../../prisma");
const report_scope_1 = require("./report.scope");
exports.reportRepository = {
    create: (data, userId) => {
        const { format, commodityGroup, storeId, ...rest } = data;
        return prisma_1.prisma.report.create({
            data: {
                ...rest,
                user: { connect: { id: userId } },
            },
            include: { user: true },
        });
    },
    findAll: (authUser) => {
        const scope = (0, report_scope_1.resolveReportScope)(authUser);
        return prisma_1.prisma.report.findMany({
            where: scope,
            include: { user: true },
        });
    },
    findById: (id) => prisma_1.prisma.report.findUnique({
        where: { id },
        include: { user: true },
    }),
    deleteAll: (authUser) => {
        const scope = (0, report_scope_1.resolveReportScope)(authUser);
        return prisma_1.prisma.report.deleteMany({ where: scope });
    },
    update: (id, data) => {
        const { format, commodityGroup, storeId, ...rest } = data;
        const updateData = {
            ...rest,
        };
        return prisma_1.prisma.report.update({
            where: { id },
            data: updateData,
            include: { user: true },
        });
    },
    delete: (id) => prisma_1.prisma.report.delete({ where: { id } }),
};
