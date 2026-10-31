import Inquiry from '../models/Inquiry.js';
import { z } from 'zod';

const inquirySubmissionSchema = z.object({
  clientName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please provide a valid work email address'),
  phone: z.string().optional().default(''),
  company: z.string().optional().default(''),
  projectCategory: z.string().min(1, 'Project category is required'),
  discoveryAnswers: z.record(z.any()).default({}),
  generatedBlueprint: z.record(z.any()).default({}),
  editedBlueprint: z.any().optional().nullable(),
  finalProjectDescription: z.string().optional().default(''),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must provide consent to submit this project inquiry' }),
  }),
});

const generateReferenceId = () => {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `CYN-${year}-${randomSuffix}`;
};

export const createInquiry = async (req, res) => {
  try {
    const raw = req.body || {};
    const normalized = {
      clientName: raw.clientName || raw.name || '',
      email: raw.email || '',
      phone: raw.phone || '',
      company: raw.company || '',
      projectCategory: raw.projectCategory || raw.category || '',
      discoveryAnswers: raw.discoveryAnswers || raw.answers || {},
      generatedBlueprint: raw.generatedBlueprint || raw.blueprint || {},
      editedBlueprint: raw.editedBlueprint || null,
      finalProjectDescription: raw.finalProjectDescription || raw.notes || '',
      consentGiven: raw.consentGiven === true || raw.consent === true,
    };

    const parseResult = inquirySubmissionSchema.safeParse(normalized);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please verify your details.',
        errors: parseResult.error.errors,
      });
    }

    const data = parseResult.data;

    let referenceId = generateReferenceId();
    // Ensure uniqueness
    let exists = await Inquiry.findOne({ referenceId });
    while (exists) {
      referenceId = generateReferenceId();
      exists = await Inquiry.findOne({ referenceId });
    }

    const newInquiry = new Inquiry({
      referenceId,
      clientName: data.clientName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      projectCategory: data.projectCategory,
      discoveryAnswers: data.discoveryAnswers,
      generatedBlueprint: data.generatedBlueprint,
      editedBlueprint: data.editedBlueprint,
      finalProjectDescription: data.finalProjectDescription,
      consentGiven: data.consentGiven,
      status: 'New',
    });

    await newInquiry.save();

    const inquiryPayload = {
      _id: newInquiry._id,
      referenceId: newInquiry.referenceId,
      name: newInquiry.clientName,
      clientName: newInquiry.clientName,
      email: newInquiry.email,
      phone: newInquiry.phone,
      company: newInquiry.company,
      category: newInquiry.projectCategory,
      projectCategory: newInquiry.projectCategory,
      status: newInquiry.status,
      createdAt: newInquiry.createdAt,
    };

    return res.status(201).json({
      success: true,
      message: 'Project inquiry and AI blueprint submitted successfully.',
      referenceId: newInquiry.referenceId,
      inquiry: inquiryPayload,
      data: inquiryPayload,
    });
  } catch (err) {
    console.error('Error submitting inquiry:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again later.',
      error: err.message,
    });
  }
};
