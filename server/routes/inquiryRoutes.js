import express from 'express';
import { createInquiry } from '../controllers/inquiryController.js';
import { publicApiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/inquiries
router.post('/', publicApiLimiter, createInquiry);

export default router;
