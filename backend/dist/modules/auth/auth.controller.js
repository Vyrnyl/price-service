"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_service_1 = require("./auth.service");
const auth_schema_1 = require("./auth.schema");
exports.authController = {
    login: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const validatedBody = auth_schema_1.loginSchema.parse(req.body);
        const result = await auth_service_1.authService.login(validatedBody);
        return res.status(200).json({
            success: true,
            data: {
                accessToken: result.accessToken,
                user: result.user,
            },
            message: "Login successful",
        });
    }),
    me: (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const authUser = req.user;
        if (!authUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                id: authUser.userId,
                email: authUser.email,
                role: authUser.role,
            },
            message: "Authenticated user fetched",
        });
    }),
    logout: (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }),
};
