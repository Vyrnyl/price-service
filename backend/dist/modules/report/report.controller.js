"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const report_service_1 = require("./report.service");
const report_schema_1 = require("./report.schema");
const report_generator_1 = require("./report.generator");
exports.reportController = {
    createReport: async (req, res) => {
        const authUser = req.user;
        if (!authUser) {
            throw new AppError_1.default('Unauthorized', 401);
        }
        const validatedBody = report_schema_1.createReportSchema.parse(req.body);
        const generated = await (0, report_generator_1.generateReportFile)(validatedBody);
        const reportPayload = {
            ...validatedBody,
            fileUrl: generated.fileUrl,
        };
        const report = await report_service_1.reportService.createReport(reportPayload, authUser.userId);
        res.status(201).json({ status: 'success', data: report });
    },
    getReports: async (_req, res) => {
        const reports = await report_service_1.reportService.getReports();
        res.json({ status: 'success', data: reports });
    },
    getReportById: async (req, res) => {
        const { id } = report_schema_1.reportIdParamSchema.parse(req.params);
        const report = await report_service_1.reportService.getReportById(id);
        if (!report) {
            throw new AppError_1.default('Report not found', 404);
        }
        res.json({ status: 'success', data: report });
    },
    updateReport: async (req, res) => {
        const { id } = report_schema_1.reportIdParamSchema.parse(req.params);
        const validatedBody = report_schema_1.updateReportSchema.parse(req.body);
        const report = await report_service_1.reportService.updateReport(id, validatedBody);
        if (!report) {
            throw new AppError_1.default('Report not found', 404);
        }
        res.json({ status: 'success', data: report });
    },
    deleteReport: async (req, res) => {
        const { id } = report_schema_1.reportIdParamSchema.parse(req.params);
        await report_service_1.reportService.deleteReport(id);
        res.status(204).send();
    },
};
