"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.srpIdParamSchema = exports.updateSrpSchema = exports.createSrpSchema = void 0;
const zod_1 = require("zod");
exports.createSrpSchema = zod_1.z.object({
    commodityId: zod_1.z.string().uuid('Invalid commodity ID'),
    price: zod_1.z.coerce.number().positive('Price must be greater than 0'),
    effectiveDate: zod_1.z.coerce.date(),
});
exports.updateSrpSchema = exports.createSrpSchema.partial();
exports.srpIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid SRP ID'),
});
