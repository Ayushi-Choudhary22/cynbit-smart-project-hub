import mongoose from 'mongoose';

let memoryServer = null;

export let databaseConfig = {
  type: 'Unknown',
  isPersistent: false,
  isFallback: false,
  connectedAt: null,
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (uri && uri.trim() !== '') {
    try {
      console.log('Connecting to provided MongoDB URI...');
      await mongoose.connect(uri);
      console.log('✅ Connected to MongoDB Atlas / persistent database successfully.');
      databaseConfig = {
        type: 'MongoDB Atlas (Persistent Storage)',
        isPersistent: true,
        isFallback: false,
        connectedAt: new Date().toISOString(),
      };
      return;
    } catch (err) {
      console.error('❌ Failed to connect to provided MONGODB_URI:', err.message);
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Production database connection failed: ${err.message}`);
      }
      console.log('Falling back to MongoMemoryServer for development assessment...');
    }
  } else {
    console.log('ℹ️ No MONGODB_URI specified in environment.');
  }

  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const memUri = memoryServer.getUri();
    await mongoose.connect(memUri);
    console.log('✅ Connected to MongoMemoryServer successfully.');
    console.log('ℹ️ [DATABASE NOTICE] Running with in-memory session database. Note: Session storage is intended for development assessment; for production persistence, set MONGODB_URI in server/.env.');
    
    databaseConfig = {
      type: 'MongoMemoryServer (Development Session Fallback)',
      isPersistent: false,
      isFallback: true,
      connectedAt: new Date().toISOString(),
    };
  } catch (memErr) {
    console.error('❌ Failed to connect to database:', memErr.message);
    throw memErr;
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};
