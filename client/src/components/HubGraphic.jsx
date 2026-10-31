import React from 'react';
import { Cpu, Zap, Activity, CheckCircle, Shield } from 'lucide-react';

export default function HubGraphic() {
  return (
    <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center select-none">
      {/* Background Pulse Glow Orbs */}
      <div className="absolute w-[380px] h-[380px] md:w-[480px] md:h-[480px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[90px] pointer-events-none animate-pulse"></div>
      <div className="absolute w-[280px] h-[280px] bg-secondary/15 rounded-full blur-[70px] pointer-events-none delay-1000"></div>

      {/* Orbit Rings */}
      <div className="absolute w-[360px] h-[360px] md:w-[460px] md:h-[460px] border border-primary/15 dark:border-primary/25 rounded-full pointer-events-none"></div>
      <div className="absolute w-[290px] h-[290px] md:w-[370px] md:h-[370px] border border-dashed border-primary/20 dark:border-primary/30 rounded-full pointer-events-none animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] border border-dotted border-secondary/25 rounded-full pointer-events-none animate-[spin_40s_linear_infinite_reverse]"></div>

      {/* Central Glass Sphere */}
      <div className="relative z-20 w-64 h-64 md:w-80 md:h-80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-full shadow-2xl border border-white/60 dark:border-white/10 flex flex-col items-center justify-center group transition-all duration-700 hover:scale-105">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-dim mb-3 shadow-inner group-hover:scale-110 transition-transform duration-500">
          <Cpu className="w-10 h-10 md:w-12 md:h-12" />
        </div>
        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-primary dark:text-primary-dim opacity-80">
          Architectural Core
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
          Zero-Friction Engine
        </div>

        {/* Inner scan line */}
        <div className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-xs pointer-events-none"></div>
      </div>

      {/* Floating Card: Automation Efficiency */}
      <div className="absolute -top-4 -right-2 md:top-4 md:right-4 w-44 md:w-52 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-white/40 dark:border-white/10 shadow-xl z-30 transition-transform hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-primary dark:text-primary-dim">
              AI Automation
            </div>
            <div className="text-[9px] text-slate-400 font-medium">Cognitive Logic</div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-[95%] transition-all duration-1000"></div>
          </div>
          <div className="flex justify-between text-[9px] font-bold text-slate-500 dark:text-slate-400">
            <span>Optimization</span>
            <span className="text-primary font-black">95%</span>
          </div>
        </div>
      </div>

      {/* Floating Card: Runtime Active */}
      <div className="absolute -bottom-4 -left-2 md:bottom-6 md:left-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-4 md:p-5 rounded-3xl border border-white/40 dark:border-white/10 shadow-xl z-30 flex items-center gap-4 transition-transform hover:-translate-y-1">
        <div className="w-10 h-10 rounded-2xl bg-tertiary-fixed text-tertiary-on-fixed flex items-center justify-center shrink-0">
          <Activity className="w-5 h-5 text-teal-800 animate-pulse" />
        </div>
        <div className="text-left">
          <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            System Runtime
          </div>
          <div className="text-xs font-bold text-primary dark:text-primary-dim flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Active Now (99.9% Uptime)
          </div>
        </div>
      </div>

      {/* Floating Orb: Shield / Security */}
      <div className="absolute top-1/4 -left-4 md:-left-8 w-12 h-12 md:w-14 md:h-14 bg-secondary-fixed text-secondary-container rounded-2xl flex items-center justify-center shadow-lg border border-white/40 dark:border-white/10 z-20 hover:scale-110 transition-transform">
        <Shield className="w-6 h-6 text-sky-800" />
      </div>
    </div>
  );
}
