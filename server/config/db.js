import mongoose from 'mongoose';
import dns from 'dns';

// Ensure reliable SRV DNS resolution for MongoDB Atlas across local and container environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Retain system default if setServers is unavailable
}

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
    // Check if the placeholder '<db_password>' is still present
    if (uri.includes('<db_password>') || uri.includes('<password>')) {
      const configErr = new Error(
        "MONGODB_URI contains '<db_password>' placeholder. Please replace it with your actual MongoDB Atlas database password in server/.env."
      );
      console.error('❌ Database Configuration Error:', configErr.message);
      throw configErr;
    }

    try {
      console.log('Connecting to MongoDB Atlas cluster (database: cynbit_hub)...');
      await mongoose.connect(uri, {
        dbName: 'cynbit_hub',
      });
      console.log('✅ Connected to MongoDB Atlas cluster successfully. Active database: cynbit_hub.');
      databaseConfig = {
        type: 'MongoDB Atlas (Persistent Storage)',
        isPersistent: true,
        isFallback: false,
        dbName: 'cynbit_hub',
        connectedAt: new Date().toISOString(),
      };
      return;
    } catch (err) {
      // Strip any sensitive credentials from the error message before logging
      const sanitizedMessage = err.message.replace(
        /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/i,
        'mongodb$1://$2:****@'
      );
      console.error('❌ Failed to connect to MongoDB Atlas:', sanitizedMessage);
      // Strictly do not fall back to MongoMemoryServer when MONGODB_URI is explicitly configured
      throw new Error(`MongoDB Atlas connection failed: ${sanitizedMessage}`);
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
