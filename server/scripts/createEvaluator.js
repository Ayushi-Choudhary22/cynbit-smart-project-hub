import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
import { connectDB, disconnectDB } from '../config/db.js';
import User from '../models/User.js';

export const createEvaluatorAccount = async () => {
  try {
    await connectDB();

    const evaluatorEmail = process.env.EVALUATOR_EMAIL || 'evaluator@cynbit.test';
    const evaluatorPassword = process.env.EVALUATOR_PASSWORD || crypto.randomBytes(8).toString('hex') + '!E1';

    let user = await User.findOne({ email: evaluatorEmail.toLowerCase() });

    if (!user) {
      user = new User({
        name: 'Technical Assessment Evaluator',
        email: evaluatorEmail.toLowerCase(),
        password: evaluatorPassword,
        role: 'admin',
      });
      await user.save();
    } else {
      user.password = evaluatorPassword;
      await user.save();
    }

    console.log('\n=======================================================');
    console.log('🔐 Evaluator Demo Account Initialized');
    console.log('-------------------------------------------------------');
    console.log(`Email:    ${evaluatorEmail}`);
    console.log(`Password: ${evaluatorPassword}`);
    console.log(`Role:     admin (Assessment Reviewer)`);
    console.log(`Portal:   http://localhost:3000/admin/login`);
    console.log('-------------------------------------------------------');
    console.log('Notice: Single-use credentials generated on-demand.');
    console.log('Never committed to Git or exposed in frontend code.');
    if (!process.env.MONGODB_URI) {
      console.log('💡 In-memory development mode: To use custom persistent credentials,');
      console.log('   set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env before starting server.js.');
    }
    console.log('=======================================================\n');

    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to create evaluator account:', err.message);
    process.exit(1);
  }
};

createEvaluatorAccount();
