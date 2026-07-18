"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportService = void 0;
const report_repository_1 = require("./report.repository");
exports.reportService = {
    createReport: (data, userId) => report_repository_1.reportRepository.create(data, userId),
    getReports: (authUser) => report_repository_1.reportRepository.findAll(authUser),
    getReportById: (id) => report_repository_1.reportRepository.findById(id),
    updateReport: (id, data) => report_repository_1.reportRepository.update(id, data),
    deleteReport: (id) => report_repository_1.reportRepository.delete(id),
    deleteAllReports: (authUser) => report_repository_1.reportRepository.deleteAll(authUser),
};
