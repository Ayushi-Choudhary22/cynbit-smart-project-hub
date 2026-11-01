import express from 'express';
import { handleGenerateBlueprint, handleRefineBlueprint } from '../controllers/discoveryController.js';
import { blueprintGenerationLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/discovery/blueprint
router.post('/blueprint', blueprintGenerationLimiter, handleGenerateBlueprint);

// POST /api/discovery/refine
router.post('/refine', blueprintGenerationLimiter, handleRefineBlueprint);

export default router;
