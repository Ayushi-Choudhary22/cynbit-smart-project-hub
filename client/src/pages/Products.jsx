import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Building2, 
  GraduationCap, 
  BarChart3, 
  Bot, 
  X,
  Send
} from 'lucide-react';
import { PRODUCTS } from '../data/cynbitData';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setDemoSubmitted(false);
      setDemoForm({ name: '', email: '', company: '', message: '' });
    }, 2500);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-200 dark:border-white/5 bg-gradient-to-b from-cynbit-teal/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal border border-cynbit-teal/20 text-xs font-semibold uppercase tracking-wider mb-6">
            <Layers className="w-3.5 h-3.5" />
            Proprietary Software Ecosystem
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Products Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-cynbit-teal via-cynbit-cyan to-cynbit-sky">Zero-Trust Logic</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Beyond bespoke client engineering, Cynbit actively develops, stress-tests, and operates proprietary software platforms engineered to eliminate friction across education, property operations, and customer sentiment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/discovery"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all shadow-lg shadow-cynbit-teal/20"
            >
              <span>Explore Custom Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {PRODUCTS.map((product, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div 
                key={product.id}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual / Graphic Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group rounded-3xl p-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-cynbit-card dark:to-cynbit-dark border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cynbit-teal/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cynbit-teal/20 transition-all duration-500" />
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-cynbit-teal/10 dark:bg-cynbit-teal/20 flex items-center justify-center text-cynbit-teal">
                          {product.id === 'cynbit-studio' && <GraduationCap className="w-6 h-6" />}
                          {product.id === 'tenantease' && <Building2 className="w-6 h-6" />}
                          {product.id === 'revio' && <Bot className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-cynbit-teal font-semibold">
                            {product.category}
                          </div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">
                            {product.name}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {product.status}
                      </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 space-y-4 mb-6">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span>Architecture: Verified</span>
                        <span>Multi-Tenant Node</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cynbit-teal to-cynbit-cyan w-4/5 rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                          <span className="text-[10px] font-mono text-slate-400 block uppercase">Response Time</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">&lt; 42ms p99</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                          <span className="text-[10px] font-mono text-slate-400 block uppercase">Data Residency</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">Jaipur (IN) / Global</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Proprietary Cynbit IP
                      </span>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cynbit-teal hover:text-cynbit-cyan"
                      >
                        <span>Interactive Demo Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-cynbit-teal" />
                    <span>{product.tagline}</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                    {product.name}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    {product.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Core Functional Modules
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-cynbit-teal flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="px-6 py-3 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all text-sm shadow-md"
                    >
                      Request Architecture Deep Dive
                    </button>
                    <Link
                      to="/discovery"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-cynbit-teal"
                    >
                      <span>Tailor for Your Enterprise</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 p-8 shadow-2xl overflow-hidden">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {demoSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Demo Request Logged</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Thank you! Our engineering team will prepare technical specification sheets for <strong>{selectedProduct.name}</strong>.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cynbit-teal/10 flex items-center justify-center text-cynbit-teal">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Request Architecture Brief
                    </h3>
                    <p className="text-xs text-cynbit-teal font-medium">
                      {selectedProduct.name} • {selectedProduct.category}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                  Provide your work email to receive technical architecture blueprints, benchmark specs, and integration schemas.
                </p>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      placeholder="e.g., Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={demoForm.company}
                      onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                      placeholder="e.g., Acme Health"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Specific Inquiries / Deployment Environment
                    </label>
                    <textarea
                      rows={2}
                      value={demoForm.message}
                      onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                      placeholder="e.g., Interested in private cloud deployment and vector indexing..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Architecture Inquiry</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
