import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import apiRoutes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { authenticate } from './middleware/auth.middleware';
import authRoutes from './modules/auth/auth.routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api', authenticate, apiRoutes);

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
