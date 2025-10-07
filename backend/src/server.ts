import express from 'express';
import cors from 'cors';
import { testConnection, syncDatabase } from './config/database';
import { User, FormSubmission } from './models';

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'WL Challenge API Server',
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    await testConnection();
    
    // Get model counts for additional health info
    const userCount = await User.count();
    const submissionCount = await FormSubmission.count();
    
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'Connected',
      models: {
        users: userCount,
        formSubmissions: submissionCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      database: 'Disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Start server with database connection
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (dbConnected) {
      // Sync database
      await syncDatabase();
    }
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running at http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      if (dbConnected) {
        console.log(`🗄️  Database connected and synchronized`);
      } else {
        console.log(`⚠️  Server running without database connection`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();