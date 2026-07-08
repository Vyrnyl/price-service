"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const commodity_routes_1 = __importDefault(require("../modules/commodity/commodity.routes"));
const srp_routes_1 = __importDefault(require("../modules/srp/srp.routes"));
const price_record_routes_1 = __importDefault(require("../modules/price-record/price-record.routes"));
const report_routes_1 = __importDefault(require("../modules/report/report.routes"));
const forecast_routes_1 = __importDefault(require("../modules/forecast/forecast.routes"));
const store_routes_1 = __importDefault(require("../modules/store/store.routes"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({ status: 'ok', service: 'PresyoSerbisyo' });
});
router.use('/users', user_routes_1.default);
router.use('/commodities', commodity_routes_1.default);
router.use('/srps', srp_routes_1.default);
router.use('/price-records', price_record_routes_1.default);
router.use('/reports', report_routes_1.default);
router.use('/forecasts', forecast_routes_1.default);
router.use('/stores', store_routes_1.default);
exports.default = router;
