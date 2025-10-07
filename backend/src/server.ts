import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { sequelize } from './config/database';
import authRoutes from './routes/auth';
import formRoutes from './routes/form';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());

// Session configuration
app.use(session({
  secret: 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    
    await sequelize.sync();
    console.log('Database synchronized');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();