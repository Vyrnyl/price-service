import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { commodityController } from './commodity.controller';

const router = Router();

router.post('/', asyncHandler(commodityController.createCommodity));
router.get('/', asyncHandler(commodityController.getCommodities));
router.get('/:id', asyncHandler(commodityController.getCommodityById));
router.put('/:id', asyncHandler(commodityController.updateCommodity));
router.delete('/:id', asyncHandler(commodityController.deleteCommodity));

export default router;
