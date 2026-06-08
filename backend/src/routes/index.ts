import { Router, Request, Response } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/user/user.routes';
import commodityRoutes from '../modules/commodity/commodity.routes';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'PresyoSerbisyo' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/commodities', commodityRoutes);

export default router;
