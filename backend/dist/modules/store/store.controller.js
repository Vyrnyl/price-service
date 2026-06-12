"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeController = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const store_service_1 = require("./store.service");
const store_schema_1 = require("./store.schema");
exports.storeController = {
    createStore: async (req, res) => {
        const validatedBody = store_schema_1.createStoreSchema.parse(req.body);
        const store = await store_service_1.storeService.createStore(validatedBody);
        res.status(201).json({ status: 'success', data: store });
    },
    getStores: async (_req, res) => {
        const stores = await store_service_1.storeService.getStores();
        res.json({ status: 'success', data: stores });
    },
    getStoreById: async (req, res) => {
        const { id } = store_schema_1.storeIdParamSchema.parse(req.params);
        const store = await store_service_1.storeService.getStoreById(id);
        if (!store) {
            throw new AppError_1.default('Store not found', 404);
        }
        res.json({ status: 'success', data: store });
    },
    updateStore: async (req, res) => {
        const { id } = store_schema_1.storeIdParamSchema.parse(req.params);
        const validatedBody = store_schema_1.updateStoreSchema.parse(req.body);
        const store = await store_service_1.storeService.updateStore(id, validatedBody);
        if (!store) {
            throw new AppError_1.default('Store not found', 404);
        }
        res.json({ status: 'success', data: store });
    },
    deleteStore: async (req, res) => {
        const { id } = store_schema_1.storeIdParamSchema.parse(req.params);
        await store_service_1.storeService.deleteStore(id);
        res.status(204).send();
    },
};
