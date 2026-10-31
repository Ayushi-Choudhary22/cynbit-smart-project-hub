import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Workflow, 
  Zap, 
  Target 
} from 'lucide-react';
import { TIMELINE, LIFECYCLE_STAGES } from '../data/cynbitData';

export default function Story() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-200 dark:border-white/5 bg-gradient-to-b from-cynbit-teal/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal border border-cynbit-teal/20 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Our Evolution & Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cynbit-teal via-cynbit-cyan to-cynbit-sky">Invisible</span> Logic.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Cynbit Technologies was not created overnight. It was forged through years of architectural preparation, relentless stress-testing, and an unwavering commitment to building systems that outlast the hype.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/discovery"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all shadow-lg shadow-cynbit-teal/20 hover:scale-[1.02] active:scale-95"
              >
                <span>Launch Smart Discovery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10"
              >
                <span>Meet the Architects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-20 border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-cynbit-teal font-bold mb-3">Architectural Philosophy</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Why Cynbit Exists</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 hover:border-cynbit-teal/40 transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-cynbit-teal/10 dark:bg-cynbit-teal/20 flex items-center justify-center text-cynbit-teal mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">The Optimistic Architect</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We believe that software engineering should not merely patch yesterday's bugs, but architect structural durability that lets modern enterprises innovate with fearless confidence.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 hover:border-cynbit-teal/40 transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-cynbit-sky/10 dark:bg-cynbit-sky/20 flex items-center justify-center text-cynbit-sky mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Zero-Trust by Default</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Security and systemic resilience are not afterthoughts or audit checkboxes. Every microservice, LLM gateway, and cloud infrastructure module is isolated and audited at every boundary.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 hover:border-cynbit-teal/40 transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Pragmatic AI Over Hype</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We do not integrate AI because it is trendy. We build autonomous agent pipelines, vector search, and LLM automation where they tangibly eliminate manual overhead and compress execution cycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Timeline Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cynbit-teal/10 text-cynbit-teal text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5" />
              Official Company Timeline
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Evolution of Our Systems</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              From our first line of zero-trust backend scaffolding in 2021 to full-scale enterprise delivery in 2024.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 md:ml-1/2 space-y-12">
            {TIMELINE.map((item, index) => (
              <div key={item.year} className="relative pl-8 md:pl-10">
                {/* Marker */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cynbit-teal border-4 border-white dark:border-cynbit-dark" />
                
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm hover:border-cynbit-teal/50 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl md:text-3xl font-black text-cynbit-teal tracking-tight">{item.year}</span>
                      <span className="text-base font-bold text-slate-900 dark:text-white">{item.stage}</span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cynbit-teal/10 text-cynbit-teal">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cynbit-teal" />
                    <span>{item.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six-Stage Delivery Lifecycle */}
      <section className="py-20 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-cynbit-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cynbit-teal/10 text-cynbit-teal text-xs font-semibold mb-3">
              <Workflow className="w-3.5 h-3.5" />
              Delivery Lifecycle
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Six-Stage Delivery Lifecycle</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Our systematic framework transforms ambiguous business requirements into high-availability digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIFECYCLE_STAGES.map((stage) => (
              <div 
                key={stage.number}
                className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 hover:border-cynbit-teal/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-cynbit-teal/40 font-mono mb-4 block">
                    {stage.number}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 border-t border-slate-200 dark:border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to experience the Cynbit engineering methodology?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-2xl mx-auto mb-8">
            Experience our Smart Project Hub to clarify your requirements into an AI-architected blueprint in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/discovery"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all shadow-lg shadow-cynbit-teal/20"
            >
              <span>Start Smart Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10"
            >
              <span>Contact Jaipur Office</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
