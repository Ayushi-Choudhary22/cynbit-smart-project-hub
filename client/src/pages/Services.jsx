import React from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Cpu,
  Cloud,
  TrendingUp,
  ArrowRight,
  Code2,
  Database,
  Layers,
  Sparkles,
  Compass,
  CheckCircle,
} from 'lucide-react';

export default function Services() {
  const techStack = {
    languages: ['TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++'],
    frameworks: ['React', 'Next.js', 'NestJS', 'FastAPI', 'Django', 'Tailwind CSS'],
    aiData: ['Gemini API', 'LangChain', 'PyTorch', 'Pinecone', 'pgvector', 'TensorFlow'],
    cloudOps: ['AWS (ECS/RDS)', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines'],
    databases: ['PostgreSQL', 'MongoDB Atlas', 'Redis', 'Supabase', 'Neo4j', 'ClickHouse'],
  };

  return (
    <div className="bg-surface dark:bg-surface-dark overflow-hidden transition-colors">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 px-4 md:px-8 lg:px-12 bg-surface dark:bg-surface-dark text-left">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-[11px] uppercase tracking-widest border border-teal-200/60 dark:border-teal-800/60">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              Service Ecosystem
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-headline font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
              Built for <span className="text-gradient-primary italic">Scale</span>.<br />
              Designed for Performance.
            </h1>

            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
              AI automation, autonomous agents, scalable full-stack software, custom dashboards, SaaS platforms, and digital infrastructure engineered for modern businesses.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/discovery">
                <button className="bg-primary text-white hover:bg-primary-hover px-8 py-4 rounded-full font-bold text-base shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3">
                  <Compass className="w-5 h-5 text-white" />
                  Find My Solution Blueprint
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <div className="space-y-24 py-12">
        {/* Pillar 1: AI Automation Suite */}
        <section className="px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto text-left">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-primary"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary dark:text-primary-dim">
                  AI Automation Suite
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-slate-900 dark:text-white tracking-tight">
                Autonomous AI agents & cognitive automation
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mt-3 font-medium">
                Beyond basic chatbots. We build autonomous AI agents and cognitive automation systems that transform business operations through intelligent execution.
              </p>
            </div>

            <Link to="/discovery?category=ai-automation">
              <button className="px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] bg-primary text-white shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2">
                Inquire AI Automation <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-primary-dim flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">Autonomous Agents</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Smart AI assistants that manage multi-step leads, dispatch, and cross-platform workflows.</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-primary-dim flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">LLM Automation</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Automate document parsing, invoice extraction, and unstructured data entry with AI.</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-primary-dim flex items-center justify-center mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">AI Voice Agents</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Advanced voice-driven AI for customer inbound calls and automated appointment scheduling.</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-primary-dim flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">AI Stack Integration</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Embedding cognitive intelligence and vector search directly into your existing SaaS products.</p>
            </div>
          </div>
        </section>

        {/* Pillar 2: Custom IT & Cloud Infrastructure */}
        <section className="px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto text-left">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-secondary"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">
                  Custom IT Services
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-slate-900 dark:text-white tracking-tight">
                Scalable software development & cloud systems
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mt-3 font-medium">
                High-performance software engineering meeting enterprise standards. We build resilient cloud infrastructure powering modern digital ecosystems.
              </p>
            </div>

            <Link to="/discovery?category=web-app">
              <button className="px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] bg-secondary text-white shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2">
                Inquire Software Dev <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">Full-Stack Dev</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Scalable Web & Mobile platforms built with modern React, Next.js, and Node.js.</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">Backend Systems</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Secure API design optimized for 99.9% uptime, distributed caching, and zero latency.</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">Cloud Infrastructure</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Zero-trust cloud deployments across AWS and Azure with automated Terraform IaC.</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">Legacy Modernization</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Migrating legacy monolithic databases into agile, cloud-native microservices.</p>
            </div>
          </div>
        </section>

        {/* Pillar 3: Data-Driven Marketing & SEO */}
        <section className="px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto text-left">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-tertiary"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-tertiary">
                  Digital Marketing
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-slate-900 dark:text-white tracking-tight">
                Data-driven marketing & technical SEO
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mt-3 font-medium">
                Performance-led strategies that merge technical SEO with high-impact creative to dominate search rankings and scale ROI.
              </p>
            </div>

            <Link to="/discovery?category=marketing-seo">
              <button className="px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] bg-tertiary text-white shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2">
                Inquire Growth <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">Performance Ads</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Strategic Google & Meta Ads campaigns focused on maximum lead conversion and measurable ROI.</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">Technical SEO</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Server-side rendering, schema markup, and web vital optimizations ensuring top search positions.</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">CRM Automation</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Automated marketing engines that nurture cold prospects into committed clients automatically.</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold font-headline mb-2 text-slate-900 dark:text-white uppercase">Funnel Optimization</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">High-conversion landing page design guided by telemetry and user behavioral analysis.</p>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION: ARCHITECTURAL TECH STACK */}
      <section id="stack" className="py-24 px-4 md:px-8 lg:px-12 bg-slate-950 text-white text-left">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="text-primary-light font-black uppercase tracking-[0.5em] text-[10px] mb-3 block">
              Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-white tracking-tight mb-4">
              Architectural tech stack.
            </h2>
            <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
              We leverage every industry-standard language, framework, and cloud utility to ensure your ecosystem is secure, scalable, and future-proof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary dark:text-primary-light mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.languages.map((l, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-200/60 dark:bg-slate-800 rounded-full text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary dark:text-primary-light mb-4">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.frameworks.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-200/60 dark:bg-slate-800 rounded-full text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary dark:text-primary-light mb-4">AI & Data</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.aiData.map((a, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-200/60 dark:bg-slate-800 rounded-full text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary dark:text-primary-light mb-4">Cloud & Ops</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.cloudOps.map((c, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-200/60 dark:bg-slate-800 rounded-full text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary dark:text-primary-light mb-4">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.databases.map((d, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-200/60 dark:bg-slate-800 rounded-full text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-4 md:px-8 lg:px-12 py-20 bg-surface dark:bg-surface-dark">
        <div className="max-w-screen-xl mx-auto bg-primary text-white rounded-[3rem] p-10 md:p-16 text-center shadow-xl">
          <h2 className="text-3xl md:text-5xl font-headline font-black uppercase italic mb-4">
            Unsure which service matches your exact scope?
          </h2>
          <p className="text-base text-white/90 max-w-2xl mx-auto mb-8 font-medium">
            Try our new Smart Project Discovery flow. We will analyze your requirements and formulate an editable project blueprint in minutes.
          </p>
          <Link to="/discovery">
            <button className="bg-white text-primary px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-100 transition-all">
              Launch Smart Solution Finder
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
