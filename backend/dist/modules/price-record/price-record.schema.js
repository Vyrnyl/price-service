"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceRecordIdParamSchema = exports.updatePriceRecordSchema = exports.createPriceRecordSchema = void 0;
const zod_1 = require("zod");
const priceStatusEnum = zod_1.z.enum(['COMPLIANT', 'OVERPRICE', 'UNDERPRICE']);
exports.createPriceRecordSchema = zod_1.z.object({
    commodityId: zod_1.z.string().uuid('Invalid commodity ID'),
    storeId: zod_1.z.string().uuid('Invalid store ID'),
    price: zod_1.z.coerce.number().positive('Price must be greater than 0'),
    dateAndTime: zod_1.z.coerce.date(),
    status: priceStatusEnum.optional(),
});
exports.updatePriceRecordSchema = exports.createPriceRecordSchema.partial();
exports.priceRecordIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid PriceRecord ID'),
});
