"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commodityController = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const commodity_service_1 = require("./commodity.service");
const commodity_schema_1 = require("./commodity.schema");
exports.commodityController = {
    createCommodity: async (req, res) => {
        const validated = commodity_schema_1.createCommoditySchema.parse(req.body);
        const commodity = await commodity_service_1.commodityService.createCommodity(validated);
        res.status(201).json({ status: 'success', data: commodity });
    },
    getCommodities: async (_req, res) => {
        const commodities = await commodity_service_1.commodityService.getCommodities();
        res.json({ status: 'success', data: commodities });
    },
    getCommodityById: async (req, res) => {
        const { id } = commodity_schema_1.commodityIdParamSchema.parse(req.params);
        const commodity = await commodity_service_1.commodityService.getCommodityById(id);
        if (!commodity) {
            throw new AppError_1.default('Commodity not found', 404);
        }
        res.json({ status: 'success', data: commodity });
    },
    updateCommodity: async (req, res) => {
        const { id } = commodity_schema_1.commodityIdParamSchema.parse(req.params);
        const data = commodity_schema_1.updateCommoditySchema.parse(req.body);
        const updatedCommodity = await commodity_service_1.commodityService.updateCommodity(id, data);
        res.json({ status: 'success', data: updatedCommodity });
    },
    deleteCommodity: async (req, res) => {
        const { id } = commodity_schema_1.commodityIdParamSchema.parse(req.params);
        await commodity_service_1.commodityService.deleteCommodity(id);
        res.status(204).send();
    },
};
