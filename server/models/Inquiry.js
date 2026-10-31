import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: 'Admin',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const inquirySchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    projectCategory: {
      type: String,
      required: [true, 'Project category is required'],
    },
    discoveryAnswers: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    generatedBlueprint: {
      overview: { type: String, default: '' },
      problem: { type: String, default: '' },
      solution: { type: String, default: '' },
      intendedUsers: { type: String, default: '' },
      functionalRequirements: { type: [String], default: [] },
      technicalConsiderations: { type: [String], default: [] },
      potentialIntegrations: { type: [String], default: [] },
      missingInformation: { type: [String], default: [] },
      clarificationQuestions: { type: [String], default: [] },
      suggestedNextSteps: { type: [String], default: [] },
      engineUsed: { type: String, default: 'deterministic-fallback' },
      generatedAt: { type: Date, default: Date.now },
    },
    editedBlueprint: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    finalProjectDescription: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Reviewing', 'Clarification Required', 'Qualified', 'Closed'],
      default: 'New',
      index: true,
    },
    internalNotes: [noteSchema],
    consentGiven: {
      type: Boolean,
      required: true,
      default: false,
    },
    source: {
      type: String,
      default: 'Smart Project Discovery Hub',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
