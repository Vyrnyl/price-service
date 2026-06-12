"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceRecordController = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const price_record_service_1 = require("./price-record.service");
const price_record_schema_1 = require("./price-record.schema");
exports.priceRecordController = {
    createPriceRecord: async (req, res) => {
        const validatedBody = price_record_schema_1.createPriceRecordSchema.parse(req.body);
        const priceRecord = await price_record_service_1.priceRecordService.createPriceRecord(validatedBody);
        res.status(201).json({ status: 'success', data: priceRecord });
    },
    getPriceRecords: async (_req, res) => {
        const priceRecords = await price_record_service_1.priceRecordService.getPriceRecords();
        res.json({ status: 'success', data: priceRecords });
    },
    getPriceRecordById: async (req, res) => {
        const { id } = price_record_schema_1.priceRecordIdParamSchema.parse(req.params);
        const priceRecord = await price_record_service_1.priceRecordService.getPriceRecordById(id);
        if (!priceRecord) {
            throw new AppError_1.default('Price record not found', 404);
        }
        res.json({ status: 'success', data: priceRecord });
    },
    updatePriceRecord: async (req, res) => {
        const { id } = price_record_schema_1.priceRecordIdParamSchema.parse(req.params);
        const validatedBody = price_record_schema_1.updatePriceRecordSchema.parse(req.body);
        const priceRecord = await price_record_service_1.priceRecordService.updatePriceRecord(id, validatedBody);
        if (!priceRecord) {
            throw new AppError_1.default('Price record not found', 404);
        }
        res.json({ status: 'success', data: priceRecord });
    },
    deletePriceRecord: async (req, res) => {
        const { id } = price_record_schema_1.priceRecordIdParamSchema.parse(req.params);
        await price_record_service_1.priceRecordService.deletePriceRecord(id);
        res.status(204).send();
    },
};
