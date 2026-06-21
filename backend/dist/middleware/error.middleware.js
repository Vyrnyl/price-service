"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../utils/AppError"));
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: err.issues,
        });
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        const target = Array.isArray(err.meta?.target)
            ? err.meta.target.join(', ')
            : 'field';
        return res.status(409).json({
            success: false,
            message: `${target} already exists`,
        });
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        return res.status(404).json({
            success: false,
            message: 'Resource not found',
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
