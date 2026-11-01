import React, { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Palette,
  Layout,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  Calendar,
  Clock,
  User,
  Heart,
  Activity,
  FileText,
  Layers,
  Cpu,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Sliders,
  ChevronRight,
  Plus,
  Send,
  Building,
  Home as HomeIcon,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  DollarSign
} from 'lucide-react';

export default function SolutionVisualizer({
  blueprint,
  businessInfo = {},
  problemDetails = {},
  solutionRequirements = {},
  onFeedbackChange,
  currentFeedback = {},
}) {
  const companyName = businessInfo.companyName || 'Cynbit Client';
  const industry = businessInfo.industry || 'Technology';

  // Determine active archetype
  const initialArchetype = blueprint?.suggestedArchetype || blueprint?.archetype || 'saas_dashboard';
  const [activeArchetype, setActiveArchetype] = useState(initialArchetype);

  // Viewport mode: desktop vs mobile
  const [viewport, setViewport] = useState('desktop');

  // Theme presets
  const THEMES = [
    { id: 'cynbit-teal', name: 'Cynbit Teal', primary: '#006067', secondary: '#0284c7', accent: '#0d9488', bg: '#f8fafc', card: '#ffffff', text: '#0f172a', border: '#e2e8f0', isDark: false },
    { id: 'midnight', name: 'Midnight Onyx', primary: '#38bdf8', secondary: '#818cf8', accent: '#34d399', bg: '#070d0f', card: '#121e22', text: '#f8fafc', border: '#1e293b', isDark: true },
    { id: 'indigo', name: 'Electric Indigo', primary: '#6366f1', secondary: '#a855f7', accent: '#ec4899', bg: '#f8fafc', card: '#ffffff', text: '#0f172a', border: '#e2e8f0', isDark: false },
    { id: 'slate', name: 'Clean Minimal', primary: '#334155', secondary: '#64748b', accent: '#0284c7', bg: '#f1f5f9', card: '#ffffff', text: '#0f172a', border: '#cbd5e1', isDark: false },
    { id: 'emerald', name: 'Emerald Mint', primary: '#059669', secondary: '#0d9488', accent: '#10b981', bg: '#f0fdf4', card: '#ffffff', text: '#0f172a', border: '#bbf7d0', isDark: false },
  ];

  const [activeTheme, setActiveTheme] = useState(currentFeedback?.colorPreference || 'cynbit-teal');
  const [activeLayout, setActiveLayout] = useState(currentFeedback?.layoutPreference || 'sidebar');
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  // Synchronize activeTheme whenever parent updates currentFeedback.colorPreference
  React.useEffect(() => {
    if (currentFeedback?.colorPreference && currentFeedback.colorPreference !== activeTheme) {
      setActiveTheme(currentFeedback.colorPreference);
    }
  }, [currentFeedback?.colorPreference]);

  // Synchronize activeArchetype whenever blueprint updates
  React.useEffect(() => {
    if (blueprint?.suggestedArchetype && blueprint.suggestedArchetype !== activeArchetype) {
      setActiveArchetype(blueprint.suggestedArchetype);
    }
  }, [blueprint?.suggestedArchetype]);

  const handleThemeChange = (newThemeId) => {
    setActiveTheme(newThemeId);
    if (onFeedbackChange) {
      onFeedbackChange({
        ...currentFeedback,
        colorPreference: newThemeId,
      });
    }
  };

  // Active theme object
  const currentThemeObj = THEMES.find(t => t.id === activeTheme) || THEMES[0];

  // Screen templates based on archetype
  const getScreensForArchetype = (arch) => {
    switch (arch) {
      case 'ecommerce':
        return [
          { id: 'storefront', name: 'Storefront Homepage', badge: 'Public Store' },
          { id: 'catalog', name: 'Product Catalog & Filters', badge: 'Browse' },
          { id: 'product_detail', name: 'Product Detail & Reviews', badge: 'PDP' },
          { id: 'orders', name: 'Orders & Tracking', badge: 'Customer Hub' },
        ];
      case 'pet_care':
        return [
          { id: 'pet_dashboard', name: 'Pet Parent Dashboard', badge: 'Home' },
          { id: 'pet_profile', name: 'Pet Digital Profile & EHR', badge: 'Records' },
          { id: 'booking', name: 'Veterinary Slot Booking', badge: 'Clinic' },
          { id: 'directory', name: 'Pet Services & Care Directory', badge: 'Services' },
        ];
      case 'ai_agent_studio':
        return [
          { id: 'agent_console', name: 'Autonomous Agent Console', badge: 'Telemetry' },
          { id: 'pipeline', name: 'Workflow & Tool Pipeline', badge: 'Visual Graph' },
          { id: 'knowledge', name: 'Vector Knowledge Hub', badge: 'RAG Embeddings' },
          { id: 'audit_logs', name: 'Trace & Safety Audit', badge: 'Security' },
        ];
      case 'proptech':
        return [
          { id: 'property_hub', name: 'Property Operations Hub', badge: 'Overview' },
          { id: 'unit_roster', name: 'Units & Floor Plans', badge: 'Inventory' },
          { id: 'rent_ledger', name: 'Rent Ledger & Collection', badge: 'Finances' },
          { id: 'maintenance', name: 'Tenant Maintenance Desk', badge: 'Tickets' },
        ];
      case 'healthcare':
        return [
          { id: 'clinic_desk', name: 'Clinical Operations Desk', badge: 'Triage' },
          { id: 'ehr', name: 'Electronic Health Records', badge: 'Patients' },
          { id: 'scheduler', name: 'Intelligent Doctor Calendar', badge: 'Appointments' },
          { id: 'telehealth', name: 'Telemedicine Consultation', badge: 'WebRTC' },
        ];
      case 'mobile_app':
        return [
          { id: 'mobile_feed', name: 'Mobile Home Feed', badge: 'iOS / Android' },
          { id: 'mobile_explore', name: 'Explore & Search', badge: 'Discovery' },
          { id: 'mobile_action', name: 'Transaction & Checkout', badge: 'Action' },
          { id: 'mobile_account', name: 'Profile & Settings', badge: 'Account' },
        ];
      case 'saas_dashboard':
      default:
        return [
          { id: 'executive_kpi', name: 'Executive KPI Dashboard', badge: 'Executive' },
          { id: 'operations_grid', name: 'Operations & Workflows', badge: 'Workflow' },
          { id: 'customer_directory', name: 'Entity & Account Records', badge: 'Accounts' },
          { id: 'analytics_reports', name: 'Analytics & Audit Reports', badge: 'Reports' },
        ];
    }
  };

  const screens = getScreensForArchetype(activeArchetype);
  const activeScreen = screens[activeScreenIndex] || screens[0];


  const handleLayoutChange = (lId) => {
    setActiveLayout(lId);
    if (onFeedbackChange) {
      onFeedbackChange({
        ...currentFeedback,
        layoutPreference: lId,
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Prototype Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm">
        {/* Archetype & Screen Indicators */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal dark:text-cynbit-cyan flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cynbit-teal uppercase tracking-wider">
                Interactive Visual Prototype
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Live Concept
              </span>
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
              {companyName} • {activeScreen.name}
            </h3>
          </div>
        </div>

        {/* Device Viewport Toggle & Customizers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewport === 'desktop'
                  ? 'bg-white dark:bg-cynbit-card text-cynbit-teal shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewport === 'mobile'
                  ? 'bg-white dark:bg-cynbit-card text-cynbit-teal shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Theme Switcher Dropdown / Pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
            <Palette className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleThemeChange(t.id)}
                className={`w-6 h-6 rounded-lg transition-transform flex items-center justify-center ${
                  activeTheme === t.id ? 'scale-110 ring-2 ring-cynbit-teal shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.primary }}
                title={t.name}
              />
            ))}
          </div>

          {/* Archetype Quick Switcher (if user wants to test another model) */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-xl border border-slate-200 dark:border-white/10 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Model:</span>
            <select
              value={activeArchetype}
              onChange={(e) => {
                setActiveArchetype(e.target.value);
                setActiveScreenIndex(0);
              }}
              className="bg-transparent text-slate-800 dark:text-slate-200 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              <option value="saas_dashboard">SaaS & Business Dashboard</option>
              <option value="ecommerce">E-Commerce & Storefront</option>
              <option value="ai_agent_studio">AI Agent Automation Console</option>
              <option value="pet_care">Pet Care & Veterinary Platform</option>
              <option value="healthcare">Healthcare & Clinical Desk</option>
              <option value="proptech">PropTech & Tenant Ecosystem</option>
              <option value="mobile_app">Mobile Application (Native App)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Screen Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {screens.map((sc, idx) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => setActiveScreenIndex(idx)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeScreenIndex === idx
                ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-sm shadow-cynbit-teal/20'
                : 'bg-white dark:bg-cynbit-card text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cynbit-teal/40'
            }`}
          >
            <span className="text-[10px] font-mono opacity-80">Screen {idx + 1}</span>
            <span>{sc.name}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold ${
              activeScreenIndex === idx ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-500'
            }`}>
              {sc.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Realistic Screen Canvas Frame */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-slate-900 p-2 md:p-6 transition-all duration-300">
        {/* Browser Chrome Header (Desktop Mode) */}
        {viewport === 'desktop' && (
          <div className="w-full bg-slate-800/90 rounded-2xl mb-4 p-3 flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 text-slate-300 text-[11px] font-mono max-w-md w-full justify-center">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span className="truncate">https://app.{companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.cynbit.cloud/{activeScreen.id}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <RefreshCw className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
            </div>
          </div>
        )}

        {/* Viewport Render Container */}
        <div className={`mx-auto transition-all duration-300 ${
          viewport === 'mobile'
            ? 'max-w-sm rounded-[42px] border-[10px] border-slate-800 shadow-2xl overflow-hidden'
            : 'w-full rounded-2xl overflow-hidden'
        }`}>
          {/* Mobile Top Notch / Status Bar */}
          {viewport === 'mobile' && (
            <div className="bg-slate-950 px-6 py-2 flex items-center justify-between text-[11px] text-white font-semibold">
              <span>9:41</span>
              <div className="w-20 h-4 bg-black rounded-full" />
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-4 h-2 rounded-xs border border-white/80 p-0.5">
                  <div className="w-full h-full bg-white rounded-2xs" />
                </div>
              </div>
            </div>
          )}

          {/* Actual Rendered Application Template */}
          <div
            className="w-full min-h-[580px] p-4 md:p-6 transition-colors duration-200 select-none"
            style={{
              backgroundColor: currentThemeObj.bg,
              color: currentThemeObj.text,
            }}
          >
            {/* Archetype Screen Content Dispatcher */}
            {activeArchetype === 'ecommerce' && (
              <EcommerceScreens
                screenId={activeScreen.id}
                companyName={companyName}
                theme={currentThemeObj}
                viewport={viewport}
                blueprint={blueprint}
                businessInfo={businessInfo}
                problemDetails={problemDetails}
                solutionRequirements={solutionRequirements}
                currentFeedback={currentFeedback}
              />
            )}

            {activeArchetype === 'pet_care' && (
              <PetCareScreens
                screenId={activeScreen.id}
                companyName={companyName}
                theme={currentThemeObj}
                viewport={viewport}
                blueprint={blueprint}
                businessInfo={businessInfo}
                problemDetails={problemDetails}
                solutionRequirements={solutionRequirements}
                currentFeedback={currentFeedback}
              />
            )}

            {activeArchetype === 'ai_agent_studio' && (
              <AIAgentScreens
                screenId={activeScreen.id}
                companyName={companyName}
                theme={currentThemeObj}
                viewport={viewport}
                blueprint={blueprint}
                businessInfo={businessInfo}
                problemDetails={problemDetails}
                solutionRequirements={solutionRequirements}
                currentFeedback={currentFeedback}
              />
            )}

            {activeArchetype === 'proptech' && (
              <PropTechScreens
                screenId={activeScreen.id}
                companyName={companyName}
                theme={currentThemeObj}
                viewport={viewport}
                blueprint={blueprint}
                businessInfo={businessInfo}
                problemDetails={problemDetails}
                solutionRequirements={solutionRequirements}
                currentFeedback={currentFeedback}
              />
            )}

            {activeArchetype === 'healthcare' && (
              <HealthcareScreens
                screenId={activeScreen.id}
                companyName={companyName}
                theme={currentThemeObj}
                viewport={viewport}
                blueprint={blueprint}
                businessInfo={businessInfo}
                problemDetails={problemDetails}
                solutionRequirements={solutionRequirements}
                currentFeedback={currentFeedback}
              />
            )}

            {activeArchetype === 'mobile_app' && (
              <MobileAppScreens
                screenId={activeScreen.id}
                companyName={companyName}
                theme={currentThemeObj}
                viewport={viewport}
                blueprint={blueprint}
                businessInfo={businessInfo}
                problemDetails={problemDetails}
                solutionRequirements={solutionRequirements}
                currentFeedback={currentFeedback}
              />
            )}

            {activeArchetype === 'saas_dashboard' && (
              <SaaSDashboardScreens
                screenId={activeScreen.id}
                companyName={companyName}
                theme={currentThemeObj}
                layout={activeLayout}
                viewport={viewport}
                blueprint={blueprint}
                businessInfo={businessInfo}
                problemDetails={problemDetails}
                solutionRequirements={solutionRequirements}
                currentFeedback={currentFeedback}
              />
            )}
          </div>
        </div>

        {/* Prototype Honest Disclosure Badge */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI-Assisted React-Rendered Concept Prototype (Visual Assessment Model — Not Live Production Software)</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            Interactive UX Simulation • Scoped &amp; Engineered by Cynbit Delivery Team
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ARCHETYPE 1: E-COMMERCE & STOREFRONT PREVIEWS
// -------------------------------------------------------------
function EcommerceScreens({ screenId, companyName, theme, viewport }) {
  const products = [
    { id: 1, name: 'Premium Performance Hoodie', category: 'Apparel', price: '₹3,499', rating: '4.9 (128)', stock: 'In Stock' },
    { id: 2, name: 'Minimalist Titanium Timepiece', category: 'Accessories', price: '₹12,999', rating: '5.0 (84)', stock: 'Low Stock' },
    { id: 3, name: 'Ultra-Lightweight Ergonomic Pack', category: 'Gear', price: '₹5,299', rating: '4.8 (210)', stock: 'In Stock' },
    { id: 4, name: 'Noise-Cancelling Studio Earbuds', category: 'Audio', price: '₹8,499', rating: '4.9 (340)', stock: 'In Stock' },
  ];

  if (screenId === 'catalog') {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
          <div>
            <h2 className="text-xl font-bold">{companyName} Collection</h2>
            <p className="text-xs text-slate-500">Showing 24 verified items with instant delivery</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-lg border bg-white font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by Category
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p.id} className="p-3.5 rounded-2xl bg-white shadow-xs border border-slate-100 space-y-3">
              <div className="w-full h-32 rounded-xl bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <ShoppingBag className="w-8 h-8 opacity-30" style={{ color: theme.primary }} />
                <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white shadow-xs">
                  {p.stock}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono">{p.category}</span>
                <h4 className="text-xs font-bold line-clamp-1 text-slate-800">{p.name}</h4>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-sm" style={{ color: theme.primary }}>{p.price}</span>
                  <span className="text-[10px] text-amber-500 font-bold">★ {p.rating}</span>
                </div>
              </div>
              <button
                type="button"
                className="w-full py-1.5 rounded-lg text-white font-semibold text-xs flex items-center justify-center gap-1 transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                <ShoppingCart className="w-3 h-3" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (screenId === 'product_detail') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-3xl border border-slate-100 shadow-xs">
        <div className="w-full h-72 rounded-2xl bg-slate-100 flex items-center justify-center relative">
          <ShoppingBag className="w-16 h-16 opacity-30" style={{ color: theme.primary }} />
          <span className="absolute bottom-3 left-3 text-xs px-3 py-1 rounded-full bg-white shadow-xs font-mono font-bold">
            High-Resolution Preview
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono uppercase" style={{ color: theme.primary }}>Verified Exclusive</span>
            <h2 className="text-xl font-bold text-slate-900">Minimalist Titanium Timepiece (Series 4)</h2>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-lg font-black" style={{ color: theme.primary }}>₹12,999</span>
              <span className="text-xs text-slate-400 line-through">₹16,499</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-bold">Save 21%</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Precision-engineered grade-5 titanium chassis, sapphire crystal glass, 100m water resistance, and high-frequency quartz movement.
          </p>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">Select Finish:</span>
            <div className="flex gap-2">
              {['Space Gray', 'Polished Silver', 'Midnight Black'].map((fin, i) => (
                <button key={fin} type="button" className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${i === 0 ? 'border-slate-800 bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'}`}>
                  {fin}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              style={{ backgroundColor: theme.primary }}
            >
              <ShoppingCart className="w-4 h-4" /> Instant Checkout
            </button>
            <button type="button" className="p-2.5 rounded-xl border border-slate-200 text-slate-600">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screenId === 'orders') {
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">Order #CYN-ORD-88219</span>
              <h3 className="text-base font-bold text-slate-900">Titanium Timepiece + Performance Hoodie</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              Out for Delivery
            </span>
          </div>

          {/* Timeline tracker */}
          <div className="grid grid-cols-4 gap-2 pt-3">
            {[
              { step: 'Order Placed', time: 'Oct 28, 10:14 AM', done: true },
              { step: 'Processing', time: 'Oct 28, 2:30 PM', done: true },
              { step: 'Dispatched', time: 'Oct 29, 6:00 AM', done: true },
              { step: 'Out for Delivery', time: 'Expected by 2 PM', done: true },
            ].map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="h-1.5 rounded-full" style={{ backgroundColor: t.done ? theme.primary : '#e2e8f0' }} />
                <span className="text-[11px] font-bold block text-slate-800">{t.step}</span>
                <span className="text-[10px] text-slate-400 block">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default Storefront Homepage
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div
        className="p-6 md:p-8 rounded-3xl text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        }}
      >
        <div className="max-w-md space-y-2 z-10">
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            Official Brand Portal
          </span>
          <h2 className="text-2xl md:text-3xl font-black leading-tight">
            Elevate Your Everyday Standard with {companyName}
          </h2>
          <p className="text-xs text-white/80 leading-relaxed">
            Architected for superior performance, seamless mobile purchasing, and automated order fulfillment.
          </p>
        </div>

        <div className="pt-4 flex items-center gap-3 z-10">
          <button type="button" className="px-5 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md">
            Explore Catalog
          </button>
          <span className="text-xs text-white/80 font-mono">Free shipping across India</span>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Trending Releases</h3>
          <span className="text-xs font-semibold" style={{ color: theme.primary }}>View All →</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
              <div className="h-24 rounded-xl bg-slate-50 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 opacity-30" style={{ color: theme.primary }} />
              </div>
              <h4 className="text-xs font-bold text-slate-800 truncate">{p.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: theme.primary }}>{p.price}</span>
                <span className="text-[10px] text-slate-400">★ 4.9</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ARCHETYPE 2: PET-CARE & VETERINARY PREVIEWS
// -------------------------------------------------------------
function PetCareScreens({
  screenId,
  companyName,
  theme,
  viewport,
  blueprint,
  businessInfo = {},
  problemDetails = {},
  solutionRequirements = {},
  currentFeedback = {},
}) {
  const customNotes = currentFeedback?.customNotes || '';
  const isDark = theme.isDark || theme.id === 'midnight';
  const cardBg = theme.card || (isDark ? '#121e22' : '#ffffff');
  const cardBorder = theme.border || (isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9');
  const textColor = theme.text || (isDark ? '#f8fafc' : '#0f172a');
  const mutedText = isDark ? '#94a3b8' : '#64748b';

  // Dynamic feature detection from client's customized feedback & requirements
  const combinedContext = `${customNotes} ${JSON.stringify(solutionRequirements?.desiredSolutions || '')} ${solutionRequirements?.keyFeatures || ''} ${problemDetails?.improvementsWanted || ''}`.toLowerCase();

  const has15MinSlots = combinedContext.includes('15') || combinedContext.includes('slot') || combinedContext.includes('interval') || combinedContext.includes('morning');
  const hasEmergency = combinedContext.includes('emergency') || combinedContext.includes('telehealth') || combinedContext.includes('video') || combinedContext.includes('24/7') || combinedContext.includes('urgent');
  const hasNutrition = combinedContext.includes('nutrition') || combinedContext.includes('diet') || combinedContext.includes('food') || combinedContext.includes('store') || combinedContext.includes('shop') || combinedContext.includes('pharmacy');

  // Shared Live Customization Banner
  const liveBanner = customNotes ? (
    <div
      className="p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 shadow-xs mb-4"
      style={{
        backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(245, 158, 11, 0.08)',
        borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(245, 158, 11, 0.3)',
        color: isDark ? '#38bdf8' : '#b45309'
      }}
    >
      <div className="flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 flex-shrink-0 animate-spin" />
        <div>
          <span className="font-bold">Live Client Modification Applied: </span>
          <span className="italic font-medium">"{customNotes}"</span>
        </div>
      </div>
      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-bold tracking-wider" style={{ backgroundColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(245, 158, 11, 0.2)' }}>
        Active in Preview
      </span>
    </div>
  ) : null;

  // Screen: Digital Profile & EHR
  if (screenId === 'pet_profile') {
    return (
      <div className="space-y-4">
        {liveBanner}
        <div
          className="p-5 rounded-3xl border shadow-xs flex flex-col md:flex-row items-center gap-5 transition-all"
          style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        >
          <div className="w-20 h-20 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-3xl flex-shrink-0 shadow-inner">
            🐕
          </div>
          <div className="flex-1 space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-xl font-bold" style={{ color: textColor }}>Rocky (Golden Retriever)</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Healthy &amp; Verified</span>
            </div>
            <p className="text-xs" style={{ color: mutedText }}>Age: 2 Years 4 Months • Weight: 31.5 kg • Microchip: #985141002341</p>
            <p className="text-[11px] font-mono text-cynbit-teal font-semibold">Registered to: Ayushi Choudhary • Jaipur, RJ</p>
          </div>
          <button type="button" className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md hover:opacity-90" style={{ backgroundColor: theme.primary }}>
            Update Pet Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border shadow-xs space-y-2.5" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold block" style={{ color: textColor }}>Vaccination Passport</span>
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between" style={{ color: mutedText }}>
                <span>Rabies Booster</span>
                <span className="text-emerald-500 font-bold">Valid (Due Sep 2027)</span>
              </div>
              <div className="flex justify-between" style={{ color: mutedText }}>
                <span>DHPP Core 9-in-1</span>
                <span className="text-emerald-500 font-bold">Valid</span>
              </div>
              <div className="flex justify-between" style={{ color: mutedText }}>
                <span>Deworming Triage</span>
                <span className="text-amber-500 font-bold">Due in 2 weeks</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border shadow-xs space-y-2" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
            <span className="text-xs font-bold block" style={{ color: textColor }}>Allergies &amp; Clinical Diet</span>
            <p className="text-xs leading-relaxed" style={{ color: mutedText }}>
              Diagnosed sensitive to poultry protein. Optimized for salmon &amp; sweet potato clinical kibble with omega-3 EPA/DHA supplements.
            </p>
            <span className="inline-block text-[10px] font-mono text-emerald-500 font-semibold">Dietary Plan: Active</span>
          </div>

          <div className="p-4 rounded-2xl border shadow-xs space-y-2" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
            <span className="text-xs font-bold block" style={{ color: textColor }}>Primary Assigned Clinic</span>
            <p className="text-xs font-semibold" style={{ color: textColor }}>Dr. Sharma Animal Specialty Hospital</p>
            <p className="text-[11px]" style={{ color: mutedText }}>Emergency Dispatch: +91 98290 11234</p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-500 font-bold">
              <Activity className="w-3.5 h-3.5" /> Direct Telemetry Active
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Screen: Veterinary Slot Booking
  if (screenId === 'booking') {
    const slots = has15MinSlots
      ? ['10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM']
      : ['10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:15 PM'];

    return (
      <div className="p-5 rounded-3xl border shadow-xs space-y-5" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
        {liveBanner}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold" style={{ color: textColor }}>Book Veterinary Consultation</h2>
            <p className="text-xs" style={{ color: mutedText }}>Select specialist, format, and instant appointment slot</p>
          </div>
          {has15MinSlots && (
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
              ⚡ 15-Minute Slot Intervals Active
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold" style={{ color: mutedText }}>Choose Specialist:</span>
            <div className="p-3.5 rounded-2xl border flex items-center gap-3" style={{ borderColor: cardBorder, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}>
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                DR
              </div>
              <div>
                <h4 className="text-xs font-bold" style={{ color: textColor }}>Dr. Ananya Mathur (BVSc, MVSc)</h4>
                <p className="text-[10px]" style={{ color: mutedText }}>Senior Canine Surgeon • 8+ Yrs Exp • 4.9 ★ (340+)</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold" style={{ color: mutedText }}>Consultation Format:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                style={{ borderColor: theme.primary, color: theme.primary, backgroundColor: isDark ? 'rgba(56, 189, 248, 0.05)' : 'white' }}
              >
                🏥 In-Clinic Visit
              </button>
              <button
                type="button"
                className="p-3 rounded-2xl border text-xs font-medium flex items-center justify-center gap-1.5 hover:border-slate-400"
                style={{ borderColor: cardBorder, color: textColor }}
              >
                📹 Video Telehealth
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: mutedText }}>Available Slots for Today:</span>
            <span className="text-[10px] font-mono text-slate-400">Timezone: IST (UTC+05:30)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {slots.map((slot, i) => (
              <button
                key={slot}
                type="button"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  i === 2
                    ? 'text-white shadow-md'
                    : 'hover:border-cynbit-teal'
                }`}
                style={{
                  backgroundColor: i === 2 ? theme.primary : (isDark ? 'rgba(255,255,255,0.04)' : '#f8fafc'),
                  borderColor: i === 2 ? theme.primary : cardBorder,
                  color: i === 2 ? '#ffffff' : textColor
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Emergency quick alert if enabled */}
        {hasEmergency && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="font-semibold">Urgent triage needed? Emergency on-call veterinarian available now.</span>
            </div>
            <button type="button" className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-[10px]">
              Instant Connect
            </button>
          </div>
        )}

        <button
          type="button"
          className="w-full py-3 rounded-2xl text-white font-bold text-xs shadow-lg hover:opacity-95 transition-all"
          style={{ backgroundColor: theme.primary }}
        >
          Confirm Booking for Rocky with {companyName} Clinic (₹600 Consultation Fee)
        </button>
      </div>
    );
  }

  // Screen: Services & Care Directory
  if (screenId === 'directory') {
    const services = [
      { name: `${companyName} Verified Veterinary Clinic`, category: 'Veterinary', loc: 'Malviya Nagar, Jaipur', rating: '4.9 ★ (184)', tag: 'Doctor on Duty' },
      { name: `${companyName} Luxury Grooming & Hydrotherapy Spa`, category: 'Grooming', loc: 'C-Scheme, Jaipur', rating: '4.8 ★ (92)', tag: 'Medicated Bath' },
      { name: `${companyName} Boarding & Daycare Agility Retreat`, category: 'Daycare & Boarding', loc: 'Vaishali Nagar, Jaipur', rating: '4.9 ★ (140)', tag: 'CCTV Live Feed' },
      { name: '24/7 Mobile Veterinary Emergency Ambulance', category: 'Emergency', loc: 'Jaipur Metro Coverage', rating: '5.0 ★ (65)', tag: 'Oxygen & Triage' },
    ];

    return (
      <div className="space-y-4">
        {liveBanner}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold" style={{ color: textColor }}>{companyName} Care Partner Directory</h2>
            <p className="text-xs" style={{ color: mutedText }}>Verified clinics, grooming spas, and accredited pet healthcare providers</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800">
            4 Cynbit-Verified Partners
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border shadow-xs space-y-3"
              style={{ backgroundColor: cardBg, borderColor: cardBorder }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cynbit-teal font-bold">{svc.category}</span>
                  <h3 className="text-sm font-bold" style={{ color: textColor }}>{svc.name}</h3>
                  <p className="text-xs" style={{ color: mutedText }}>{svc.loc}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10" style={{ color: textColor }}>
                  {svc.tag}
                </span>
              </div>
              <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: cardBorder }}>
                <span className="text-xs font-bold text-amber-500">{svc.rating}</span>
                <button type="button" className="px-3 py-1 rounded-xl text-white font-bold text-xs" style={{ backgroundColor: theme.primary }}>
                  Book Service →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: Screen 0 Pet Parent Dashboard
  return (
    <div className="space-y-5">
      {liveBanner}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: textColor }}>Welcome to {companyName} Pet Hub</h2>
          <p className="text-xs" style={{ color: mutedText }}>Unified pet health monitoring, vaccinations, diet tracking, and instant appointments</p>
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:opacity-90 self-start sm:self-auto"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus className="w-3.5 h-3.5" /> Register New Pet
        </button>
      </div>

      {/* Dynamic Emergency Telehealth Widget if triggered */}
      {hasEmergency && (
        <div
          className="p-4 rounded-2xl border shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)'
              : 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
            borderColor: 'rgba(244, 63, 94, 0.3)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
              🚨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400">24/7 {companyName} Emergency Telehealth &amp; SOS Hotline</h4>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </div>
              <p className="text-[11px]" style={{ color: mutedText }}>Target Architecture: WebRTC audio/video triage hotline (Interactive Concept Simulation)</p>
            </div>
          </div>
          <button type="button" className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md hover:bg-rose-700 flex items-center gap-1.5" title="Interactive prototype demo — Video room integration scoped in Discovery Call">
            <Zap className="w-3.5 h-3.5" /> Connect SOS Video Room (Demo)
          </button>
        </div>
      )}

      {/* Main Pet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border shadow-xs flex items-center gap-3.5" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-inner">
            🐕
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold truncate" style={{ color: textColor }}>Rocky</h4>
            <p className="text-[11px]" style={{ color: mutedText }}>Golden Retriever • 2 Yrs</p>
            <span className="text-[10px] text-emerald-500 font-bold block">✓ Vaccines Complete</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border shadow-xs flex items-center gap-3.5" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-inner">
            🐈
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold truncate" style={{ color: textColor }}>Luna</h4>
            <p className="text-[11px]" style={{ color: mutedText }}>Persian Cat • 1.5 Yrs</p>
            <span className="text-[10px] text-amber-500 font-bold block">Deworming in 4 Days</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border shadow-xs flex items-center gap-3.5" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold truncate" style={{ color: textColor }}>Next Scheduled Visit</h4>
            <p className="text-[11px]" style={{ color: mutedText }}>Tomorrow at {has15MinSlots ? '10:15 AM' : '02:00 PM'}</p>
            <span className="text-[10px] font-semibold" style={{ color: theme.secondary }}>Dr. Ananya Mathur (Canine Surgery)</span>
          </div>
        </div>
      </div>

      {/* Dynamic Clinical Nutrition Section if requested */}
      {hasNutrition && (
        <div className="p-4 rounded-2xl border shadow-xs space-y-3" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🥫</span>
              <h4 className="text-xs font-bold" style={{ color: textColor }}>{companyName} Clinical Nutrition &amp; Prescription Refill</h4>
            </div>
            <span className="text-[10px] font-mono text-emerald-500 font-bold">Auto-Ship Active</span>
          </div>
          <p className="text-xs" style={{ color: mutedText }}>
            Rocky's prescription salmon &amp; sweet potato kibble (12kg pack). Next recurring dispatch scheduled for Nov 14th.
          </p>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// ARCHETYPE 3: AI AGENT & AUTOMATION PREVIEWS
// -------------------------------------------------------------
function AIAgentScreens({ screenId, companyName, theme }) {
  if (screenId === 'pipeline') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Autonomous Cognitive Pipeline Builder</h2>
            <p className="text-xs text-slate-500">Visual node execution graph for multi-step agent tool calling</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-700">
            ● Active State Machine (v2.4)
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase">Trigger Node</span>
              <h4 className="text-xs font-bold">Customer Webhook</h4>
              <p className="text-[11px] text-slate-400">Listens for new support tickets and incoming WhatsApp inquiries.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">LLM Reasoning</span>
              <h4 className="text-xs font-bold">Gemini 3.5 Flash Lite</h4>
              <p className="text-[11px] text-slate-400">Extracts user intent, sentiment score, and required entity parameters.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase">Tool Calling</span>
              <h4 className="text-xs font-bold">Postgres & CRM API</h4>
              <p className="text-[11px] text-slate-400">Executes database lookup and order status verification autonomously.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase">Safety Gate</span>
              <h4 className="text-xs font-bold">Human Escalation</h4>
              <p className="text-[11px] text-slate-400">Routes refund requests &gt; ₹5,000 to manager before finalizing.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Agent Console
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{companyName} AI Agent Command Center</h2>
          <p className="text-xs text-slate-500">Autonomous workflow orchestration and live latency telemetry</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-100 text-cyan-800">
          3 Agents Running
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">24h Autonomous Operations</span>
          <h3 className="text-2xl font-bold" style={{ color: theme.primary }}>14,280</h3>
          <p className="text-[11px] text-emerald-600 font-semibold">99.4% Task Success Rate</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">Average Decision Latency</span>
          <h3 className="text-2xl font-bold" style={{ color: theme.secondary }}>340 ms</h3>
          <p className="text-[11px] text-slate-500">Sub-second response speed</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">Token Expenditure</span>
          <h3 className="text-2xl font-bold text-slate-900">1.82M</h3>
          <p className="text-[11px] text-slate-500">Gemini 3.5 Flash Lite efficiency</p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ARCHETYPE 4: SAAS & ENTERPRISE ERP DASHBOARD PREVIEWS
// -------------------------------------------------------------
function SaaSDashboardScreens({ screenId, companyName, theme }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{companyName} Executive Suite</h2>
          <p className="text-xs text-slate-500">Centralized operations, accounts, and automated billing</p>
        </div>
        <button type="button" className="px-4 py-2 rounded-xl text-white font-bold text-xs" style={{ backgroundColor: theme.primary }}>
          Generate Monthly Report
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-slate-400 text-[10px] font-mono uppercase">Monthly Revenue</span>
          <h3 className="text-xl font-bold text-slate-900">₹4,82,500</h3>
          <span className="text-[10px] text-emerald-600 font-bold">+18.4% vs last month</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-slate-400 text-[10px] font-mono uppercase">Active Accounts</span>
          <h3 className="text-xl font-bold text-slate-900">1,240</h3>
          <span className="text-[10px] text-emerald-600 font-bold">98.2% Retention</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-slate-400 text-[10px] font-mono uppercase">Pending Workflows</span>
          <h3 className="text-xl font-bold text-slate-900">14</h3>
          <span className="text-[10px] text-amber-600 font-bold">Needs Review</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-slate-400 text-[10px] font-mono uppercase">Platform Uptime</span>
          <h3 className="text-xl font-bold text-emerald-600">99.98%</h3>
          <span className="text-[10px] text-slate-500">Zero downtime month</span>
        </div>
      </div>

      {/* Operational Table */}
      <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900">Recent Operational Workflows</h4>
          <span className="text-xs text-slate-500">Viewing latest 4 batches</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-slate-400 font-mono text-[10px] uppercase">
                <th className="pb-2">ID</th>
                <th className="pb-2">Initiated By</th>
                <th className="pb-2">Module</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Throughput</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'WF-1042', user: 'Aditi Sharma', mod: 'Invoicing & Ledger', status: 'Completed', cost: '₹24,500' },
                { id: 'WF-1043', user: 'Rohan Mehra', mod: 'KYC Document Verification', status: 'Processing', cost: '₹12,000' },
                { id: 'WF-1044', user: 'Vikram Joshi', mod: 'Bulk Notification Broadcast', status: 'Completed', cost: '₹4,800' },
              ].map((r) => (
                <tr key={r.id} className="py-2.5">
                  <td className="py-2 font-mono font-bold text-slate-800">{r.id}</td>
                  <td className="py-2 text-slate-900 font-semibold">{r.user}</td>
                  <td className="py-2 text-slate-600">{r.mod}</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2 text-right font-mono font-bold text-slate-800">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ARCHETYPE 5: PROPTECH & TENANTEASE
// -------------------------------------------------------------
function PropTechScreens({ screenId, companyName, theme }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{companyName} Property &amp; Tenant Hub</h2>
          <p className="text-xs text-slate-500">Automated rent chasing, tenant records, and building occupancy</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
          96% Occupancy
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Rent Collected This Month</span>
          <h3 className="text-xl font-bold text-emerald-600">₹8,45,000 / ₹8,80,000</h3>
          <p className="text-[10px] text-slate-500">96.0% Paid On Time</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Occupied Units</span>
          <h3 className="text-xl font-bold text-slate-900">48 / 50 Units</h3>
          <p className="text-[10px] text-blue-600 font-semibold">2 Units Ready for Move-in</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Open Maintenance</span>
          <h3 className="text-xl font-bold text-slate-900">3 Tickets</h3>
          <p className="text-[10px] text-amber-600 font-semibold">Plumbing dispatched</p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ARCHETYPE 6: HEALTHCARE & CLINIC
// -------------------------------------------------------------
function HealthcareScreens({ screenId, companyName, theme }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{companyName} Healthcare Suite</h2>
          <p className="text-xs text-slate-500">HIPAA-conscious electronic health records &amp; OPD scheduling</p>
        </div>
        <button type="button" className="px-3.5 py-1.5 rounded-xl text-white font-bold text-xs" style={{ backgroundColor: theme.primary }}>
          New Patient Triage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Today Appointments</span>
          <h3 className="text-2xl font-bold text-slate-900">28 Patients</h3>
          <p className="text-[11px] text-emerald-600 font-semibold">14 Consultations Done</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Telehealth Queue</span>
          <h3 className="text-2xl font-bold text-blue-600">4 Waiting</h3>
          <p className="text-[11px] text-slate-500">Average wait time 6 mins</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Emergency Alerts</span>
          <h3 className="text-2xl font-bold text-emerald-600">0 Active</h3>
          <p className="text-[11px] text-slate-500">All vitals normal</p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ARCHETYPE 7: MOBILE APP (NATIVE TOUCH EXPERIENCE)
// -------------------------------------------------------------
function MobileAppScreens({ screenId, companyName, theme }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            {companyName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">{companyName} Mobile</h4>
            <p className="text-[10px] text-slate-500">Jaipur, India</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
          <ShoppingBag className="w-4 h-4" />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-1">
        <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">Mobile Native Engine</span>
        <h3 className="text-sm font-bold">Fast, Offline-Ready Architecture</h3>
        <p className="text-[10px] text-slate-300">Biometric security, instant push alerts, and Apple Pay / UPI checkout (Target Architecture Concept).</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-800">Quick Book</span>
          <p className="text-[9px] text-slate-500">Schedule in 2 taps</p>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-800">Live Status</span>
          <p className="text-[9px] text-emerald-600 font-semibold">Active &amp; Ready</p>
        </div>
      </div>
    </div>
  );
}
