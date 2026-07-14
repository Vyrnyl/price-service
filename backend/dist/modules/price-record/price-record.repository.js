"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceRecordRepository = void 0;
const prisma_1 = require("../../prisma");
const price_record_scope_1 = require("./price-record.scope");
async function calculatePriceStatus(commodityId, price, dateAndTime) {
    // Fetch the most recent effective SRP for the commodity
    const srp = await prisma_1.prisma.sRP.findFirst({
        where: {
            commodityId,
            effectiveDate: { lte: dateAndTime },
        },
        orderBy: { effectiveDate: 'desc' },
    });
    // If no SRP is found, default to COMPLIANT
    if (!srp) {
        return 'COMPLIANT';
    }
    const srpPrice = parseFloat(srp.price.toString());
    if (price > srpPrice) {
        return 'OVERPRICE';
    }
    else if (price < srpPrice) {
        return 'UNDERPRICE';
    }
    else {
        return 'COMPLIANT';
    }
}
exports.priceRecordRepository = {
    create: async (data) => {
        const { commodityId, storeId, userId, status, price, dateAndTime, ...rest } = data;
        // Calculate status if not provided
        const finalStatus = status ?? (await calculatePriceStatus(commodityId, price, dateAndTime));
        return prisma_1.prisma.priceRecord.create({
            data: {
                ...rest,
                status: finalStatus,
                price,
                dateAndTime,
                commodity: { connect: { id: commodityId } },
                store: { connect: { id: storeId } },
                user: { connect: { id: userId } },
            },
            include: { commodity: true, store: true, user: true },
        });
    },
    findAll: (authUser) => {
        const scope = (0, price_record_scope_1.resolvePriceRecordScope)(authUser);
        return prisma_1.prisma.priceRecord.findMany({
            where: scope,
            include: { commodity: true, store: true, user: true },
        });
    },
    findById: (id) => prisma_1.prisma.priceRecord.findUnique({
        where: { id },
        include: { commodity: true, store: true, user: true },
    }),
    update: async (id, data) => {
        const { commodityId, storeId, status, price, dateAndTime, ...rest } = data;
        // Get the current record to use existing values if not updating them
        const currentRecord = await prisma_1.prisma.priceRecord.findUnique({ where: { id } });
        if (!currentRecord) {
            throw new Error('Price record not found');
        }
        // Determine the final price and dateAndTime for status calculation
        const finalPrice = price !== undefined ? price : currentRecord.price.toNumber();
        const finalDateAndTime = dateAndTime !== undefined ? dateAndTime : currentRecord.dateAndTime;
        const finalCommodityId = commodityId || currentRecord.commodityId;
        // Calculate status if not explicitly provided and price or dateAndTime is being updated
        let finalStatus = status;
        if (finalStatus === undefined && (price !== undefined || dateAndTime !== undefined)) {
            finalStatus = await calculatePriceStatus(finalCommodityId, finalPrice, finalDateAndTime);
        }
        const updateData = {
            ...rest,
            ...(commodityId ? { commodity: { connect: { id: commodityId } } } : {}),
            ...(storeId ? { store: { connect: { id: storeId } } } : {}),
            ...(price !== undefined ? { price } : {}),
            ...(dateAndTime !== undefined ? { dateAndTime } : {}),
            ...(finalStatus !== undefined ? { status: finalStatus } : {}),
        };
        return prisma_1.prisma.priceRecord.update({
            where: { id },
            data: updateData,
            include: { commodity: true, store: true, user: true },
        });
    },
    delete: (id) => prisma_1.prisma.priceRecord.delete({ where: { id } }),
};
