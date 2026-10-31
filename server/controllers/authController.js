import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'cynbit_fallback_jwt_secret_intern';
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};

export const adminLogin = async (req, res) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid login details.',
        errors: parseResult.error.errors,
      });
    }

    const { email, password } = parseResult.data;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      data: {
        token,
        admin: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed due to server error.',
      error: err.message,
    });
  }
};

export const getAdminProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      admin: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    },
  });
};

export const provisionEvaluator = async (req, res) => {
  // Security guard: only allow local loopback requests in development environment
  const remoteIp = req.socket.remoteAddress || req.ip;
  const isLoopback = remoteIp === '127.0.0.1' || remoteIp === '::1' || remoteIp === '::ffff:127.0.0.1';

  if (process.env.NODE_ENV === 'production' || !isLoopback) {
    return res.status(403).json({
      success: false,
      message: 'Evaluator provisioning endpoint is only accessible via local loopback in development.',
    });
  }

  try {
    const crypto = await import('crypto');
    const evaluatorEmail = (req.body?.email || process.env.EVALUATOR_EMAIL || 'evaluator@cynbit.test').toLowerCase();
    const evaluatorPassword = req.body?.password || crypto.randomBytes(8).toString('hex') + '!E1';

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

    return res.status(200).json({
      success: true,
      message: 'Evaluator demo account provisioned in active database.',
      email: evaluatorEmail,
      password: evaluatorPassword,
      role: 'evaluator',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to provision evaluator account: ' + err.message,
    });
  }
};
