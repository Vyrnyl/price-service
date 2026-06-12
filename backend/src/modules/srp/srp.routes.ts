import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { srpController } from './srp.controller';

const router = Router();

router.post('/', asyncHandler(srpController.createSrp));
router.get('/', asyncHandler(srpController.getSrps));
router.get('/:id', asyncHandler(srpController.getSrpById));
router.put('/:id', asyncHandler(srpController.updateSrp));
router.delete('/:id', asyncHandler(srpController.deleteSrp));

export default router;
