import express from 'express';
import { handleGenerateBlueprint } from '../controllers/discoveryController.js';
import { blueprintGenerationLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/discovery/blueprint
router.post('/blueprint', blueprintGenerationLimiter, handleGenerateBlueprint);

export default router;
