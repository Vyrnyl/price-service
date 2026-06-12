"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.srpController = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const srp_service_1 = require("./srp.service");
const srp_schema_1 = require("./srp.schema");
exports.srpController = {
    createSrp: async (req, res) => {
        const validatedBody = srp_schema_1.createSrpSchema.parse(req.body);
        const srp = await srp_service_1.srpService.createSrp(validatedBody);
        res.status(201).json({ status: 'success', data: srp });
    },
    getSrps: async (_req, res) => {
        const srps = await srp_service_1.srpService.getSrps();
        res.json({ status: 'success', data: srps });
    },
    getSrpById: async (req, res) => {
        const { id } = srp_schema_1.srpIdParamSchema.parse(req.params);
        const srp = await srp_service_1.srpService.getSrpById(id);
        if (!srp) {
            throw new AppError_1.default('SRP not found', 404);
        }
        res.json({ status: 'success', data: srp });
    },
    updateSrp: async (req, res) => {
        const { id } = srp_schema_1.srpIdParamSchema.parse(req.params);
        const validatedBody = srp_schema_1.updateSrpSchema.parse(req.body);
        const srp = await srp_service_1.srpService.updateSrp(id, validatedBody);
        if (!srp) {
            throw new AppError_1.default('SRP not found', 404);
        }
        res.json({ status: 'success', data: srp });
    },
    deleteSrp: async (req, res) => {
        const { id } = srp_schema_1.srpIdParamSchema.parse(req.params);
        await srp_service_1.srpService.deleteSrp(id);
        res.status(204).send();
    },
};
