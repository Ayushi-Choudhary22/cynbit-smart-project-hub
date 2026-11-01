import Inquiry from '../models/Inquiry.js';
import { z } from 'zod';
import { generateDeterministicBlueprint } from '../services/aiBlueprintService.js';

const inquirySubmissionSchema = z.object({
  clientName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please provide a valid work email address'),
  phone: z.string().optional().default(''),
  company: z.string().optional().default(''),
  projectCategory: z.string().min(1, 'Project category is required'),
  businessInfo: z.any().optional().default({}),
  problemDetails: z.any().optional().default({}),
  solutionRequirements: z.any().optional().default({}),
  discoveryAnswers: z.any().optional().default({}),
  generatedBlueprint: z.any().optional().default({}),
  editedBlueprint: z.any().optional().nullable(),
  blueprintRevisions: z.array(z.any()).optional().default([]),
  visualConcept: z.any().optional().default({}),
  designFeedback: z.any().optional().default({}),
  conceptApprovalStatus: z.string().optional().default('Pending Review'),
  consultation: z.any().optional().default({ requested: false }),
  budget: z.any().optional().default({ range: 'Not sure yet / Need guidance', currency: 'INR' }),
  timeline: z.any().optional().default({ range: 'Flexible / No fixed deadline' }),
  additionalProjectInfo: z.any().optional().default({}),
  contactDetails: z.any().optional().default({}),
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

    const clientName = (
      raw.clientName ||
      raw.name ||
      raw.contactDetails?.fullName ||
      raw.businessInfo?.contactName ||
      ''
    ).trim();

    const email = (
      raw.email ||
      raw.contactDetails?.workEmail ||
      raw.contactDetails?.email ||
      ''
    ).trim().toLowerCase();

    const phone = (
      raw.phone ||
      raw.contactDetails?.phone ||
      ''
    ).trim();

    const company = (
      raw.company ||
      raw.businessInfo?.companyName ||
      raw.contactDetails?.companyName ||
      ''
    ).trim();

    const projectCategory = (
      raw.projectCategory ||
      raw.category ||
      (Array.isArray(raw.solutionRequirements?.desiredSolutions) && raw.solutionRequirements.desiredSolutions[0]) ||
      'AI & Digital Solutions'
    ).trim();

    const normalized = {
      clientName,
      email,
      phone,
      company,
      projectCategory,
      businessInfo: {
        companyName: company,
        industry: raw.businessInfo?.industry || raw.industry || '',
        description: raw.businessInfo?.description || raw.businessDescription || '',
        targetAudience: raw.businessInfo?.targetAudience || raw.targetAudience || '',
        businessStage: raw.businessInfo?.businessStage || raw.businessStage || 'Growing Business',
        ...raw.businessInfo,
      },
      problemDetails: {
        coreProblem: raw.problemDetails?.coreProblem || raw.problem || '',
        difficulties: raw.problemDetails?.difficulties || raw.difficulties || '',
        currentWorkflow: raw.problemDetails?.currentWorkflow || raw.currentSystem || '',
        existingTools: raw.problemDetails?.existingTools || raw.toolsInUse || '',
        improvementsWanted: raw.problemDetails?.improvementsWanted || raw.goals || '',
        ...raw.problemDetails,
      },
      solutionRequirements: {
        desiredSolutions: raw.solutionRequirements?.desiredSolutions || (raw.desiredSolutions ? [raw.desiredSolutions] : [projectCategory]),
        outcomes: raw.solutionRequirements?.outcomes || raw.outcomes || '',
        keyFeatures: raw.solutionRequirements?.keyFeatures || raw.features || '',
        ...raw.solutionRequirements,
      },
      discoveryAnswers: raw.discoveryAnswers || raw.answers || {},
      generatedBlueprint: raw.generatedBlueprint || raw.blueprint || {},
      editedBlueprint: raw.editedBlueprint || null,
      blueprintRevisions: Array.isArray(raw.blueprintRevisions) ? raw.blueprintRevisions : [],
      visualConcept: {
        archetype: raw.visualConcept?.archetype || 'saas_dashboard',
        theme: raw.visualConcept?.theme || 'cynbit-teal',
        layout: raw.visualConcept?.layout || 'sidebar',
        activeScreens: raw.visualConcept?.activeScreens || [],
        screenData: raw.visualConcept?.screenData || {},
        ...raw.visualConcept,
      },
      designFeedback: {
        colorPreference: raw.designFeedback?.colorPreference || '',
        layoutPreference: raw.designFeedback?.layoutPreference || '',
        customNotes: raw.designFeedback?.customNotes || '',
        screenFeedback: raw.designFeedback?.screenFeedback || [],
        revisions: raw.designFeedback?.revisions || [],
        ...raw.designFeedback,
      },
      conceptApprovalStatus: raw.conceptApprovalStatus || 'Pending Review',
      consultation: {
        requested: Boolean(raw.consultation?.requested || raw.consultationRequested),
        method: raw.consultation?.method || 'Google Meet',
        preferredDate: raw.consultation?.preferredDate || '',
        preferredTimeRange: raw.consultation?.preferredTimeRange || '',
        timeZone: raw.consultation?.timeZone || 'IST (UTC+5:30)',
        discussionTopics: raw.consultation?.discussionTopics || raw.consultationNotes || '',
        status: raw.consultation?.status || 'Pending',
      },
      budget: {
        range: raw.budget?.range || raw.budgetRange || (typeof raw.budget === 'string' ? raw.budget : 'Not sure yet / Need guidance'),
        currency: raw.budget?.currency || 'INR',
      },
      timeline: {
        range: raw.timeline?.range || raw.timelineRange || (typeof raw.timeline === 'string' ? raw.timeline : 'Flexible / No fixed deadline'),
        desiredStartDate: raw.timeline?.desiredStartDate || raw.desiredStartDate || '',
      },
      additionalProjectInfo: {
        existingWebsite: raw.additionalProjectInfo?.existingWebsite || raw.websiteUrl || '',
        existingSoftware: raw.additionalProjectInfo?.existingSoftware || raw.existingSoftware || '',
        integrations: raw.additionalProjectInfo?.integrations || raw.integrations || '',
        referenceUrls: raw.additionalProjectInfo?.referenceUrls || raw.referenceUrls || '',
        additionalNotes: raw.additionalProjectInfo?.additionalNotes || raw.notes || '',
        ...raw.additionalProjectInfo,
      },
      contactDetails: {
        fullName: clientName,
        workEmail: email,
        phone,
        companyName: company,
        designation: raw.contactDetails?.designation || raw.designation || '',
        preferredContactMethod: raw.contactDetails?.preferredContactMethod || 'Email',
        preferredContactTime: raw.contactDetails?.preferredContactTime || 'Flexible',
        additionalMessage: raw.contactDetails?.additionalMessage || raw.notes || '',
        ...raw.contactDetails,
      },
      finalProjectDescription: (raw.finalProjectDescription || raw.notes || '').trim(),
      consentGiven: raw.consentGiven === true || raw.consent === true || raw.consentGiven === 'true' || raw.consent === 'true',
    };

    const parseResult = inquirySubmissionSchema.safeParse(normalized);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.errors?.[0]?.message || 'Validation failed. Please verify your details.',
        errors: parseResult.error.errors,
      });
    }

    const data = parseResult.data;

    // Ensure a structured blueprint is attached (synthesizing deterministic fallback if empty)
    let blueprintToSave = data.generatedBlueprint;
    if (!blueprintToSave || typeof blueprintToSave !== 'object' || Object.keys(blueprintToSave).length === 0) {
      blueprintToSave = generateDeterministicBlueprint(data.projectCategory, {
        businessInfo: data.businessInfo,
        problemDetails: data.problemDetails,
        solutionRequirements: data.solutionRequirements,
        ...data.discoveryAnswers
      });
    }

    // Normalize blueprint keys so both legacy and modern UI field names are always populated
    const overview = blueprintToSave.projectOverview || blueprintToSave.overview || `Architectural Blueprint for ${data.clientName} - ${data.projectCategory}`;
    const problem = blueprintToSave.problemStatement || blueprintToSave.problem || data.problemDetails?.coreProblem || '';
    const solution = blueprintToSave.proposedSolution || blueprintToSave.solution || '';
    const intendedUsers = blueprintToSave.targetAudience || blueprintToSave.intendedUsers || data.businessInfo?.targetAudience || '';

    const normalizedBlueprint = {
      ...blueprintToSave,
      overview,
      projectOverview: overview,
      problem,
      problemStatement: problem,
      solution,
      proposedSolution: solution,
      intendedUsers,
      targetAudience: intendedUsers,
    };

    let referenceId = generateReferenceId();
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
      businessInfo: data.businessInfo,
      problemDetails: data.problemDetails,
      solutionRequirements: data.solutionRequirements,
      discoveryAnswers: data.discoveryAnswers,
      generatedBlueprint: normalizedBlueprint,
      editedBlueprint: data.editedBlueprint,
      blueprintRevisions: data.blueprintRevisions,
      visualConcept: data.visualConcept,
      designFeedback: data.designFeedback,
      conceptApprovalStatus: data.conceptApprovalStatus,
      consultation: data.consultation,
      budget: data.budget,
      timeline: data.timeline,
      additionalProjectInfo: data.additionalProjectInfo,
      contactDetails: data.contactDetails,
      finalProjectDescription: data.finalProjectDescription,
      consentGiven: data.consentGiven,
      status: 'New',
      source: 'Cynbit AI Solution Studio',
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
      businessInfo: newInquiry.businessInfo,
      problemDetails: newInquiry.problemDetails,
      solutionRequirements: newInquiry.solutionRequirements,
      status: newInquiry.status,
      answers: newInquiry.discoveryAnswers,
      discoveryAnswers: newInquiry.discoveryAnswers,
      blueprint: newInquiry.generatedBlueprint,
      generatedBlueprint: newInquiry.generatedBlueprint,
      visualConcept: newInquiry.visualConcept,
      designFeedback: newInquiry.designFeedback,
      conceptApprovalStatus: newInquiry.conceptApprovalStatus,
      consultation: newInquiry.consultation,
      budget: newInquiry.budget,
      timeline: newInquiry.timeline,
      contactDetails: newInquiry.contactDetails,
      createdAt: newInquiry.createdAt,
    };

    return res.status(201).json({
      success: true,
      message: 'Project inquiry and AI solution blueprint submitted successfully.',
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
