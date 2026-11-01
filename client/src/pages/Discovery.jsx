import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Layers,
  Cpu,
  Terminal,
  Smartphone,
  Cloud,
  BarChart,
  RefreshCw,
  Edit3,
  Copy,
  Check,
  AlertCircle,
  Send,
  Bot,
  ShieldCheck,
  Workflow,
  ExternalLink,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Building,
  DollarSign,
  Palette,
  Eye,
  Sliders,
  ChevronDown,
  ChevronUp,
  FileText,
  Printer,
  Compass,
  CheckSquare,
  MessageSquare,
  Info
} from 'lucide-react';
import { DISCOVERY_CATEGORIES } from '../data/cynbitData';
import { generateBlueprintApi, refineBlueprintApi, submitInquiryApi } from '../services/api';
import SolutionVisualizer from '../components/SolutionVisualizer';

const STORAGE_KEY = 'cynbit_ai_solution_studio_state';

// Step definitions for clean navigation
const STEPS = [
  { id: 1, title: 'Understand Business', shortTitle: 'Business' },
  { id: 2, title: 'Solution Blueprint', shortTitle: 'AI Blueprint' },
  { id: 3, title: 'Visualize Solution', shortTitle: 'Prototype' },
  { id: 4, title: 'Customize Design', shortTitle: 'Refinement' },
  { id: 5, title: 'Next Steps & Meeting', shortTitle: 'Action Path' },
  { id: 6, title: 'Commercials & Contact', shortTitle: 'Preferences' },
  { id: 7, title: 'Review & Confirmation', shortTitle: 'Confirmation' },
];

