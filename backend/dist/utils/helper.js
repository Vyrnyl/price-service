"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOrThrow = void 0;
const AppError_1 = __importDefault(require("./AppError"));
const parseOrThrow = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new AppError_1.default(result.error.message, 400);
    }
    return result.data;
};
exports.parseOrThrow = parseOrThrow;
