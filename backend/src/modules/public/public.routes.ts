import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { publicController } from './public.controller';

const router = Router();

router.get('/commodities', asyncHandler(publicController.getPublicCommodities));

export default router;
