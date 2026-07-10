import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { reportController } from './report.controller';

const router = Router();

router.post('/', asyncHandler(reportController.createReport));
router.get('/', asyncHandler(reportController.getReports));
router.delete('/', asyncHandler(reportController.deleteAllReports));
router.get('/:id', asyncHandler(reportController.getReportById));
router.put('/:id', asyncHandler(reportController.updateReport));
router.delete('/:id', asyncHandler(reportController.deleteReport));

export default router;
