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
        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        return res.status(200).json({
            success: true,
            data: result.user,
            message: "Login successful",
        });
    }),
    logout: (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }),
};
