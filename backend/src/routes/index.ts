import { Router, Request, Response } from 'express';
import userRoutes from '../modules/user/user.routes';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'PresyoSerbisyo' });
});

router.use('/users', userRoutes);

export default router;
