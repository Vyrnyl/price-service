"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportIdParamSchema = exports.updateReportSchema = exports.createReportSchema = void 0;
const zod_1 = require("zod");
const reportTypeEnum = zod_1.z.enum(['MONTHLY', 'SRP_COMPLIANCE', 'TREND']);
const reportFormatEnum = zod_1.z.enum(['PDF', 'EXCEL']);
exports.createReportSchema = zod_1.z.object({
    type: reportTypeEnum,
    period: zod_1.z.string().min(1, 'Period is required'),
    format: reportFormatEnum,
    commodityGroup: zod_1.z.string().optional(),
});
exports.updateReportSchema = zod_1.z.object({
    type: reportTypeEnum.optional(),
    period: zod_1.z.string().min(1, 'Period is required').optional(),
    fileUrl: zod_1.z.string().min(1, 'URL is required').optional(),
    format: reportFormatEnum.optional(),
    commodityGroup: zod_1.z.string().optional(),
});
exports.reportIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid report ID'),
});
