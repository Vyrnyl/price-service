"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReportFile = generateReportFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = require("../../prisma");
const REPORTS_DIR = path_1.default.resolve(process.cwd(), 'reports');
function ensureReportsDir() {
    if (!fs_1.default.existsSync(REPORTS_DIR)) {
        fs_1.default.mkdirSync(REPORTS_DIR, { recursive: true });
    }
}
function parsePeriod(period) {
    const [start, end] = period.split(' to ').map((value) => value.trim());
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        throw new Error('Invalid report period format. Use YYYY-MM-DD to YYYY-MM-DD.');
    }
    endDate.setHours(23, 59, 59, 999);
    return { startDate, endDate };
}
function mapCommodityGroupFilter(group) {
    if (!group || group === 'ALL') {
        return undefined;
    }
    return {
        commodity: {
            is: {
                category: {
                    equals: group,
                    mode: 'insensitive',
                },
            },
        },
    };
}
function mapStoreFilter(storeId) {
    if (!storeId) {
        return undefined;
    }
    return { storeId };
}
async function loadReportRecords(period, commodityGroup, storeId) {
    const { startDate, endDate } = parsePeriod(period);
    return prisma_1.prisma.priceRecord.findMany({
        where: {
            dateAndTime: {
                gte: startDate,
                lte: endDate,
            },
            ...mapCommodityGroupFilter(commodityGroup),
            ...mapStoreFilter(storeId),
        },
        include: {
            commodity: true,
            store: true,
            user: true,
        },
        orderBy: { dateAndTime: 'asc' },
    });
}
function buildReportFilename(type, format) {
    const normalizedType = type.toLowerCase();
    const ext = format === 'PDF' ? 'pdf' : 'xlsx';
    const timestamp = Date.now();
    return `${normalizedType}_${timestamp}.${ext}`;
}
function formatPrice(value) {
    return `₱${Number(value).toFixed(2)}`;
}
function buildRecordRows(records) {
    return records.map((record) => ({
        date: record.dateAndTime.toISOString().slice(0, 10),
        time: record.dateAndTime.toISOString().slice(11, 16),
        store: record.store?.name ?? 'Unknown store',
        location: record.store?.location ?? 'Unknown location',
        commodity: record.commodity?.name ?? 'Unknown commodity',
        category: record.commodity?.category ?? 'Unknown category',
        price: formatPrice(Number(record.price)),
        srp: record.srp ? formatPrice(Number(record.srp)) : 'N/A',
        status: record.status,
        officer: record.user?.name ?? 'Officer',
    }));
}
async function generatePdf(reportPath, payload, records) {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit_1.default({ margin: 40, size: 'A4' });
        const stream = fs_1.default.createWriteStream(reportPath);
        stream.on('finish', () => resolve(reportPath));
        stream.on('error', reject);
        doc.pipe(stream);
        doc.fontSize(18).font('Helvetica-Bold').text('PresyoSerbisyo Report', {
            align: 'center',
        });
        doc.moveDown();
        doc.fontSize(12).font('Helvetica').text(`Report type: ${payload.type}`);
        doc.text(`Period: ${payload.period}`);
        doc.text(`Commodity group: ${payload.commodityGroup ?? 'All commodities'}`);
        doc.text(`Generated: ${new Date().toLocaleString()}`);
        doc.text(`Total records: ${records.length}`);
        doc.moveDown();
        const columnHeaders = ['Date', 'Time', 'Store', 'Commodity', 'Price', 'SRP', 'Status'];
        doc.font('Helvetica-Bold').fontSize(10).text(columnHeaders.join('  |  '));
        doc.moveDown(0.5);
        doc.font('Helvetica').fontSize(9);
        records.forEach((record) => {
            const row = [
                record.dateAndTime.toISOString().slice(0, 10),
                record.dateAndTime.toISOString().slice(11, 16),
                record.store?.name ?? 'Unknown store',
                record.commodity?.name ?? 'Unknown commodity',
                formatPrice(Number(record.price)),
                record.srp ? formatPrice(Number(record.srp)) : 'N/A',
                record.status,
            ].join('  |  ');
            doc.text(row, { width: 520 });
        });
        doc.end();
    });
}
async function generateExcel(reportPath, records) {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet('Report');
    worksheet.columns = [
        { header: 'Date', key: 'date', width: 12 },
        { header: 'Time', key: 'time', width: 8 },
        { header: 'Store', key: 'store', width: 25 },
        { header: 'Location', key: 'location', width: 20 },
        { header: 'Commodity', key: 'commodity', width: 22 },
        { header: 'Category', key: 'category', width: 16 },
        { header: 'Price', key: 'price', width: 12 },
        { header: 'SRP', key: 'srp', width: 12 },
        { header: 'Status', key: 'status', width: 14 },
        { header: 'Officer', key: 'officer', width: 18 },
    ];
    worksheet.addRows(buildRecordRows(records));
    await workbook.xlsx.writeFile(reportPath);
    return reportPath;
}
async function generateReportFile(payload) {
    ensureReportsDir();
    const filename = buildReportFilename(payload.type, payload.format);
    const reportPath = path_1.default.join(REPORTS_DIR, filename);
    const records = await loadReportRecords(payload.period, payload.commodityGroup, payload.storeId);
    if (payload.format === 'PDF') {
        await generatePdf(reportPath, payload, records);
    }
    else {
        await generateExcel(reportPath, records);
    }
    const baseUrl = process.env.BACKEND_BASE_URL ?? `http://localhost:${process.env.PORT ?? 5000}`;
    return {
        fileUrl: `${baseUrl}/reports/files/${filename}`,
        filename,
        filePath: reportPath,
    };
}
