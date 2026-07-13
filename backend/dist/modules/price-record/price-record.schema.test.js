"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const price_record_schema_1 = require("./price-record.schema");
(0, node_test_1.default)('createPriceRecordSchema accepts a commodity price update without a store id', () => {
    const payload = {
        commodityId: '123e4567-e89b-12d3-a456-426614174000',
        price: 12.5,
        dateAndTime: new Date('2026-07-13T10:00:00.000Z'),
        status: 'COMPLIANT',
    };
    const result = price_record_schema_1.createPriceRecordSchema.parse(payload);
    strict_1.default.equal(result.commodityId, payload.commodityId);
    strict_1.default.equal(result.price, payload.price);
    strict_1.default.equal(result.status, payload.status);
    strict_1.default.equal(result.storeId, undefined);
});
