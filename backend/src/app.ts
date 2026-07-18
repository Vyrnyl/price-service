import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from "cookie-parser";
import apiRoutes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { authenticate } from './middleware/auth.middleware';
import authRoutes from './modules/auth/auth.routes';
import publicRoutes from './modules/public/public.routes';

const app = express();
const port = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

const reportsDir = path.resolve(process.cwd(), 'reports');

console.log("process.env.CORS_ORIGIN =", process.env.CORS_ORIGIN);
console.log("corsOrigin =", corsOrigin);

app.use(cors({
    origin: corsOrigin,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api', authenticate, apiRoutes);
app.use('/reports/files', express.static(reportsDir));

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'PresyoSerbisyo backend is running' });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
