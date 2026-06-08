"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commodityService = void 0;
const commodity_repository_1 = require("./commodity.repository");
exports.commodityService = {
    createCommodity: (data) => commodity_repository_1.commodityRepository.create(data),
    getCommodities: () => commodity_repository_1.commodityRepository.findAll(),
    getCommodityById: (id) => commodity_repository_1.commodityRepository.findById(id),
    updateCommodity: (id, data) => commodity_repository_1.commodityRepository.update(id, data),
    deleteCommodity: (id) => commodity_repository_1.commodityRepository.delete(id),
};
