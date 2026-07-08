"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportIdParamSchema = exports.updateReportSchema = exports.createReportSchema = void 0;
const zod_1 = require("zod");
const reportTypeEnum = zod_1.z.enum(['MONTHLY', 'SRP_COMPLIANCE', 'TREND']);
exports.createReportSchema = zod_1.z.object({
    type: reportTypeEnum,
    generatedBy: zod_1.z.string().uuid('Invalid user ID'),
    period: zod_1.z.string().min(1, 'Period is required'),
    fileUrl: zod_1.z.string().min(1, 'URL is required'),
});
exports.updateReportSchema = exports.createReportSchema.partial();
exports.reportIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid report ID'),
});
