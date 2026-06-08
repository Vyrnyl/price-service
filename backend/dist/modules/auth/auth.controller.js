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
            data: result,
            message: 'Login successful',
        });
    }),
};
