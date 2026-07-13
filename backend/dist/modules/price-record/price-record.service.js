"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceRecordService = void 0;
const price_record_repository_1 = require("./price-record.repository");
exports.priceRecordService = {
    createPriceRecord: (data) => price_record_repository_1.priceRecordRepository.create(data),
    getPriceRecords: (authUser) => price_record_repository_1.priceRecordRepository.findAll(authUser),
    getPriceRecordById: (id) => price_record_repository_1.priceRecordRepository.findById(id),
    updatePriceRecord: (id, data) => price_record_repository_1.priceRecordRepository.update(id, data),
    deletePriceRecord: (id) => price_record_repository_1.priceRecordRepository.delete(id),
};
