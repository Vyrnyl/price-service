import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { storeController } from './store.controller';

const router = Router();

router.post('/', asyncHandler(storeController.createStore));
router.get('/', asyncHandler(storeController.getStores));
router.get('/:id', asyncHandler(storeController.getStoreById));
router.put('/:id', asyncHandler(storeController.updateStore));
router.delete('/:id', asyncHandler(storeController.deleteStore));

export default router;
