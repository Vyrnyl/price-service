"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveReportScope = resolveReportScope;
function resolveReportScope(authUser) {
    if (!authUser) {
        return undefined;
    }
    if (authUser.role === 'OFFICER') {
        return { generatedBy: authUser.userId };
    }
    return undefined;
}
