"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePriceRecordScope = resolvePriceRecordScope;
function resolvePriceRecordScope(authUser) {
    if (!authUser) {
        return undefined;
    }
    if (authUser.role === 'OFFICER') {
        return { userId: authUser.userId };
    }
    return undefined;
}
