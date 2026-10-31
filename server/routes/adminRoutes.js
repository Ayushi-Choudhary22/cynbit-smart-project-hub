import express from 'express';
import { adminLogin, getAdminProfile, provisionEvaluator } from '../controllers/authController.js';
import {
  getInquiryStats,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  addInternalNote,
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public auth endpoint
router.post('/login', adminLogin);

// Loopback-only evaluator provisioning endpoint (development only)
router.post('/provision-evaluator', provisionEvaluator);

// Protected admin endpoints
router.get('/me', protectAdmin, getAdminProfile);
router.get('/stats', protectAdmin, getInquiryStats);
router.get('/inquiries', protectAdmin, getInquiries);
router.get('/inquiries/:id', protectAdmin, getInquiryById);
router.patch('/inquiries/:id/status', protectAdmin, updateInquiryStatus);
router.patch('/inquiries/:id/notes', protectAdmin, addInternalNote);

export default router;