export default function Discovery() {
  // Main Step state (1 to 7)
  const [currentStep, setCurrentStep] = useState(1);
  const [step1SubStage, setStep1SubStage] = useState('info'); // 'info' | 'problem' | 'solution'

  // Step 1: Business Information state
  const [businessInfo, setBusinessInfo] = useState({
    companyName: '',
    industry: '',
    description: '',
    targetAudience: '',
    businessStage: 'Existing Business',
  });

  // Step 1: Problem Details state
  const [problemDetails, setProblemDetails] = useState({
    coreProblem: '',
    difficulties: '',
    currentWorkflow: '',
    existingTools: '',
    improvementsWanted: '',
  });

  // Step 1: Desired Solution state
  const [solutionRequirements, setSolutionRequirements] = useState({
    desiredSolutions: ['Website or web application'],
    outcomes: '',
    keyFeatures: '',
    category: 'Website or web application',
  });

  // Step 2: Blueprint State
  const [blueprint, setBlueprint] = useState(null);
  const [isGeneratingBlueprint, setIsGeneratingBlueprint] = useState(false);
  const [blueprintError, setBlueprintError] = useState('');
  const [blueprintExpandedSections, setBlueprintExpandedSections] = useState({
    overview: true,
    modules: true,
    workflows: true,
    architecture: true,
    security: true,
    phases: true,
  });
  const [isEditingBlueprint, setIsEditingBlueprint] = useState(false);
  const [editedBlueprint, setEditedBlueprint] = useState({});
  const [refinementInput, setRefinementInput] = useState('');
  const [isRefiningBlueprint, setIsRefiningBlueprint] = useState(false);
  const [blueprintRevisions, setBlueprintRevisions] = useState([]);

  // Step 3 & 4: Visual Concept Customization state
  const [visualCustomization, setVisualCustomization] = useState({
    colorPreference: 'cynbit-teal',
    layoutPreference: 'sidebar',
    customNotes: '',
    approved: false,
    selectedScreenFeedback: { screenId: 'dashboard', notes: '' },
    revisions: [],
  });

  // Step 5: Choose How to Proceed
  const [proceedOption, setProceedOption] = useState('inquiry'); // 'consultation' | 'inquiry' | 'explore'
  const [consultationDetails, setConsultationDetails] = useState({
    requested: false,
    method: 'Google Meet',
    preferredDate: '',
    preferredTimeRange: 'Morning (10:00 AM – 01:00 PM)',
    timeZone: 'IST (UTC+5:30)',
    discussionTopics: '',
  });

  // Step 6: Budget, Timeline & Contact details
  const [currency, setCurrency] = useState('INR');
  const [budgetRange, setBudgetRange] = useState('₹1,00,000–₹3,00,000');
  const [timelineRange, setTimelineRange] = useState('1–3 months');
  const [desiredStartDate, setDesiredStartDate] = useState('');
  const [additionalProjectInfo, setAdditionalProjectInfo] = useState({
    existingWebsite: '',
    existingSoftware: '',
    integrations: '',
    referenceUrls: '',
    additionalNotes: '',
  });

  const [contactDetails, setContactDetails] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    companyName: '',
    designation: '',
    preferredContactMethod: 'Email',
    preferredContactTime: 'Flexible',
    additionalMessage: '',
  });

  const [consentGiven, setConsentGiven] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [showBriefModal, setShowBriefModal] = useState(false);

  // Restore state from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.businessInfo) setBusinessInfo(parsed.businessInfo);
        if (parsed.problemDetails) setProblemDetails(parsed.problemDetails);
        if (parsed.solutionRequirements) setSolutionRequirements(parsed.solutionRequirements);
        if (parsed.blueprint) {
          setBlueprint(parsed.blueprint);
          setEditedBlueprint(parsed.blueprint);
        }
        if (parsed.visualCustomization) setVisualCustomization(parsed.visualCustomization);
        if (parsed.consultationDetails) setConsultationDetails(parsed.consultationDetails);
        if (parsed.budgetRange) setBudgetRange(parsed.budgetRange);
        if (parsed.timelineRange) setTimelineRange(parsed.timelineRange);
        if (parsed.contactDetails) setContactDetails(parsed.contactDetails);
        if (parsed.currentStep && parsed.currentStep < 7) {
          setCurrentStep(parsed.currentStep);
        }
      }
    } catch (e) {
      console.warn('Could not restore saved studio session', e);
    }
  }, []);

  // Auto-save state
  useEffect(() => {
    try {
      if (currentStep < 7) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            currentStep,
            businessInfo,
            problemDetails,
            solutionRequirements,
            blueprint,
            visualCustomization,
            consultationDetails,
            budgetRange,
            timelineRange,
            contactDetails,
          })
        );
      }
    } catch (e) {
      console.warn('Could not save studio session', e);
    }
  }, [
    currentStep,
    businessInfo,
    problemDetails,
    solutionRequirements,
    blueprint,
    visualCustomization,
    consultationDetails,
    budgetRange,
    timelineRange,
    contactDetails,
  ]);

  // Industry quick selection options
  const INDUSTRIES = [
    'Healthcare & Telemedicine',
    'E-Commerce & Retail',
    'FinTech & Banking',
    'Real Estate & PropTech',
    'Education & EdTech',
    'Logistics & Supply Chain',
    'AI & Automation',
    'Pet Care & Veterinary',
    'Professional Services',
    'Hospitality & Travel',
    'Other Industry',
  ];

  // Solution capabilities
  const SOLUTION_OPTIONS = [
    'Website or web application',
    'Mobile application (iOS/Android)',
    'AI automation & cognitive workflows',
    'Autonomous AI agents',
    'Business process automation',
    'SaaS product',
    'Cloud infrastructure & DevOps',
    'Existing software modernization',
    'Data & analytics platform',
    'Digital transformation',
    'Not sure yet / Need expert guidance',
  ];

  // Budget configurations
  const BUDGET_OPTIONS_INR = [
    'Under ₹50,000',
    '₹50,000–₹1,00,000',
    '₹1,00,000–₹3,00,000',
    '₹3,00,000–₹5,00,000',
    '₹5,00,000+',
    'Not sure yet / Need guidance',
  ];

  const BUDGET_OPTIONS_USD = [
    'Under $1,000',
    '$1,000–$2,500',
    '$2,500–$5,000',
    '$5,000–$10,000',
    '$10,000+',
    'Not sure yet / Need guidance',
  ];

  const TIMELINE_OPTIONS = [
    'Within 1 month',
    '1–3 months',
    '3–6 months',
    'More than 6 months',
    'Flexible / No fixed deadline',
  ];

  // Generate or regenerate blueprint
  const handleGenerateBlueprint = async () => {
    setIsGeneratingBlueprint(true);
    setBlueprintError('');

    try {
      const primaryCategory = solutionRequirements.desiredSolutions?.[0] || 'Web Application & AI Automation';
      const combinedAnswers = {
        businessInfo,
        problemDetails,
        solutionRequirements,
        companyName: businessInfo.companyName,
        industry: businessInfo.industry,
        problem: problemDetails.coreProblem,
        difficulties: problemDetails.difficulties,
        currentSystem: problemDetails.currentWorkflow,
        toolsInUse: problemDetails.existingTools,
        goals: problemDetails.improvementsWanted,
        features: solutionRequirements.keyFeatures,
        targetAudience: businessInfo.targetAudience,
      };

      const res = await generateBlueprintApi(primaryCategory, combinedAnswers);
      if (res.success && res.blueprint) {
        setBlueprint(res.blueprint);
        setEditedBlueprint(res.blueprint);
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setBlueprintError(res.message || 'Failed to generate blueprint. Please try again.');
      }
    } catch (err) {
      console.error('Error generating blueprint:', err);
      setBlueprintError(err.message || 'Network error while contacting AI Blueprint engine.');
    } finally {
      setIsGeneratingBlueprint(false);
    }
  };

  // Refine Blueprint based on visitor modifications
  const handleRefineBlueprint = async () => {
    if (!refinementInput.trim()) return;
    setIsRefiningBlueprint(true);
    setBlueprintError('');

    try {
      const primaryCategory = solutionRequirements.desiredSolutions?.[0] || 'Web Application & AI Automation';
      const combinedAnswers = {
        businessInfo,
        problemDetails,
        solutionRequirements,
      };

      const res = await refineBlueprintApi(primaryCategory, combinedAnswers, refinementInput.trim());
      if (res.success && res.blueprint) {
        // Record revision history
        const newRev = {
          revisionNumber: blueprintRevisions.length + 1,
          blueprint,
          changesRequested: refinementInput.trim(),
          timestamp: new Date().toISOString(),
        };
        setBlueprintRevisions(prev => [...prev, newRev]);
        setBlueprint(res.blueprint);
        setEditedBlueprint(res.blueprint);
        setRefinementInput('');
      } else {
        setBlueprintError(res.message || 'Failed to refine blueprint.');
      }
    } catch (err) {
      console.error('Error refining blueprint:', err);
      setBlueprintError(err.message || 'Error communicating with refinement service.');
    } finally {
      setIsRefiningBlueprint(false);
    }
  };

  // Toggle multi-select solution
  const toggleSolution = (sol) => {
    setSolutionRequirements(prev => {
      const exists = prev.desiredSolutions.includes(sol);
      const updated = exists
        ? prev.desiredSolutions.filter(s => s !== sol)
        : [...prev.desiredSolutions, sol];
      return {
        ...prev,
        desiredSolutions: updated.length > 0 ? updated : [sol],
      };
    });
  };

  // Handle final submission to MongoDB Atlas
  const handleSubmitInquiry = async () => {
    const errors = {};
    const nameToValidate = contactDetails.fullName || businessInfo.companyName;
    if (!nameToValidate || nameToValidate.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }
    if (!contactDetails.workEmail || !contactDetails.workEmail.includes('@')) {
      errors.workEmail = 'Please provide a valid work email address';
    }
    if (!consentGiven) {
      errors.consent = 'You must provide consent to submit this project brief to Cynbit';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitError('Please correct the highlighted fields before submitting.');
      return;
    }

    setFormErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const payload = {
        clientName: contactDetails.fullName || businessInfo.companyName,
        email: contactDetails.workEmail,
        phone: contactDetails.phone,
        company: businessInfo.companyName || contactDetails.companyName,
        projectCategory: solutionRequirements.desiredSolutions?.[0] || 'AI & Digital Solutions',
        businessInfo,
        problemDetails,
        solutionRequirements,
        discoveryAnswers: {
          businessInfo,
          problemDetails,
          solutionRequirements,
        },
        generatedBlueprint: blueprint,
        editedBlueprint: isEditingBlueprint ? editedBlueprint : null,
        blueprintRevisions,
        visualConcept: {
          archetype: blueprint?.suggestedArchetype || 'saas_dashboard',
          theme: visualCustomization.colorPreference,
          layout: visualCustomization.layoutPreference,
          activeScreens: blueprint?.suggestedScreens?.map(s => s.name) || [],
          customizations: visualCustomization,
        },
        designFeedback: visualCustomization,
        conceptApprovalStatus: visualCustomization.approved
          ? 'Approved'
          : proceedOption === 'explore'
          ? 'Exploring'
          : 'Pending Review',
        consultation: {
          requested: proceedOption === 'consultation' || consultationDetails.requested,
          method: consultationDetails.method,
          preferredDate: consultationDetails.preferredDate,
          preferredTimeRange: consultationDetails.preferredTimeRange,
          timeZone: consultationDetails.timeZone,
          discussionTopics: consultationDetails.discussionTopics,
          status: 'Pending',
        },
        budget: {
          range: budgetRange,
          currency,
        },
        timeline: {
          range: timelineRange,
          desiredStartDate,
        },
        additionalProjectInfo,
        contactDetails,
        consentGiven: true,
        source: 'Cynbit AI Solution Studio',
      };

      const res = await submitInquiryApi(payload);

      if (res.success) {
        setSubmissionResult({
          referenceId: res.referenceId,
          ...res.inquiry,
        });
        setCurrentStep(7);
        // Clear saved session upon confirmed submission
        localStorage.removeItem(STORAGE_KEY);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(res.message || 'Submission failed. Please check your network and try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Failed to submit inquiry to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-cynbit-light dark:bg-cynbit-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cynbit-teal/5 dark:bg-cynbit-teal/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 space-y-8">
        
        {/* Studio Header & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal dark:text-cynbit-cyan text-xs font-mono font-bold tracking-wider uppercase border border-cynbit-teal/20">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Cynbit AI Solution Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Enterprise Engine</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-headline tracking-tight text-slate-900 dark:text-white">
            Let's understand your business <br className="hidden md:block" />
            <span className="text-gradient-primary">before we build your solution.</span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Tell us about your business, your current challenges and what you want to achieve.
            Our AI-assisted discovery process will help identify opportunities, propose a structured architecture blueprint,
            and visualize what we could build for you.
          </p>
        </div>

        {/* Studio Multi-Stage Progress Stepper */}
        <div className="p-3 md:p-4 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-none gap-2">
            {STEPS.map((step) => {
              const isPassed = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  disabled={currentStep < step.id && !blueprint}
                  onClick={() => {
                    if (step.id <= currentStep || (step.id <= 4 && blueprint)) {
                      setCurrentStep(step.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-cynbit-teal text-white shadow-md shadow-cynbit-teal/20 scale-105'
                      : isPassed
                      ? 'text-cynbit-teal dark:text-cynbit-cyan bg-cynbit-teal/5 dark:bg-white/5 hover:bg-cynbit-teal/10'
                      : 'text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-white text-cynbit-teal'
                        : isPassed
                        ? 'bg-cynbit-teal text-white'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : step.id}
                  </div>
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{step.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: UNDERSTAND CUSTOMER'S BUSINESS */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Step 1 Sub-Navigation Tabs */}
            <div className="flex items-center justify-center gap-3">
              {[
                { id: 'info', label: '1. Business Info' },
                { id: 'problem', label: '2. Business Problem & Process' },
                { id: 'solution', label: '3. Desired Solution & Outcomes' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setStep1SubStage(sub.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    step1SubStage === sub.id
                      ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-xs'
                      : 'bg-white dark:bg-cynbit-card text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cynbit-teal/30'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Sub-Stage 1A: Business Information */}
            {step1SubStage === 'info' && (
              <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-widest block mb-1">
                    Stage 1A • Profile & Industry
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Tell us about your organization
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Understanding your operational sector enables our architecture engine to apply relevant security and compliance models.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Company or Business Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={businessInfo.companyName}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, companyName: e.target.value })}
                      placeholder="e.g. Acme Health, Urban Wardrobe, NextGen Logistics"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Business Stage <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={businessInfo.businessStage}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, businessStage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    >
                      <option value="Startup">Early-Stage Startup (0–2 years)</option>
                      <option value="Existing Business">Established Growing Business (Scaling operations)</option>
                      <option value="Internal Project">Internal Corporate Department Project</option>
                      <option value="Enterprise">Enterprise Transformation</option>
                    </select>
                  </div>
                </div>

                {/* Industry Selection Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    What industry do you operate in? <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => setBusinessInfo({ ...businessInfo, industry: ind })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                          businessInfo.industry === ind
                            ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-xs'
                            : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cynbit-teal/40'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Briefly describe your business and its core operations
                  </label>
                  <textarea
                    rows={3}
                    value={businessInfo.description}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                    placeholder="e.g. We provide veterinary consultations and premium pet nutritional supplements across North India through physical clinics and direct-to-consumer delivery."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Who are your primary customers or intended users?
                  </label>
                  <input
                    type="text"
                    value={businessInfo.targetAudience}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, targetAudience: e.target.value })}
                    placeholder="e.g. Pet parents, clinic veterinary doctors, warehouse inventory staff, and retail store managers"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep1SubStage('problem')}
                    className="px-6 py-3 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2 hover:bg-cynbit-cyan transition-all shadow-md"
                  >
                    <span>Continue to Business Problem</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Sub-Stage 1B: Business Problem & Current Setup */}
            {step1SubStage === 'problem' && (
              <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-widest block mb-1">
                    Stage 1B • Problem & Current Friction
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    What challenges are you trying to solve?
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cynbit's engineering philosophy begins by isolating invisible friction before proposing code.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    What core problem are you trying to solve? <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={problemDetails.coreProblem}
                    onChange={(e) => setProblemDetails({ ...problemDetails, coreProblem: e.target.value })}
                    placeholder="e.g. Customer appointments are booked over WhatsApp chats, leading to double-booked doctors, lost medical records, and zero automated reminders."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    What specific difficulties or bottlenecks does your team face today?
                  </label>
                  <textarea
                    rows={2}
                    value={problemDetails.difficulties}
                    onChange={(e) => setProblemDetails({ ...problemDetails, difficulties: e.target.value })}
                    placeholder="e.g. 3 staff members spend 4 hours every day manually copying client data into spreadsheets. We have no centralized medical records."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      How are you managing this process today?
                    </label>
                    <input
                      type="text"
                      value={problemDetails.currentWorkflow}
                      onChange={(e) => setProblemDetails({ ...problemDetails, currentWorkflow: e.target.value })}
                      placeholder="e.g. Manual phone calls, WhatsApp chats, paper registers"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Are you using any existing software, tools or systems?
                    </label>
                    <input
                      type="text"
                      value={problemDetails.existingTools}
                      onChange={(e) => setProblemDetails({ ...problemDetails, existingTools: e.target.value })}
                      placeholder="e.g. Google Sheets, Tally ERP, WordPress, Razorpay, Zoho"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    What would you like to improve most?
                  </label>
                  <input
                    type="text"
                    value={problemDetails.improvementsWanted}
                    onChange={(e) => setProblemDetails({ ...problemDetails, improvementsWanted: e.target.value })}
                    placeholder="e.g. 100% automated booking with SMS alerts, zero double bookings, and unified digital patient records"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep1SubStage('info')}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Business Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep1SubStage('solution')}
                    className="px-6 py-3 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2 hover:bg-cynbit-cyan transition-all shadow-md"
                  >
                    <span>Continue to Desired Solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Sub-Stage 1C: Desired Solution & Outcomes */}
            {step1SubStage === 'solution' && (
              <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-widest block mb-1">
                    Stage 1C • Architectural Scope & Features
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    What kind of solution should Cynbit build?
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select all capabilities that apply. Our AI engine will adapt the architecture blueprint accordingly.
                  </p>
                </div>

                {/* Multi-select Capabilities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {SOLUTION_OPTIONS.map((sol) => {
                    const isSelected = solutionRequirements.desiredSolutions.includes(sol);
                    return (
                      <button
                        key={sol}
                        type="button"
                        onClick={() => toggleSolution(sol)}
                        className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-cynbit-teal/10 dark:bg-cynbit-teal/20 border-cynbit-teal text-cynbit-teal dark:text-cynbit-cyan shadow-xs'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-cynbit-teal/30'
                        }`}
                      >
                        <span className="text-xs font-semibold">{sol}</span>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-cynbit-teal border-cynbit-teal text-white'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    What key features or modules are most important to you?
                  </label>
                  <textarea
                    rows={3}
                    value={solutionRequirements.keyFeatures}
                    onChange={(e) => setSolutionRequirements({ ...solutionRequirements, keyFeatures: e.target.value })}
                    placeholder="e.g. Online appointment scheduling, pet health record dashboard, automated SMS reminders, Razorpay payments, and admin clinic reporting"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    What are your desired business outcomes or success criteria?
                  </label>
                  <input
                    type="text"
                    value={solutionRequirements.outcomes}
                    onChange={(e) => setSolutionRequirements({ ...solutionRequirements, outcomes: e.target.value })}
                    placeholder="e.g. Cut appointment no-shows by 50%, eliminate manual phone booking chaos, and double patient consultation capacity"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>

                {blueprintError && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{blueprintError}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep1SubStage('problem')}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Problem
                  </button>

                  <button
                    type="button"
                    disabled={isGeneratingBlueprint}
                    onClick={handleGenerateBlueprint}
                    className="px-8 py-3.5 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2.5 hover:bg-cynbit-cyan transition-all shadow-lg shadow-cynbit-teal/20 active:scale-95 disabled:opacity-50"
                  >
                    {isGeneratingBlueprint ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Architecting Blueprint with Gemini AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Solution Blueprint →</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: AI BUSINESS ANALYSIS & SOLUTION BLUEPRINT */}
        {/* ========================================================================= */}
        {currentStep === 2 && blueprint && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header with Engine Disclosure */}
            <div className="p-6 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-wider">
                    Stage 2 • Architectural Blueprint
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cynbit-teal/10 text-cynbit-teal border border-cynbit-teal/20">
                    {blueprint.engineUsed || 'Google Gemini 3.5 Flash Lite'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Bespoke Solution Blueprint for {businessInfo.companyName || 'Your Business'}
                </h2>
                <p className="text-xs text-slate-500">
                  Synthesized using Cynbit's 6-Stage Lifecycle. Review proposed modules, user workflows, and technology architecture.
                </p>
              </div>

              {/* Action Buttons: Edit / Regenerate / Proceed */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingBlueprint(!isEditingBlueprint)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 hover:border-cynbit-teal"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingBlueprint ? 'Save Edits' : 'Edit Blueprint'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(3);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-cynbit-teal text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-cynbit-teal/20 hover:bg-cynbit-cyan transition-all"
                >
                  <span>Visualize Proposed Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Blueprint Legend Badges */}
            <div className="flex flex-wrap items-center gap-3 px-2 text-xs">
              <span className="text-slate-400 font-mono text-[10px] uppercase font-bold">Confidence Badges:</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                ● Confirmed by You
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                ✦ AI Engineering Recommendation
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                ▲ Clarification Required in Discovery Call
              </span>
            </div>

            {/* Blueprint Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Executive Overview & Solution Direction */}
              <div className="p-6 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-cynbit-teal" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                      Executive Overview &amp; Strategy
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Strategic Overview</span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium pt-0.5">
                      {blueprint.projectOverview || blueprint.overview}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Core Problem Being Addressed</span>
                    <p className="text-slate-700 dark:text-slate-300 pt-0.5">
                      {blueprint.coreProblem || blueprint.problemStatement || blueprint.problem}
                    </p>
                  </div>

                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase block font-bold">
                      ✦ Proposed Solution Direction
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium pt-0.5">
                      {blueprint.proposedSolution || blueprint.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Target Users & Functional Modules */}
              <div className="p-6 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cynbit-teal" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                      Core Functional Modules
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    ✦ AI Architecture
                  </span>
                </div>

                <div className="space-y-3">
                  {(blueprint.functionalModules && Array.isArray(blueprint.functionalModules)
                    ? blueprint.functionalModules
                    : (blueprint.functionalRequirements || []).map(f => ({ name: f.split(':')[0] || 'Module', description: f.split(':')[1] || f, priority: 'Core' }))
                  ).map((m, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          m.priority === 'Core'
                            ? 'bg-cynbit-teal/10 text-cynbit-teal'
                            : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                        }`}>
                          {m.priority || 'Core'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Workflows */}
              <div className="p-6 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-cynbit-teal" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                      Primary User Workflows
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {(blueprint.userWorkflows || [
                    { title: 'Customer Onboarding & Order Flow', steps: ['Access portal', 'Input requirements', 'Instant validation', 'Automated dispatch'] },
                    { title: 'Operational Fulfillment', steps: ['Centralized dashboard', 'Rule-based assignment', 'Status sync', 'Telemetry audit'] }
                  ]).map((wf, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cynbit-teal" />
                        <span>{wf.title}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {wf.steps?.map((step, sIdx) => (
                          <div key={sIdx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <span className="font-mono font-bold text-cynbit-teal">{sIdx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Architecture & Stack */}
              <div className="p-6 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cynbit-teal" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                      Recommended Tech Architecture
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    ✦ Production Ready
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {blueprint.techArchitecture ? (
                    <>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Frontend Architecture</span>
                        <p className="text-slate-800 dark:text-slate-200 font-semibold">{blueprint.techArchitecture.frontend?.join(' • ')}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Backend Microservices</span>
                        <p className="text-slate-800 dark:text-slate-200 font-semibold">{blueprint.techArchitecture.backend?.join(' • ')}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Database &amp; Data Pipeline</span>
                        <p className="text-slate-800 dark:text-slate-200 font-semibold">{blueprint.techArchitecture.database?.join(' • ')}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Cloud, DevOps &amp; CI/CD</span>
                        <p className="text-slate-800 dark:text-slate-200 font-semibold">{blueprint.techArchitecture.cloudAndDevops?.join(' • ')}</p>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1">
                      {blueprint.technicalConsiderations?.map((item, idx) => (
                        <p key={idx} className="text-slate-700 dark:text-slate-300">• {item}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Implementation Phases & Suggested Next Steps */}
              <div className="p-6 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm space-y-4 md:col-span-2">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cynbit-teal" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                      Delivery Phases &amp; Milestones (Cynbit 6-Stage Lifecycle)
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {(blueprint.implementationPhases || [
                    { phase: 'Phase 1', title: 'UX & API Specs', durationEstimate: '1–2 Weeks', deliverables: ['Figma wireframes', 'API schemas'] },
                    { phase: 'Phase 2', title: 'Backend Core', durationEstimate: '3–4 Weeks', deliverables: ['Data models', 'Auth & Workflows'] },
                    { phase: 'Phase 3', title: 'Frontend Suite', durationEstimate: '2–3 Weeks', deliverables: ['Responsive UI', 'Integrations'] },
                    { phase: 'Phase 4', title: 'QA & Cutover', durationEstimate: '1–2 Weeks', deliverables: ['Stress testing', 'Live DNS Launch'] },
                  ]).map((ph, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cynbit-teal">{ph.phase}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{ph.durationEstimate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ph.title}</h4>
                      <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                        {ph.deliverables?.map((d, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-cynbit-teal" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Request Modifications / Blueprint Refinement Box */}
            <div className="p-6 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-cynbit-teal" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Want to request modifications to this blueprint?
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Enter your feedback (e.g., "Add automated WhatsApp appointment reminders and support for multi-branch clinics").
                Our engine will update the blueprint while preserving your original answers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={refinementInput}
                  onChange={(e) => setRefinementInput(e.target.value)}
                  placeholder="Type requested changes to the blueprint..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-cynbit-card text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                />
                <button
                  type="button"
                  disabled={isRefiningBlueprint || !refinementInput.trim()}
                  onClick={handleRefineBlueprint}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
                >
                  {isRefiningBlueprint ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Refining Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Regenerate Blueprint</span>
                    </>
                  )}
                </button>
              </div>

              {blueprintRevisions.length > 0 && (
                <div className="text-[11px] text-slate-500 font-mono">
                  ✦ {blueprintRevisions.length} modification revision(s) recorded in session history.
                </div>
              )}
            </div>

            {/* Bottom Step Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Business Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cynbit-teal/20 hover:bg-cynbit-cyan transition-all"
              >
                <span>Proceed to Step 3: Visualize Proposed Solution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3 & STEP 4: VISUALIZE AND CUSTOMIZE PROPOSED SOLUTION */}
        {/* ========================================================================= */}
        {(currentStep === 3 || currentStep === 4) && (
          <div className="space-y-8 animate-fadeIn">
            {/* Visual Concept Renderer */}
            <SolutionVisualizer
              blueprint={blueprint}
              businessInfo={businessInfo}
              problemDetails={problemDetails}
              solutionRequirements={solutionRequirements}
              currentFeedback={visualCustomization}
              onFeedbackChange={(fb) => setVisualCustomization(fb)}
            />

            {/* Step 4: Customization & Feedback Section */}
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-widest block mb-1">
                  Step 4 • Concept Feedback &amp; Refinement
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  How does your solution look to you?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select quick design preferences or leave screen-specific notes. Your adjustments are recorded for Cynbit's engineering team.
                </p>
              </div>

              {/* Quick Choice Buttons */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  {
                    label: '✦ I like this design (Approve Concept)',
                    action: () => setVisualCustomization(prev => ({ ...prev, approved: true }))
                  },
                  {
                    label: '🌙 Midnight Onyx Dark Theme',
                    action: () => setVisualCustomization(prev => ({ ...prev, colorPreference: 'midnight' }))
                  },
                  {
                    label: '🌊 Cynbit Teal Theme',
                    action: () => setVisualCustomization(prev => ({ ...prev, colorPreference: 'cynbit-teal' }))
                  },
                  {
                    label: '⚡ Enable 15-Minute Slot Intervals',
                    action: () => setVisualCustomization(prev => ({
                      ...prev,
                      customNotes: prev.customNotes ? `${prev.customNotes}. Please configure 15-minute appointment slot intervals.` : 'Enable 15-minute appointment slot intervals for veterinary bookings.'
                    }))
                  },
                  {
                    label: '🚨 Add 24/7 Emergency Telehealth Hotline',
                    action: () => setVisualCustomization(prev => ({
                      ...prev,
                      customNotes: prev.customNotes ? `${prev.customNotes}. Add 24/7 emergency telehealth triage hotline.` : 'Add 24/7 emergency telehealth triage hotline.'
                    }))
                  },
                  {
                    label: '🥫 Add Clinical Nutrition Store',
                    action: () => setVisualCustomization(prev => ({
                      ...prev,
                      customNotes: prev.customNotes ? `${prev.customNotes}. Include clinical nutrition and food store.` : 'Include clinical nutrition prescription food subscription store.'
                    }))
                  },
                ].map((choice, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={choice.action}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-cynbit-teal hover:bg-cynbit-teal/5 transition-all"
                  >
                    {choice.label}
                  </button>
                ))}
              </div>

              {/* Additional Custom Instructions Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Additional Design or Feature Instructions
                </label>
                <textarea
                  rows={3}
                  value={visualCustomization.customNotes}
                  onChange={(e) => setVisualCustomization({ ...visualCustomization, customNotes: e.target.value })}
                  placeholder="e.g. On the appointments screen, show morning slots first. Use our company logo colors (deep blue and crisp white). Keep the client dashboard extremely clean."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                />
              </div>

              {/* Approval status banner */}
              {visualCustomization.approved && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold">Concept marked as Approved by you. Proceed to choose your next step.</span>
                </div>
              )}

              {/* Navigation to Step 5 */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Blueprint
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(5);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cynbit-teal/20 hover:bg-cynbit-cyan transition-all"
                >
                  <span>Continue to Step 5: Choose How to Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: CHOOSE HOW TO PROCEED */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-widest block mb-1">
                Step 5 • Engagement Path
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                How would you like to proceed?
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose the engagement model that matches where you are in your project journey.
              </p>
            </div>

            {/* 3 Clear Path Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Option A: Request Engineer Consultation */}
              <div
                onClick={() => setProceedOption('consultation')}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all space-y-4 flex flex-col justify-between ${
                  proceedOption === 'consultation'
                    ? 'border-cynbit-teal bg-cynbit-teal/5 dark:bg-cynbit-teal/15 shadow-md'
                    : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:border-cynbit-teal/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal dark:text-cynbit-cyan flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Option A: Request Engineer Consultation
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Discuss your solution blueprint directly with Cynbit's senior architects via video call or phone.
                  </p>
                </div>
                <div className="text-[11px] font-mono font-bold text-cynbit-teal">
                  ✦ Recommended for custom architectures
                </div>
              </div>

              {/* Option B: Submit Project Inquiry */}
              <div
                onClick={() => setProceedOption('inquiry')}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all space-y-4 flex flex-col justify-between ${
                  proceedOption === 'inquiry'
                    ? 'border-cynbit-teal bg-cynbit-teal/5 dark:bg-cynbit-teal/15 shadow-md'
                    : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:border-cynbit-teal/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Option B: Submit Project Inquiry
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ready to share your budget and timeline preferences. Cynbit will review and dispatch formal commercial milestones.
                  </p>
                </div>
                <div className="text-[11px] font-mono font-bold text-blue-600">
                  ✦ Fast-track proposal delivery
                </div>
              </div>

              {/* Option C: I'm Still Exploring */}
              <div
                onClick={() => setProceedOption('explore')}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all space-y-4 flex flex-col justify-between ${
                  proceedOption === 'explore'
                    ? 'border-cynbit-teal bg-cynbit-teal/5 dark:bg-cynbit-teal/15 shadow-md'
                    : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:border-cynbit-teal/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Option C: I'm Still Exploring
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Save your generated concept and blueprint brief. We will keep your architectural record ready when you decide to proceed.
                  </p>
                </div>
                <div className="text-[11px] font-mono font-bold text-purple-600">
                  ✦ Zero commitment exploratory record
                </div>
              </div>

            </div>

            {/* Option A Detailed Meeting Selector (if Option A chosen) */}
            {proceedOption === 'consultation' && (
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cynbit-teal" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Schedule Your Technical Discovery Session
                  </h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Please specify your preferred date and time. Note: Meeting slots are subject to confirmation by Cynbit engineering.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Preferred Meeting Format
                    </label>
                    <select
                      value={consultationDetails.method}
                      onChange={(e) => setConsultationDetails({ ...consultationDetails, method: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-cynbit-card text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    >
                      <option value="Google Meet">Google Meet (Screen-share Architecture)</option>
                      <option value="Phone Call">Direct Phone Call</option>
                      <option value="WhatsApp Call">WhatsApp Voice Call</option>
                      <option value="Email Briefing">Detailed Email Technical Briefing</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={consultationDetails.preferredDate}
                      onChange={(e) => setConsultationDetails({ ...consultationDetails, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-cynbit-card text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Preferred Time Window
                    </label>
                    <select
                      value={consultationDetails.preferredTimeRange}
                      onChange={(e) => setConsultationDetails({ ...consultationDetails, preferredTimeRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-cynbit-card text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    >
                      <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM IST)</option>
                      <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (02:00 PM – 05:00 PM IST)</option>
                      <option value="Evening (06:00 PM – 08:30 PM)">Evening (06:00 PM – 08:30 PM IST)</option>
                      <option value="Flexible Window">Flexible Window (Anytime during business hours)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    What would you specifically like to discuss with the engineer?
                  </label>
                  <input
                    type="text"
                    value={consultationDetails.discussionTopics}
                    onChange={(e) => setConsultationDetails({ ...consultationDetails, discussionTopics: e.target.value })}
                    placeholder="e.g. Database schema migration, WhatsApp API rate limits, and zero-downtime cutover timeline"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-cynbit-card text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>
              </div>
            )}

            {/* Navigation to Step 6 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Customization
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(6);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cynbit-teal/20 hover:bg-cynbit-cyan transition-all"
              >
                <span>Continue to Step 6: Budget &amp; Contact Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 6: PROJECT BUDGET, TIMELINE AND CONTACT DETAILS */}
        {/* ========================================================================= */}
        {currentStep === 6 && (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-widest block mb-1">
                Step 6 • Commercials &amp; Contact
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Project budget, timeline and your contact details
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transparent commercial expectations help us assemble the right engineering squad.
              </p>
            </div>

            {/* Budget Preference Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  What is your estimated project budget?
                </label>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-lg text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setCurrency('INR')}
                    className={`px-2 py-0.5 rounded font-bold ${currency === 'INR' ? 'bg-cynbit-teal text-white' : 'text-slate-500'}`}
                  >
                    INR (₹)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-2 py-0.5 rounded font-bold ${currency === 'USD' ? 'bg-cynbit-teal text-white' : 'text-slate-500'}`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(currency === 'INR' ? BUDGET_OPTIONS_INR : BUDGET_OPTIONS_USD).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudgetRange(b)}
                    className={`p-3.5 rounded-2xl text-left border text-xs font-semibold transition-all ${
                      budgetRange === b
                        ? 'bg-cynbit-teal/10 dark:bg-cynbit-teal/20 border-cynbit-teal text-cynbit-teal dark:text-cynbit-cyan shadow-xs'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-cynbit-teal/40'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">
                * Selected budget is an estimated planning range, not a binding final quote.
              </p>
            </div>

            {/* Timeline Preference Cards */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                When would you like your project to be completed?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {TIMELINE_OPTIONS.map((tl) => (
                  <button
                    key={tl}
                    type="button"
                    onClick={() => setTimelineRange(tl)}
                    className={`p-3.5 rounded-2xl text-left border text-xs font-semibold transition-all ${
                      timelineRange === tl
                        ? 'bg-cynbit-teal/10 dark:bg-cynbit-teal/20 border-cynbit-teal text-cynbit-teal dark:text-cynbit-cyan shadow-xs'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-cynbit-teal/40'
                    }`}
                  >
                    {tl}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details Form */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-cynbit-teal">
                Your Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactDetails.fullName}
                    onChange={(e) => setContactDetails({ ...contactDetails, fullName: e.target.value })}
                    placeholder="e.g. Mohak Saini"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                  {formErrors.fullName && <p className="text-[11px] text-rose-500">{formErrors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={contactDetails.workEmail}
                    onChange={(e) => setContactDetails({ ...contactDetails, workEmail: e.target.value })}
                    placeholder="e.g. name@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                  {formErrors.workEmail && <p className="text-[11px] text-rose-500">{formErrors.workEmail}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone Number (with Country Code)
                  </label>
                  <input
                    type="tel"
                    value={contactDetails.phone}
                    onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                    placeholder="e.g. +91 98290 12345"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Designation or Role
                  </label>
                  <input
                    type="text"
                    value={contactDetails.designation}
                    onChange={(e) => setContactDetails({ ...contactDetails, designation: e.target.value })}
                    placeholder="e.g. Founder, CTO, Operations Head, Product Manager"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Preferred Contact Channel
                  </label>
                  <select
                    value={contactDetails.preferredContactMethod}
                    onChange={(e) => setContactDetails({ ...contactDetails, preferredContactMethod: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Preferred Time to Contact
                  </label>
                  <input
                    type="text"
                    value={contactDetails.preferredContactTime}
                    onChange={(e) => setContactDetails({ ...contactDetails, preferredContactTime: e.target.value })}
                    placeholder="e.g. Weekdays 2 PM - 5 PM"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="step6-consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-cynbit-teal rounded border-slate-300 focus:ring-cynbit-teal"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  I consent to sharing this business information and architectural blueprint with Cynbit Technologies for solution evaluation and direct follow-up.
                </span>
              </label>
              <button
                type="button"
                onClick={() => setConsentGiven(!consentGiven)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex-shrink-0 transition-all ${
                  consentGiven
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-cynbit-teal/20'
                }`}
              >
                {consentGiven ? '✓ Consent Provided' : 'Click to Agree'}
              </button>
            </div>
            {formErrors.consent && <p className="text-[11px] text-rose-500 pt-1">{formErrors.consent}</p>}

            {/* Navigation to Step 7 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Engagement Option
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(7);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cynbit-teal/20 hover:bg-cynbit-cyan transition-all"
              >
                <span>Continue to Step 7: Final Review &amp; Submit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 7: FINAL REVIEW, SUBMISSION & CONFIRMATION SCREEN */}
        {/* ========================================================================= */}
        {currentStep === 7 && !submissionResult && (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-widest block mb-1">
                Step 7 • Final Verification
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Review your solution package before submission
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ensure all details, design customizations, and preferred consultation times are accurately represented.
              </p>
            </div>

            {/* Review Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
                <span className="text-slate-400 font-mono text-[10px] uppercase block font-bold">1. Organization &amp; Industry</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{businessInfo.companyName || 'Direct Client'}</h4>
                <p className="text-slate-600 dark:text-slate-400">Industry: {businessInfo.industry || 'Not specified'}</p>
                <p className="text-slate-600 dark:text-slate-400">Audience: {businessInfo.targetAudience || 'End users'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
                <span className="text-slate-400 font-mono text-[10px] uppercase block font-bold">2. Engagement &amp; Commercials</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Path: {proceedOption === 'consultation' ? 'Engineer Consultation' : proceedOption === 'inquiry' ? 'Project Inquiry' : 'Exploration'}
                  </span>
                  {visualCustomization.approved && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-700 font-bold">
                      Design Approved
                    </span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400">Budget Range: {budgetRange} ({currency})</p>
                <p className="text-slate-600 dark:text-slate-400">Timeline: {timelineRange}</p>
              </div>

              {proceedOption === 'consultation' && (
                <div className="p-4 rounded-2xl bg-cynbit-teal/10 dark:bg-cynbit-teal/20 border border-cynbit-teal/30 space-y-1 md:col-span-2">
                  <span className="text-cynbit-teal dark:text-cynbit-cyan font-mono text-[10px] uppercase block font-bold">
                    Requested Engineer Consultation
                  </span>
                  <p className="text-slate-900 dark:text-white font-bold">
                    {consultationDetails.method} • {consultationDetails.preferredDate || 'Date to be confirmed'} • {consultationDetails.preferredTimeRange}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Discussion Topic: {consultationDetails.discussionTopics || 'Architecture walkthrough and milestone deliverables'}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2 md:col-span-2">
                <span className="text-slate-400 font-mono text-[10px] uppercase block font-bold">3. Contact Representative</span>
                <p className="font-bold text-slate-900 dark:text-white">
                  {contactDetails.fullName} ({contactDetails.workEmail}) • {contactDetails.phone || 'Phone not provided'}
                </p>
                <p className="text-slate-500">
                  Preferred Contact: {contactDetails.preferredContactMethod} ({contactDetails.preferredContactTime})
                </p>
              </div>
            </div>

            {/* Step 7 Consent Confirmation Row */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="step7-consent-check"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-cynbit-teal rounded border-slate-300 focus:ring-cynbit-teal"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  I confirm consent to submit this solution specification to Cynbit Technologies for engineering assessment and scoping.
                </span>
              </label>
              <button
                type="button"
                onClick={() => setConsentGiven(!consentGiven)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex-shrink-0 transition-all ${
                  consentGiven
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 hover:bg-amber-200'
                }`}
              >
                {consentGiven ? '✓ Consent Verified' : 'Click to Confirm Consent'}
              </button>
            </div>

            {submitError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
                {formErrors.fullName && <p>• {formErrors.fullName}</p>}
                {formErrors.workEmail && <p>• {formErrors.workEmail}</p>}
                {formErrors.consent && <p>• {formErrors.consent}</p>}
              </div>
            )}

            {/* Final Submission Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Edit Details
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitInquiry}
                className="px-8 py-3.5 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2.5 shadow-xl shadow-cynbit-teal/30 hover:bg-cynbit-cyan transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving to Cynbit Cloud...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Complete Solution Brief to Cynbit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUCCESSFUL CONFIRMATION SCREEN */}
        {/* ========================================================================= */}
        {submissionResult && (
          <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-2xl text-center space-y-6 animate-fadeIn">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-3xl font-black font-headline text-slate-900 dark:text-white">
                Your vision has been shared with Cynbit!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Thank you for sharing your business requirements. Your solution blueprint and project details have been successfully submitted to our engineering team. Our team will review your information and get in touch using your preferred contact method.
              </p>
            </div>

            {/* Reference ID Card */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-widest font-bold">
                Unique Tracking Reference ID
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl md:text-2xl font-mono font-black text-cynbit-teal">
                  {submissionResult.referenceId}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(submissionResult.referenceId)}
                  className="p-2 rounded-xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-cynbit-teal transition-colors"
                  title="Copy reference ID"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Consultation Status Notice if requested */}
            {submissionResult.consultation?.requested && (
              <div className="max-w-lg mx-auto p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs space-y-1">
                <div className="font-bold flex items-center justify-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Engineer Consultation Request Received</span>
                </div>
                <p>
                  Your preferred meeting time ({submissionResult.consultation?.preferredDate || 'Selected slot'} • {submissionResult.consultation?.preferredTimeRange}) has been logged and is awaiting confirmation by Cynbit's engineering desk.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowBriefModal(true)}
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 hover:border-cynbit-teal shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>View / Print Project Brief</span>
              </button>

              <Link
                to="/"
                className="px-6 py-3 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-2 shadow-md hover:bg-cynbit-cyan transition-all"
              >
                <span>Return to Cynbit Homepage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* PRINTABLE / VIEW BRIEF MODAL */}
      {/* ========================================================================= */}
      {showBriefModal && submissionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cynbit-teal" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Cynbit Project Brief • {submissionResult.referenceId}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowBriefModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed">
              <div className="border-b pb-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {submissionResult.company || submissionResult.clientName}
                </h4>
                <p className="text-slate-500 font-mono">Reference: {submissionResult.referenceId} • Category: {submissionResult.projectCategory}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block font-mono text-[10px]">Overview</span>
                <p className="text-slate-800 dark:text-slate-200">{submissionResult.blueprint?.overview}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block font-mono text-[10px]">Core Problem</span>
                <p className="text-slate-800 dark:text-slate-200">{submissionResult.blueprint?.problem}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block font-mono text-[10px]">Proposed Architecture</span>
                <p className="text-slate-800 dark:text-slate-200">{submissionResult.blueprint?.solution}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block font-mono text-[10px]">Budget &amp; Timeline</span>
                <p className="text-slate-800 dark:text-slate-200">
                  Budget Range: {submissionResult.budget?.range} ({submissionResult.budget?.currency}) • Timeline: {submissionResult.timeline?.range}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
