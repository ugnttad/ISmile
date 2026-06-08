import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import catalogRoutes from './routes/catalogRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const fallbackOrigins = ['http://localhost:5173', 'https://ismile-dusky.vercel.app'];
const allowedOrigins = (process.env.CORS_ORIGIN || fallbackOrigins.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
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
