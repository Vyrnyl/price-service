"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const public_controller_1 = require("./public.controller");
const router = (0, express_1.Router)();
router.get('/commodities', (0, asyncHandler_1.asyncHandler)(public_controller_1.publicController.getPublicCommodities));
exports.default = router;
