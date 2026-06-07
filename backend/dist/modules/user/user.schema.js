"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdParamSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    role: zod_1.z.enum(['ADMIN', 'OFFICER', 'PUBLIC']).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateUserSchema = exports.createUserSchema.partial();
exports.userIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid user ID'),
});
