import { generateAIBlueprint } from '../services/aiBlueprintService.js';
import { z } from 'zod';

const blueprintRequestSchema = z.object({
  category: z.string().min(1, 'Project category is required'),
  answers: z.record(z.any()).default({}),
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

    const { category, answers } = parseResult.data;
    const blueprint = await generateAIBlueprint(category, answers);

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
