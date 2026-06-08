"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commodityIdParamSchema = exports.updateCommoditySchema = exports.createCommoditySchema = void 0;
const zod_1 = require("zod");
exports.createCommoditySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    unit: zod_1.z.string().min(1, 'Unit is required'),
    category: zod_1.z.string().min(1, 'Category is required'),
});
exports.updateCommoditySchema = exports.createCommoditySchema.partial();
exports.commodityIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid commodity ID'),
});
