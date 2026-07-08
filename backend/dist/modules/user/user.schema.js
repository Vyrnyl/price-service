"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdParamSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: zod_1.z.string().min(8, "Confirm password must be at least 8 characters"),
    role: zod_1.z.enum(["ADMIN", "OFFICER", "PUBLIC"]).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.createUserSchema = userSchema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
const updateUserBaseSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(8).optional(),
    confirmPassword: zod_1.z.string().min(8).optional(),
    role: zod_1.z.enum(["ADMIN", "OFFICER", "PUBLIC"]).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateUserSchema = updateUserBaseSchema.refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
exports.userIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid user ID'),
});
