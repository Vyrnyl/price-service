"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_repository_1 = require("../user/user.repository");
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET must be defined in environment variables');
}
exports.authService = {
    login: async (input) => {
        const user = await user_repository_1.userRepository.findByEmail(input.email);
        if (!user || !user.password) {
            throw new AppError_1.default('Invalid email or password', 401);
        }
        const passwordMatches = await bcryptjs_1.default.compare(input.password, user.password);
        if (!passwordMatches) {
            throw new AppError_1.default('Invalid email or password', 401);
        }
        if (!user.isActive) {
            throw new AppError_1.default('Account is inactive', 403);
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
            role: user.role,
        }, jwtSecret, { expiresIn: '1h' });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            },
            token,
        };
    },
};
