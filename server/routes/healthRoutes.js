import express from 'express';
import mongoose from 'mongoose';
import { databaseConfig } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];

  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Cynbit Platform & Smart Project Discovery API',
    database: {
      status: states[dbState] || 'Unknown',
      type: databaseConfig.type,
      databaseName: databaseConfig.dbName || (databaseConfig.isPersistent ? 'cynbit_hub' : 'in-memory'),
      isProductionPersistent: databaseConfig.isPersistent,
      isFallbackMode: databaseConfig.isFallback,
      notice: databaseConfig.isPersistent
        ? 'Connected to production persistent MongoDB Atlas cluster.'
        : 'Running on development fallback session database. Configure MONGODB_URI for production persistence.',
    },
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
