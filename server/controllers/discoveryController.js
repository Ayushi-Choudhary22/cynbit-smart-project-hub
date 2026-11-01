import { generateAIBlueprint } from '../services/aiBlueprintService.js';
import { z } from 'zod';

const blueprintRequestSchema = z.object({
  category: z.string().optional().default('Web Application & AI Automation'),
  answers: z.record(z.any()).default({}),
  refinementNotes: z.string().optional().default(''),
});

export const handleGenerateBlueprint = async (req, res) => {
  try {
    const parseResult = blueprintRequestSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid discovery answers data.',
        errors: parseResult.error.errors,
      });
    }

    const { category, answers, refinementNotes } = parseResult.data;
    const blueprint = await generateAIBlueprint(category, answers, refinementNotes);

    return res.status(200).json({
      success: true,
      message: 'Project blueprint generated successfully.',
      blueprint,
      data: blueprint,
      source: blueprint.engineUsed || 'deterministic_engine',
      generatedAt: blueprint.generatedAt || new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error generating project blueprint:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate project blueprint. Please try again.',
      error: err.message,
    });
  }
};

export const handleRefineBlueprint = async (req, res) => {
  try {
    const { category, answers, refinementNotes } = req.body || {};

    if (!refinementNotes || typeof refinementNotes !== 'string' || refinementNotes.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Refinement instructions or modification notes are required.',
      });
    }

    const blueprint = await generateAIBlueprint(
      category || 'Web Application & AI Automation',
      answers || {},
      refinementNotes.trim()
    );

    return res.status(200).json({
      success: true,
      message: 'Blueprint refined successfully based on your feedback.',
      blueprint,
      data: blueprint,
      source: blueprint.engineUsed || 'deterministic_engine',
      generatedAt: blueprint.generatedAt || new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error refining project blueprint:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to refine project blueprint. Please try again.',
      error: err.message,
    });
  }
};
