import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Linkedin, 
  ArrowRight, 
  Code, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap 
} from 'lucide-react';
import { CORE_TEAM } from '../data/cynbitData';

export default function Team() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-200 dark:border-white/5 bg-gradient-to-b from-cynbit-teal/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal border border-cynbit-teal/20 text-xs font-semibold uppercase tracking-wider mb-6">
            <Users className="w-3.5 h-3.5" />
            Leadership & Architectural Collective
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            The Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-cynbit-teal via-cynbit-cyan to-cynbit-sky">Cynbit</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Engineers, system architects, and problem solvers united by a single vision: engineering zero-friction digital ecosystems that empower global enterprises and the next generation of technologists.
          </p>
        </div>
      </section>

      {/* Leadership Board */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-cynbit-teal font-bold mb-3">Executive Leadership</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Founding Architects</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_TEAM.map((member) => (
              <div 
                key={member.name}
                className="group relative rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 p-8 shadow-sm hover:border-cynbit-teal/50 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cynbit-teal to-cynbit-cyan flex items-center justify-center text-white font-bold text-2xl shadow-md overflow-hidden">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      ) : (
                        <span>{member.initials}</span>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono tracking-tight border border-white/20">
                      Jaipur, IN
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cynbit-teal transition-colors">
                    {member.name}
                  </h4>
                  <div className="text-sm font-semibold text-cynbit-teal mb-4">
                    {member.role}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cynbit-teal transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077b5]" />
                    <span>Connect on LinkedIn</span>
                  </a>
                  <span className="text-[11px] font-mono text-slate-400">Verified Leadership</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Culture */}
      <section className="py-20 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-cynbit-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs uppercase tracking-widest text-cynbit-teal font-bold mb-3">Core Operating Principles</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How Our Engineering Team Operates</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              We operate as a high-velocity collective that values clean code, architectural longevity, and transparent ownership over corporate theater.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Terminal className="w-8 h-8 text-cynbit-teal mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Code As Blueprint</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We treat codebases as enterprise assets designed to be maintained, scaled, and comprehended effortlessly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Cpu className="w-8 h-8 text-cynbit-cyan mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Autonomous Innovation</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Engineers are given full problem context, freedom of architectural exploration, and zero bureaucratic friction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <ShieldCheck className="w-8 h-8 text-cynbit-sky mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Zero Ego, High Rigor</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Code reviews are constructive deep-dives that focus on resilience, benchmarked performance, and edge cases.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <GraduationCap className="w-8 h-8 text-purple-500 mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Knowledge Feedback Loop</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                What we learn building enterprise products is channeled directly into mentoring students via BitElevate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Banner */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-cynbit-dark to-cynbit-card border border-cynbit-teal/30 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cynbit-teal/20 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Want to Build with Us?</h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
              We are regularly on the lookout for forward-thinking developers, AI practitioners, and design visionaries.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all shadow-lg shadow-cynbit-teal/30"
              >
                <span>View Open Positions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/discovery"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all border border-white/10"
              >
                <span>Explore Smart Discovery</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
