import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
import http from 'http';

const port = process.env.PORT || 5000;
const evaluatorEmail = (process.env.EVALUATOR_EMAIL || 'evaluator@cynbit.test').toLowerCase();
const evaluatorPassword = process.env.EVALUATOR_PASSWORD || crypto.randomBytes(8).toString('hex') + '!E1';

export const createEvaluatorAccount = async () => {
  // If a persistent MongoDB Atlas URI is present in environment, connect directly
  if (process.env.MONGODB_URI && process.env.MONGODB_URI.trim() !== '') {
    try {
      const { connectDB, disconnectDB } = await import('../config/db.js');
      const User = (await import('../models/User.js')).default;
      await connectDB();

      let user = await User.findOne({ email: evaluatorEmail });
      if (!user) {
        user = new User({
          name: 'Technical Assessment Evaluator',
          email: evaluatorEmail,
          password: evaluatorPassword,
          role: 'evaluator',
        });
        await user.save();
      } else {
        user.password = evaluatorPassword;
        user.role = 'evaluator';
        await user.save();
      }

      console.log('\n=======================================================');
      console.log('🔐 Evaluator Demo Account Initialized in MongoDB Atlas');
      console.log('-------------------------------------------------------');
      console.log(`Email:    ${evaluatorEmail}`);
      console.log(`Password: ${evaluatorPassword}`);
      console.log(`Role:     evaluator (Restricted assessment access)`);
      console.log(`Portal:   http://localhost:3000/admin/login`);
      console.log('=======================================================\n');

      await disconnectDB();
      process.exit(0);
    } catch (err) {
      console.error('❌ Failed to provision evaluator in MongoDB Atlas:', err.message);
      process.exit(1);
    }
    return;
  }

  // Development in-memory fallback: Provision in the ACTIVE running server database via local loopback
  const payload = JSON.stringify({
    email: evaluatorEmail,
    password: evaluatorPassword,
  });

  const req = http.request(
    {
      hostname: '127.0.0.1',
      port,
      path: '/api/admin/provision-evaluator',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode === 200 && parsed.success) {
            console.log('\n=======================================================');
            console.log('🔐 Evaluator Demo Account Initialized (Active Backend)');
            console.log('-------------------------------------------------------');
            console.log(`Email:    ${parsed.email}`);
            console.log(`Password: ${parsed.password}`);
            console.log(`Role:     ${parsed.role} (Restricted assessment access)`);
            console.log(`Portal:   http://localhost:3000/admin/login`);
            console.log('-------------------------------------------------------');
            console.log('Notice: Evaluator account is active in the running server.');
            console.log('=======================================================\n');
            process.exit(0);
          } else {
            console.error('❌ Failed to provision evaluator:', parsed.message || data);
            process.exit(1);
          }
        } catch (e) {
          console.error('❌ Invalid response from backend:', data);
          process.exit(1);
        }
      });
    }
  );

  req.on('error', (err) => {
    console.log('\n=======================================================');
    console.log('ℹ️ Notice: Backend server is not currently running on port ' + port);
    console.log('-------------------------------------------------------');
    console.log('When running in development with an in-memory database,');
    console.log('start the backend server first using:');
    console.log('   node server.js');
    console.log('The server automatically initializes the evaluator account');
    console.log('in the active database and logs credentials to the console.');
    console.log('=======================================================\n');
    process.exit(1);
  });

  req.write(payload);
  req.end();
};

createEvaluatorAccount();
