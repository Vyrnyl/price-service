"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commodityIdParamSchema = exports.updateCommoditySchema = exports.createCommoditySchema = exports.commodityStatusEnum = void 0;
const zod_1 = require("zod");
exports.commodityStatusEnum = zod_1.z.enum(['Active', 'Inactive']);
exports.createCommoditySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    status: exports.commodityStatusEnum,
    category: zod_1.z.string().min(1, 'Category is required'),
});
exports.updateCommoditySchema = exports.createCommoditySchema.partial();
exports.commodityIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid commodity ID'),
});
