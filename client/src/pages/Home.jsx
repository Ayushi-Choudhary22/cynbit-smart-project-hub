import React from 'react';
import { Link } from 'react-router-dom';
import HubGraphic from '../components/HubGraphic';
import Marquee from '../components/Marquee';
import { LIFECYCLE_STAGES, CYNBIT_EDGE_PILLARS } from '../data/cynbitData';
import {
  ArrowRight,
  Terminal,
  Layers,
  Sparkles,
  School,
  Heart,
  TrendingUp,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Rocket,
  Code,
  Cloud,
  Search,
  Zap,
  Target,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-surface dark:bg-surface-dark overflow-hidden transition-colors">
      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-4 md:px-8 lg:px-12 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/15 rounded-full blur-[140px] -mr-[300px] -mt-[300px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 dark:bg-secondary/10 rounded-full blur-[120px] -ml-[200px] -mb-[200px] pointer-events-none"></div>

        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 text-left">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-[11px] uppercase tracking-widest border border-teal-200/60 dark:border-teal-800/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              The Optimistic Architect
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-headline font-black tracking-tighter leading-[1.08] text-slate-900 dark:text-white">
              Architecting the future with{' '}
              <span className="text-gradient-primary italic block">
                AI automation.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-body leading-relaxed font-medium">
              Cynbit Technologies architects the digital future with{' '}
              <Link to="/services" className="text-primary dark:text-primary-dim hover:underline underline-offset-4 font-bold">
                autonomous AI agents
              </Link>
              , custom software development, and scalable business platforms. Based in Jaipur, Rajasthan, we bridge the gap between technical precision and global business growth.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/discovery">
                <button className="bg-primary text-white hover:bg-primary-hover px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg shadow-xl shadow-primary/25 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3 group">
                  <Compass className="w-5 h-5 text-white" />
                  Start Smart Discovery
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </Link>

              <Link to="/services">
                <button className="bg-surface-container dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg shadow-md hover:-translate-y-1 active:scale-95 transition-all border border-slate-200/80 dark:border-slate-700">
                  Explore Services
                </button>
              </Link>
            </div>

            {/* Smart Project Hub Spotlight Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 p-3.5 px-5 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/20 max-w-xl">
                <Sparkles className="w-5 h-5 text-primary dark:text-primary-dim shrink-0" />
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <strong className="text-primary dark:text-primary-dim font-bold">New: Smart Solution Finder & AI Blueprint.</strong> Answer structured discovery questions to generate an editable, technical project brief instantly.
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HubGraphic />
          </div>
        </div>
      </section>

      {/* SECTION 2: FOUNDATIONAL PILLARS (OUR ECOSYSTEM) */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 text-left">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <span className="text-primary dark:text-primary-dim font-black uppercase tracking-[0.4em] text-[10px] mb-3 block">
              Our Ecosystem
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-slate-900 dark:text-white mb-4">
              Foundational pillars.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
              Integrated excellence across AI technology, full-stack software development, and human-centric responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-slate-900 dark:text-white">
            {/* Left Card: Custom IT infrastructure */}
            <div className="md:col-span-7">
              <div className="bg-white dark:bg-slate-950 p-8 sm:p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 h-full border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-dim rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                    <Terminal className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-headline font-bold mb-4 tracking-tight">
                    Custom IT infrastructure
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg font-medium">
                    Specialized software architecture and secure cloud foundations. We engineer scalable growth engines designed to accelerate technical maturity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 mt-auto">
                  <Link
                    to="/services"
                    className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group"
                  >
                    <span className="text-primary dark:text-primary-dim font-bold block mb-1 uppercase text-sm">
                      AI automation
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em]">
                      LLM & Agents
                    </span>
                  </Link>

                  <Link
                    to="/services"
                    className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-secondary/50 transition-all group"
                  >
                    <span className="text-secondary font-bold block mb-1 uppercase text-sm">
                      Software Dev
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em]">
                      Web & Mobile
                    </span>
                  </Link>

                  <Link
                    to="/services"
                    className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-tertiary/50 transition-all group"
                  >
                    <span className="text-tertiary font-bold block mb-1 uppercase text-sm">
                      Cloud Systems
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em]">
                      AWS & Azure
                    </span>
                  </Link>

                  <Link
                    to="/services"
                    className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group"
                  >
                    <span className="text-primary font-bold block mb-1 uppercase text-sm">
                      Technical SEO
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em]">
                      Search Dominancy
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Card: Proprietary SaaS suite */}
            <div className="md:col-span-5">
              <div className="bg-primary text-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/30 flex flex-col justify-between h-full relative overflow-hidden group">
                <div className="space-y-8 relative z-10">
                  <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Layers className="w-8 h-8 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-4xl font-headline font-bold tracking-tight">
                      Proprietary SaaS suite
                    </h3>
                    <p className="text-white/80 text-base sm:text-lg font-medium leading-relaxed">
                      Bespoke digital ecosystems engineered for specific market challenges and organizational excellence.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link
                      to="/products#cynbit-studio"
                      className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/20 transition-all"
                    >
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-black text-sm">
                        CS
                      </div>
                      <div>
                        <div className="font-bold uppercase text-xs tracking-tight">Cynbit Studio</div>
                        <div className="text-[9px] text-white/70 font-bold uppercase tracking-widest">
                          Career Intelligence Lab
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/products#revio"
                      className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/20 transition-all"
                    >
                      <div className="w-10 h-10 bg-purple-200 text-purple-900 rounded-xl flex items-center justify-center font-black text-sm">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold uppercase text-xs tracking-tight">Revio</div>
                        <div className="text-[9px] text-white/70 font-bold uppercase tracking-widest">
                          AI Review & Sentiment Engine
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/products#tenantease"
                      className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/20 transition-all"
                    >
                      <div className="w-10 h-10 bg-sky-200 text-sky-900 rounded-xl flex items-center justify-center font-black text-sm">
                        TE
                      </div>
                      <div>
                        <div className="font-bold uppercase text-xs tracking-tight">TenantEase</div>
                        <div className="text-[9px] text-white/70 font-bold uppercase tracking-widest">
                          Property Management Platform
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Ambient glow */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Bottom Full-Width Card: Human-centric impact */}
            <div className="md:col-span-12">
              <div className="bg-white dark:bg-slate-950 p-8 sm:p-12 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-12 items-center text-left">
                  <div className="flex-1 space-y-6">
                    <div className="w-16 h-16 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 rounded-2xl flex items-center justify-center shadow-sm">
                      <Heart className="w-8 h-8" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-4xl font-headline font-bold tracking-tight">
                        Human-centric impact
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                        Beyond code, we invest in human potential. Through our partnership with <strong>Manav Seva Trust</strong>, we provide Computer and IT teaching to rural areas and government schools, bridging the digital divide across Rajasthan.
                      </p>
                    </div>

                    <Link
                      to="/story#impact"
                      className="inline-flex items-center gap-2 text-primary dark:text-primary-dim font-black uppercase tracking-[0.2em] text-xs hover:gap-4 transition-all"
                    >
                      Explore our mission
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <Link
                      to="/bitelevate"
                      className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all block"
                    >
                      <h4 className="font-black text-primary dark:text-primary-dim uppercase text-sm tracking-wider mb-2">
                        BitElevate
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                        Technical literacy & unstructured learning for the next generation of software architects.
                      </p>
                    </Link>

                    <Link
                      to="/story#impact"
                      className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all block"
                    >
                      <h4 className="font-black text-teal-600 dark:text-teal-400 uppercase text-sm tracking-wider mb-2">
                        Manav Seva
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                        Tech-enabled support for rural community growth and digital classroom enablement.
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BITELEVATE (DARK HERO SHOWCASE) */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-slate-950 text-white relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/50 text-teal-300 text-[10px] font-black uppercase tracking-widest border border-teal-700/50">
                <School className="w-3.5 h-3.5" />
                Empowering Careers
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-headline font-black tracking-tighter leading-tight text-white">
                BitElevate.
              </h2>

              <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                A globally recognized training program designed to bridge the gap between academic learning and industry mastery. We prepare students for the high-demand world of modern architectural engineering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-light shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Global Certification</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">Industry-standard credentials accepted by top tech firms.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-light shrink-0">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Expert Mentorship</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">Learn directly from senior architects and tech leaders.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-light shrink-0">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Industry Projects</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">Build real-world systems with professional-grade rigor.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-light shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Career Placement</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">Dedicated support to land roles in premium tech companies.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 items-center">
                <Link to="/bitelevate">
                  <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-slate-200 transition-all">
                    Join the Program
                  </button>
                </Link>

                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-white">1000+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-tight">
                    Certified <br />Architects
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Glass Badge */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="w-72 sm:w-84 h-72 sm:h-84 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/15 p-8 flex flex-col items-center justify-center text-center shadow-2xl relative">
                <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 border border-white/20">
                  <School className="w-10 h-10 text-primary-light" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-dim mb-2">
                  Certified
                </div>
                <div className="text-2xl font-headline font-black text-white mb-4">
                  Software Architect
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {'★★★★★'}
                </div>
                <div className="mt-6 text-xs text-slate-400 font-semibold">
                  Competency: Full-Stack Dev & AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE CYNBIT EDGE (4 CARDS) */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface dark:bg-surface-dark text-left">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <span className="text-primary dark:text-primary-dim font-black uppercase tracking-[0.4em] text-[10px] mb-3 block">
              The Cynbit Edge
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-slate-900 dark:text-white mb-4">
              The speed of a startup.<br />The rigor of an enterprise.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl font-medium opacity-80 max-w-2xl">
              We combine technical agility with structured execution to deliver outcomes that scale with your ambitions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-primary/5 dark:bg-primary/10 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary dark:text-primary-dim mb-6 shadow-sm">
                <Rocket className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2 text-slate-900 dark:text-white">Startup Speed</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Rapid execution without bureaucratic overhead or sluggish meetings.</p>
            </div>

            <div className="p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-secondary/5 dark:bg-secondary/10 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-secondary mb-6 shadow-sm">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2 text-slate-900 dark:text-white">AI-First Thinking</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Systems engineered from the foundation for autonomous reasoning and automation.</p>
            </div>

            <div className="p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-tertiary/5 dark:bg-tertiary/10 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-tertiary mb-6 shadow-sm">
                <Code className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2 text-slate-900 dark:text-white">End-to-End Dev</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Full ownership from discovery, high-fidelity UI design to cloud deployment.</p>
            </div>

            <div className="p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary-light mb-6 shadow-sm">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2 text-slate-900 dark:text-white">ROI Engineering</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">We architect directly for measurable business impact and long-term viability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DOMAIN MASTERY */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-slate-900 text-white relative overflow-hidden text-left">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8 space-y-12">
              <div>
                <span className="text-xs font-black text-primary-light uppercase tracking-[0.5em] block mb-3">
                  Domain Mastery
                </span>
                <h2 className="text-3xl md:text-5xl font-headline font-black text-white leading-tight">
                  Architectural mastery across <span className="text-primary-light italic">four domains</span>.
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                  <Code className="w-8 h-8 text-primary-light mb-4" />
                  <h3 className="text-xl font-bold font-headline text-white mb-2">Software Engineering</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Secure full-stack development and cloud migration foundations.</p>
                </div>

                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                  <Search className="w-8 h-8 text-secondary-light mb-4" />
                  <h3 className="text-xl font-bold font-headline text-white mb-2">Digital Marketing & SEO</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Data-driven ROI engines merging technical SEO with creative precision.</p>
                </div>

                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                  <Cpu className="w-8 h-8 text-primary-light mb-4" />
                  <h3 className="text-xl font-bold font-headline text-white mb-2">AI Automation</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Custom LLMs and autonomous agents designed for cognitive operations.</p>
                </div>

                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                  <Cloud className="w-8 h-8 text-secondary-light mb-4" />
                  <h3 className="text-xl font-bold font-headline text-white mb-2">Cloud Infrastructure</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Zero-trust deployment across AWS and Azure for global business scale.</p>
                </div>
              </div>
            </div>

            {/* Metrics column */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl sm:text-5xl font-headline font-black text-primary-light mb-1">98%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Retention</div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl sm:text-5xl font-headline font-black text-primary-light mb-1">24/7</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Support</div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl sm:text-5xl font-headline font-black text-primary-light mb-1">3x</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">ROI Uplift</div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl sm:text-5xl font-headline font-black text-primary-light mb-1">6+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Reach</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ARCHITECTURAL LIFECYCLE (6 STAGES) */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800 text-left">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <span className="text-primary dark:text-primary-dim font-black uppercase tracking-[0.4em] text-[10px] mb-3 block">
              Architectural Lifecycle
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-slate-900 dark:text-white tracking-tighter">
              How we construct digital success.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl font-medium mt-3 max-w-2xl">
              Our process is a structured sequence of precision and empathy, designed to maximize scalability and minimize friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LIFECYCLE_STAGES.map((stage) => (
              <div
                key={stage.number}
                className="p-8 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:shadow-xl transition-all group"
              >
                <div className="text-3xl font-black text-primary/30 dark:text-primary/40 group-hover:text-primary dark:group-hover:text-primary-dim transition-colors mb-4 tabular-nums">
                  {stage.number}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xl tracking-tight mb-2">
                  {stage.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          {/* Connected Hub Discovery CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-left">
              <div className="text-[10px] font-black uppercase tracking-widest text-teal-200">
                Stage 1 & 2 Automated
              </div>
              <h4 className="text-2xl font-bold font-headline">
                Start with Discovery & AI Blueprinting today
              </h4>
              <p className="text-sm text-white/80 max-w-xl">
                Experience our new Smart Project Hub to define your scope, clarify requirements, and get a tailored architectural blueprint in 3 minutes.
              </p>
            </div>
            <Link to="/discovery">
              <button className="bg-white text-primary px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-100 active:scale-95 transition-all whitespace-nowrap shadow-md">
                Launch Smart Discovery
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: VALIDATION MARQUEE & THE CYNBIT EDGE */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface dark:bg-surface-dark text-left">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-12">
            <span className="text-primary dark:text-primary-dim font-black uppercase tracking-[0.4em] text-[10px] mb-3 block">
              Validation & Trusted Ecosystem
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-slate-900 dark:text-white">
              Trusted by high-growth visionaries.
            </h2>
          </div>

          {/* Infinite Client Ticker */}
          <Marquee />

          {/* The Cynbit Edge */}
          <div className="mt-24">
            <div className="mb-14">
              <span className="text-primary dark:text-primary-dim font-black uppercase tracking-[0.4em] text-[10px] mb-3 block">
                The Cynbit Edge
              </span>
              <h3 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-slate-900 dark:text-white mb-4">
                The speed of a startup.<br />The rigor of an enterprise.
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl font-medium">
                We combine technical agility with structured execution to deliver outcomes that scale with your ambitions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CYNBIT_EDGE_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all group"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform text-primary dark:text-primary-dim">
                      {pillar.icon === 'bolt' && <Zap className="w-7 h-7" />}
                      {pillar.icon === 'psychology' && <Cpu className="w-7 h-7 text-secondary" />}
                      {pillar.icon === 'shield_check' && <ShieldCheck className="w-7 h-7 text-tertiary" />}
                      {pillar.icon === 'target' && <Target className="w-7 h-7 text-primary" />}
                    </div>
                    <h4 className="text-xl font-bold font-headline text-slate-900 dark:text-white mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: READY TO BUILD CTA */}
      <section className="px-4 md:px-8 lg:px-12 py-20 bg-surface dark:bg-surface-dark">
        <div className="max-w-screen-xl mx-auto bg-primary text-white rounded-[3rem] p-10 md:p-20 relative overflow-hidden text-center shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-headline font-black tracking-tighter uppercase italic leading-tight">
              Ready to build your <br />
              <span className="text-teal-200">digital future?</span>
            </h2>

            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-medium">
              Let's discuss how our AI automation and custom software development expertise can transform your business vision into reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/discovery">
                <button className="bg-white text-primary px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-slate-100 active:scale-95 transition-all w-full sm:w-auto">
                  Start Discovery Phase
                </button>
              </Link>
              <Link to="/contact">
                <button className="border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs active:scale-95 transition-all w-full sm:w-auto">
                  Contact Team
                </button>
              </Link>
            </div>
          </div>

          {/* Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
