"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordUtils = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = 10;
exports.passwordUtils = {
    /**
     * Hash a password
     * @param password - The plain text password to hash
     * @returns Promise<string> - The hashed password
     */
    hashPassword: async (password) => {
        return bcryptjs_1.default.hash(password, SALT_ROUNDS);
    },
    /**
     * Compare a plain text password with a hashed password
     * @param password - The plain text password to compare
     * @param hashedPassword - The hashed password to compare against
     * @returns Promise<boolean> - True if passwords match, false otherwise
     */
    comparePassword: async (password, hashedPassword) => {
        return bcryptjs_1.default.compare(password, hashedPassword);
    },
};
