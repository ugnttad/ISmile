import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import catalogRoutes from './routes/catalogRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Nha Khoa iSmile API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api', catalogRoutes);

app.use(errorHandler);

export default app;
