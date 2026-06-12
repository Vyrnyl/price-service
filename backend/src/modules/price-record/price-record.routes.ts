import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { priceRecordController } from './price-record.controller';

const router = Router();

router.post('/', asyncHandler(priceRecordController.createPriceRecord));
router.get('/', asyncHandler(priceRecordController.getPriceRecords));
router.get('/:id', asyncHandler(priceRecordController.getPriceRecordById));
router.put('/:id', asyncHandler(priceRecordController.updatePriceRecord));
router.delete('/:id', asyncHandler(priceRecordController.deletePriceRecord));

export default router;
