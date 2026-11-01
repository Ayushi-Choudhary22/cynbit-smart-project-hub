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
    // Primary Client & Contact Info (mirrored for backward compatibility)
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

    // Step 1: Detailed Business Information & Problem Details
    businessInfo: {
      companyName: { type: String, default: '' },
      industry: { type: String, default: '' },
      description: { type: String, default: '' },
      targetAudience: { type: String, default: '' },
      businessStage: { type: String, default: '' }, // 'Startup', 'Existing Business', 'Internal Project'
    },
    problemDetails: {
      coreProblem: { type: String, default: '' },
      difficulties: { type: String, default: '' },
      currentWorkflow: { type: String, default: '' },
      existingTools: { type: String, default: '' },
      improvementsWanted: { type: String, default: '' },
    },
    solutionRequirements: {
      desiredSolutions: [{ type: String }],
      outcomes: { type: String, default: '' },
      keyFeatures: { type: String, default: '' },
    },

    // Step 2: Discovery Answers & Generated/Refined Blueprint
    discoveryAnswers: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    generatedBlueprint: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    editedBlueprint: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    blueprintRevisions: [
      {
        revisionNumber: { type: Number, default: 1 },
        blueprint: { type: mongoose.Schema.Types.Mixed },
        changesRequested: { type: String, default: '' },
        timestamp: { type: Date, default: Date.now },
      },
    ],

    // Step 3 & 4: Visual Concept Configuration & Design Feedback
    visualConcept: {
      archetype: { type: String, default: 'saas_dashboard' },
      theme: { type: String, default: 'cynbit-teal' },
      layout: { type: String, default: 'sidebar' },
      activeScreens: [{ type: String }],
      screenData: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    designFeedback: {
      colorPreference: { type: String, default: '' },
      layoutPreference: { type: String, default: '' },
      customNotes: { type: String, default: '' },
      screenFeedback: [
        {
          screenId: { type: String },
          feedback: { type: String },
        },
      ],
      revisions: [
        {
          round: { type: Number, default: 1 },
          feedback: { type: String },
          appliedChanges: { type: mongoose.Schema.Types.Mixed },
          timestamp: { type: Date, default: Date.now },
        },
      ],
    },
    conceptApprovalStatus: {
      type: String,
      enum: ['Approved', 'Refinement Requested', 'Exploring', 'Pending Review'],
      default: 'Pending Review',
    },

    // Step 5: Engineer Consultation Booking Request
    consultation: {
      requested: { type: Boolean, default: false, index: true },
      method: { type: String, default: 'Google Meet' }, // 'Google Meet', 'Phone Call', 'WhatsApp Call', 'Email Briefing'
      preferredDate: { type: String, default: '' },
      preferredTimeRange: { type: String, default: '' },
      timeZone: { type: String, default: 'IST (UTC+5:30)' },
      discussionTopics: { type: String, default: '' },
      status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
      },
    },

    // Step 6: Budget, Timeline, and Commercial Preferences
    budget: {
      range: { type: String, default: 'Not sure yet / Need guidance' },
      currency: { type: String, default: 'INR' },
    },
    timeline: {
      range: { type: String, default: 'Flexible / No fixed deadline' },
      desiredStartDate: { type: String, default: '' },
    },
    additionalProjectInfo: {
      existingWebsite: { type: String, default: '' },
      existingSoftware: { type: String, default: '' },
      integrations: { type: String, default: '' },
      referenceUrls: { type: String, default: '' },
      additionalNotes: { type: String, default: '' },
    },
    contactDetails: {
      fullName: { type: String, default: '' },
      workEmail: { type: String, default: '' },
      phone: { type: String, default: '' },
      companyName: { type: String, default: '' },
      designation: { type: String, default: '' },
      preferredContactMethod: { type: String, default: 'Email' },
      preferredContactTime: { type: String, default: 'Flexible' },
      additionalMessage: { type: String, default: '' },
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
      default: 'Cynbit AI Solution Studio',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
