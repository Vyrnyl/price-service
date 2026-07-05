import { Router, Request, Response } from 'express';
import userRoutes from '../modules/user/user.routes';
import commodityRoutes from '../modules/commodity/commodity.routes';
import srpRoutes from '../modules/srp/srp.routes';
import priceRecordRoutes from '../modules/price-record/price-record.routes';
import reportRoutes from '../modules/report/report.routes';
import forecastRoutes from '../modules/forecast/forecast.routes';
import storeRoutes from '../modules/store/store.routes';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'PresyoSerbisyo' });
});

router.use('/users', userRoutes);
router.use('/commodities', commodityRoutes);
router.use('/srps', srpRoutes);
router.use('/price-records', priceRecordRoutes);
router.use('/reports', reportRoutes);
router.use('/forecasts', forecastRoutes);
router.use('/stores', storeRoutes);

export default router;
