"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeIdParamSchema = exports.updateStoreSchema = exports.createStoreSchema = void 0;
const zod_1 = require("zod");
exports.createStoreSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    location: zod_1.z.string().min(1, 'Location is required'),
    latitude: zod_1.z.coerce.number().optional().nullable(),
    longitude: zod_1.z.coerce.number().optional().nullable(),
});
exports.updateStoreSchema = exports.createStoreSchema.partial();
exports.storeIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid store ID'),
});
