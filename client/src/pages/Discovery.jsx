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
  ExternalLink 
} from 'lucide-react';
import { DISCOVERY_CATEGORIES } from '../data/cynbitData';
import { generateBlueprintApi, submitInquiryApi } from '../services/api';

const STORAGE_KEY = 'cynbit_discovery_state';

export default function Discovery() {
  // Step navigation: 1 = Category, 2 = Questions, 3 = Blueprint, 4 = Inquiry Form, 5 = Success
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Blueprint generation state
  const [blueprint, setBlueprint] = useState(null);
  const [blueprintMeta, setBlueprintMeta] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [isEditingBlueprint, setIsEditingBlueprint] = useState(false);
  const [editedBlueprint, setEditedBlueprint] = useState({});

  // Client inquiry form
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Load persisted progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedCategory) {
          const categoryObj = DISCOVERY_CATEGORIES.find(c => c.id === parsed.selectedCategory.id);
          if (categoryObj) setSelectedCategory(categoryObj);
        }
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.currentStep && parsed.currentStep < 5) setCurrentStep(parsed.currentStep);
        if (parsed.blueprint) {
          setBlueprint(parsed.blueprint);
          setEditedBlueprint(parsed.blueprint);
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved discovery state', e);
    }
  }, []);

  // Save progress on change
  useEffect(() => {
    try {
      if (currentStep < 5) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          selectedCategory,
          answers,
          currentStep,
          blueprint,
        }));
      }
    } catch (e) {
      console.warn('Failed to save discovery state', e);
    }
  }, [selectedCategory, answers, currentStep, blueprint]);

  // Handle category selection
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    // Initialize or preserve existing answers
    setAnswers(prev => ({ ...prev }));
    setCurrentQuestionIndex(0);
  };

  const handleNextToQuestions = () => {
    if (!selectedCategory) return;
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Adaptive questions logic
  const questions = selectedCategory?.questions || [];
  const currentQ = questions[currentQuestionIndex];

  const handleAnswerChange = (qId, value) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: value,
    }));
  };

  const handleSkipOrNotSure = (qId) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: 'Not sure yet / Needs engineering advice',
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Completed all questions -> Trigger Blueprint Generation
      handleGenerateBlueprint();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentStep(1);
    }
  };

  // Blueprint Generation API call
  const handleGenerateBlueprint = async () => {
    setIsGenerating(true);
    setGenerationError('');
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await generateBlueprintApi(selectedCategory.id, answers);
      const bp = res.blueprint || res.data;
      if (res.success && bp) {
        setBlueprint(bp);
        setEditedBlueprint(bp);
        setBlueprintMeta({
          source: res.source || bp.engineUsed,
          generatedAt: res.generatedAt || bp.generatedAt,
        });
      } else {
        throw new Error(res.message || 'Failed to generate blueprint');
      }
    } catch (err) {
      console.error('Blueprint generation error:', err);
      setGenerationError(err.message || 'Blueprint service unavailable. Please check your connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit Inquiry API call
  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!inquiryForm.consent) {
      setSubmitError('Please accept the consent checkbox to submit your discovery inquiry.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        name: inquiryForm.name,
        email: inquiryForm.email,
        company: inquiryForm.company || undefined,
        phone: inquiryForm.phone || undefined,
        category: selectedCategory.title,
        answers,
        blueprint: isEditingBlueprint ? editedBlueprint : blueprint,
        notes: inquiryForm.notes || undefined,
      };

      const res = await submitInquiryApi(payload);
      const inq = res.inquiry || res.data;
      if (res.success && inq) {
        setSubmissionResult(inq);
        setCurrentStep(5);
        localStorage.removeItem(STORAGE_KEY);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(res.message || 'Failed to submit inquiry');
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setSubmitError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = (refId) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(refId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSelectedCategory(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setBlueprint(null);
    setEditedBlueprint({});
    setSubmissionResult(null);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Icon helper
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'terminal': return <Terminal className="w-5 h-5" />;
      case 'smartphone': return <Smartphone className="w-5 h-5" />;
      case 'psychology': return <Cpu className="w-5 h-5" />;
      case 'hub': return <Bot className="w-5 h-5" />;
      case 'refresh': return <RefreshCw className="w-5 h-5" />;
      case 'cloud': return <Cloud className="w-5 h-5" />;
      case 'trending-up': return <BarChart className="w-5 h-5" />;
      case 'layers': return <Layers className="w-5 h-5" />;
      default: return <HelpCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header Banner */}
      <section className="relative overflow-hidden py-10 lg:py-14 border-b border-slate-200 dark:border-white/5 bg-gradient-to-b from-cynbit-teal/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal border border-cynbit-teal/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Cynbit Smart Project Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Smart Discovery & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cynbit-teal via-cynbit-cyan to-cynbit-sky">AI Blueprint Engine</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Turn early, incomplete ideas into a structured, production-grade architectural brief with rule-based routing, adaptive questioning, and AI analysis.
          </p>

          {/* Stepper Progress Bar */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-xs font-semibold">
              <div className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                currentStep === 1 
                  ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-md' 
                  : currentStep > 1 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                  : 'bg-white dark:bg-cynbit-card text-slate-400 border-slate-200 dark:border-white/5'
              }`}>
                {currentStep > 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span>1.</span>}
                <span className="hidden sm:inline">Solution Finder</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                currentStep === 2 
                  ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-md' 
                  : currentStep > 2 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                  : 'bg-white dark:bg-cynbit-card text-slate-400 border-slate-200 dark:border-white/5'
              }`}>
                {currentStep > 2 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span>2.</span>}
                <span className="hidden sm:inline">Adaptive Questions</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                currentStep === 3 
                  ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-md' 
                  : currentStep > 3 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                  : 'bg-white dark:bg-cynbit-card text-slate-400 border-slate-200 dark:border-white/5'
              }`}>
                {currentStep > 3 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span>3.</span>}
                <span className="hidden sm:inline">AI Blueprint</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                currentStep >= 4 
                  ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-md' 
                  : 'bg-white dark:bg-cynbit-card text-slate-400 border-slate-200 dark:border-white/5'
              }`}>
                <span>4.</span>
                <span className="hidden sm:inline">Inquiry Brief</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* =========================================================================
            STEP 1: FEATURE A — SMART SOLUTION FINDER
        ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                What does your organization want to achieve?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Select the project category that matches your immediate goal. We’ll analyze the technical scope and present rule-based recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DISCOVERY_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-cynbit-teal/5 dark:bg-cynbit-teal/10 border-cynbit-teal ring-2 ring-cynbit-teal shadow-lg'
                        : 'bg-white dark:bg-cynbit-card border-slate-200 dark:border-white/10 hover:border-cynbit-teal/40 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-cynbit-teal text-white' 
                            : 'bg-slate-100 dark:bg-white/5 text-cynbit-teal group-hover:bg-cynbit-teal group-hover:text-white'
                        }`}>
                          {getCategoryIcon(cat.icon)}
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                          {cat.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cynbit-teal transition-colors">
                        {cat.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
                      <span className={isSelected ? 'text-cynbit-teal' : 'text-slate-400'}>
                        {isSelected ? 'Selected Category' : 'Click to select'}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-cynbit-teal" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cynbit-teal group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Rule-Based Capability Recommendation Card */}
            {selectedCategory && (
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-cynbit-card/60 border border-cynbit-teal/30 shadow-lg animate-fadeIn">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cynbit-teal/10 text-cynbit-teal text-xs font-semibold">
                      <Workflow className="w-3.5 h-3.5" />
                      <span>Cynbit Architectural Alignment (Rule-Based Recommendation)</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selectedCategory.recommendation.primaryService}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      <strong>Delivery Focus:</strong> {selectedCategory.recommendation.lifecycleFocus}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedCategory.recommendation.technologies.map(t => (
                        <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleNextToQuestions}
                    className="flex-shrink-0 px-8 py-3.5 rounded-xl bg-cynbit-teal hover:bg-cynbit-cyan text-white font-semibold text-sm transition-all shadow-lg shadow-cynbit-teal/20 flex items-center gap-2"
                  >
                    <span>Proceed to Adaptive Questions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STEP 2: FEATURE B — ADAPTIVE PROJECT DISCOVERY
        ========================================================================= */}
        {currentStep === 2 && selectedCategory && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cynbit-teal font-semibold">
                  Adaptive Discovery • {selectedCategory.badge}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedCategory.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-medium"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Change Category</span>
              </button>
            </div>

            {/* Question Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cynbit-teal to-cynbit-cyan rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            {currentQ && (
              <div className="p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-cynbit-teal px-2 py-0.5 rounded bg-cynbit-teal/10">
                      STEP {currentQuestionIndex + 1}
                    </span>
                    {currentQ.required ? (
                      <span className="text-xs font-medium text-rose-500">Required</span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">Optional</span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Question Input based on type */}
                {currentQ.type === 'textarea' && (
                  <textarea
                    rows={4}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    placeholder={currentQ.placeholder}
                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                )}

                {currentQ.type === 'text' && (
                  <input
                    type="text"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    placeholder={currentQ.placeholder}
                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                )}

                {currentQ.type === 'radio' && (
                  <div className="space-y-3">
                    {currentQ.options.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          answers[currentQ.id] === opt
                            ? 'bg-cynbit-teal/5 dark:bg-cynbit-teal/15 border-cynbit-teal'
                            : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <input
                          type="radio"
                          name={currentQ.id}
                          checked={answers[currentQ.id] === opt}
                          onChange={() => handleAnswerChange(currentQ.id, opt)}
                          className="text-cynbit-teal focus:ring-cynbit-teal"
                        />
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Helpful Shortcuts */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleSkipOrNotSure(currentQ.id)}
                    className="text-slate-500 hover:text-cynbit-teal underline font-medium"
                  >
                    Not sure yet? Select "Need engineering guidance"
                  </button>
                  <span className="text-slate-400">
                    Auto-saved to session
                  </span>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    type="button"
                    onClick={handlePrevQuestion}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-semibold text-xs flex items-center gap-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    disabled={currentQ.required && !answers[currentQ.id]}
                    className={`px-6 py-2.5 rounded-xl text-white font-semibold text-xs flex items-center gap-2 transition-all ${
                      currentQ.required && !answers[currentQ.id]
                        ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                        : 'bg-cynbit-teal hover:bg-cynbit-cyan shadow-md shadow-cynbit-teal/20'
                    }`}
                  >
                    <span>
                      {currentQuestionIndex === questions.length - 1
                        ? 'Generate AI Blueprint'
                        : 'Next Question'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STEP 3: FEATURE C — AI PROJECT BLUEPRINT
        ========================================================================= */}
        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {isGenerating ? (
              <div className="p-16 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 text-center space-y-6 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-cynbit-teal/10 flex items-center justify-center text-cynbit-teal mx-auto animate-pulse">
                  <Cpu className="w-8 h-8 animate-spin" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Architecting Your Project Blueprint
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Analyzing your answers, structuring the functional requirements, and formulating technical considerations...
                  </p>
                </div>
                <div className="max-w-xs mx-auto space-y-2 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cynbit-teal" />
                    <span>Context parsed for {selectedCategory?.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cynbit-teal" />
                    <span>Mapping zero-trust architectural modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-cynbit-teal animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing blueprint engine...</span>
                  </div>
                </div>
              </div>
            ) : generationError ? (
              <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Blueprint Engine Encountered an Issue</h3>
                <p className="text-sm text-rose-600 dark:text-rose-400">{generationError}</p>
                <button
                  onClick={handleGenerateBlueprint}
                  className="px-6 py-2.5 rounded-xl bg-cynbit-teal text-white font-semibold text-xs hover:bg-cynbit-cyan"
                >
                  Retry Generation
                </button>
              </div>
            ) : blueprint ? (
              <div className="space-y-6">
                {/* Source & Transparency Banner */}
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cynbit-teal flex-shrink-0" />
                    <span>
                      <strong>Blueprint Status:</strong> {blueprintMeta?.source === 'gemini_api' 
                        ? 'Generated via Gemini 1.5 LLM Gateway' 
                        : 'Synthesized via Cynbit Architectural Engine (Deterministic Fallback)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingBlueprint(!isEditingBlueprint)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-all ${
                        isEditingBlueprint 
                          ? 'bg-cynbit-teal text-white border-cynbit-teal' 
                          : 'bg-white dark:bg-cynbit-card text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isEditingBlueprint ? 'Done Editing' : 'Edit Blueprint'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleGenerateBlueprint}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-cynbit-card text-slate-700 dark:text-slate-300 hover:text-cynbit-teal flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono px-2 text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    Confirmed by You
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    AI Architected Suggestion
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Clarification Required
                  </span>
                </div>

                {/* Structured Blueprint Card */}
                <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-8">
                  
                  {/* Overview Header */}
                  <div>
                    <div className="text-xs font-mono text-cynbit-teal font-semibold uppercase tracking-wider mb-1">
                      Architectural Blueprint
                    </div>
                    {isEditingBlueprint ? (
                      <input
                        type="text"
                        value={editedBlueprint.projectOverview || editedBlueprint.overview || ''}
                        onChange={(e) => setEditedBlueprint({ ...editedBlueprint, projectOverview: e.target.value, overview: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-cynbit-teal bg-slate-50 dark:bg-white/5 font-bold text-xl text-slate-900 dark:text-white"
                      />
                    ) : (
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        {blueprint.projectOverview || blueprint.overview}
                      </h2>
                    )}
                  </div>

                  {/* Problem & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          Problem Addressed
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          Confirmed Input
                        </span>
                      </div>
                      {isEditingBlueprint ? (
                        <textarea
                          rows={3}
                          value={editedBlueprint.problemStatement || editedBlueprint.problem || ''}
                          onChange={(e) => setEditedBlueprint({ ...editedBlueprint, problemStatement: e.target.value, problem: e.target.value })}
                          className="w-full p-2 text-xs rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-black/20"
                        />
                      ) : (
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {blueprint.problemStatement || blueprint.problem}
                        </p>
                      )}
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          Proposed Architecture
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          AI Recommendation
                        </span>
                      </div>
                      {isEditingBlueprint ? (
                        <textarea
                          rows={3}
                          value={editedBlueprint.proposedSolution || editedBlueprint.solution || ''}
                          onChange={(e) => setEditedBlueprint({ ...editedBlueprint, proposedSolution: e.target.value, solution: e.target.value })}
                          className="w-full p-2 text-xs rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-black/20"
                        />
                      ) : (
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {blueprint.proposedSolution || blueprint.solution}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                      Target Users & Stakeholders
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {blueprint.targetAudience || blueprint.intendedUsers}
                    </p>
                  </div>

                  {/* Functional Requirements */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Core Functional Modules
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                        AI Recommended Scope
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {blueprint.functionalRequirements?.map((req, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Considerations & Integrations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                        Technical Considerations
                      </span>
                      <div className="space-y-2">
                        {blueprint.technicalConsiderations?.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-cynbit-teal flex-shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                        Potential Integrations
                      </span>
                      <div className="space-y-2">
                        {blueprint.potentialIntegrations?.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-cynbit-cyan flex-shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Missing Information & Clarification Questions */}
                  <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4" />
                      <span>Clarification Questions for Engineering Discussion</span>
                    </div>
                    <div className="space-y-2">
                      {blueprint.clarificationQuestions?.map((q, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">Q{i + 1}:</span>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                      Suggested Next Architectural Steps
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {blueprint.suggestedNextSteps?.map((step, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                          <span className="text-cynbit-teal font-mono font-bold block mb-1">Phase 0{i + 1}</span>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom CTA to Submit */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-semibold text-xs flex items-center gap-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Questions</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(4);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-3.5 rounded-xl bg-cynbit-teal hover:bg-cynbit-cyan text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cynbit-teal/20"
                  >
                    <span>Proceed to Submit Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* =========================================================================
            STEP 4: FEATURE D — SUBMIT PROJECT INQUIRY
        ========================================================================= */}
        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Finalize & Submit Project Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Provide your contact details. Your inquiry and AI blueprint will be assigned a unique reference ID and securely logged in our database.
              </p>
            </div>

            {submitError && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitInquiry} className="p-8 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xl space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  placeholder="vikram@enterprise.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={inquiryForm.company}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                    placeholder="e.g. CloudMatrix Corp"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Additional Context or Specific Timeline
                </label>
                <textarea
                  rows={2}
                  value={inquiryForm.notes}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                  placeholder="Any budget range, desired start date, or specific cloud provider preferences..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                />
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={inquiryForm.consent}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, consent: e.target.checked })}
                  className="mt-0.5 rounded text-cynbit-teal focus:ring-cynbit-teal"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  I understand that this is an independent technical assessment prototype for Cynbit Technologies. I consent to having this discovery blueprint logged in the local prototype database.
                </span>
              </label>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-semibold text-xs flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Review Blueprint</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-cynbit-teal hover:bg-cynbit-cyan text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cynbit-teal/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Logging Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Discovery Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            STEP 5: CONFIRMATION & REFERENCE ID SCREEN
        ========================================================================= */}
        {currentStep === 5 && submissionResult && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn text-center">
            <div className="p-10 rounded-3xl bg-white dark:bg-cynbit-card border border-emerald-500/30 shadow-2xl space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                  Inquiry Successfully Registered
                </span>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Discovery Brief Received!
                </h2>
              </div>

              {/* Reference ID Pill */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-md mx-auto">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                  Unique Project Reference ID
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-black font-mono text-cynbit-teal tracking-wider">
                    {submissionResult.referenceId}
                  </span>
                  <button
                    onClick={() => handleCopyRef(submissionResult.referenceId)}
                    title="Copy Reference ID"
                    className="p-2 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-cynbit-teal hover:text-white transition-colors"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Your discovery responses and the AI-architected blueprint have been securely stored in MongoDB with status <strong>"New"</strong>. An engineering advisor can now review this inquiry inside the protected Admin Dashboard.
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/admin/login"
                  className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs hover:bg-cynbit-teal dark:hover:bg-cynbit-teal dark:hover:text-white transition-all flex items-center gap-2"
                >
                  <span>Open Admin Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={resetAll}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                >
                  Start Another Discovery
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
