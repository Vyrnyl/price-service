"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const report_scope_1 = require("./report.scope");
(0, node_test_1.default)('officers only see their own reports', () => {
    const scope = (0, report_scope_1.resolveReportScope)({
        userId: 'officer-123',
        role: 'OFFICER',
        email: 'officer@example.com',
    });
    strict_1.default.deepEqual(scope, { generatedBy: 'officer-123' });
});
(0, node_test_1.default)('admins keep access to all reports', () => {
    const scope = (0, report_scope_1.resolveReportScope)({
        userId: 'admin-123',
        role: 'ADMIN',
        email: 'admin@example.com',
    });
    strict_1.default.equal(scope, undefined);
});
