import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Cpu, 
  Users, 
  HelpCircle,
  X,
  Send,
  Building
} from 'lucide-react';
import { CAREERS_LIST } from '../data/cynbitData';

export default function Careers() {
  const [activeTab, setActiveTab] = useState('internships');
  const [selectedRole, setSelectedRole] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    resumeLink: '',
    note: ''
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setSelectedRole(null);
      setApplied(false);
      setApplicationForm({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        resumeLink: '',
        note: ''
      });
    }, 2500);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Enterprise Disclaimer Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              <strong>Careers & Internships Portal:</strong> Looking for employment or internships at Cynbit? Apply below.
            </span>
          </div>
          <Link
            to="/discovery"
            className="font-bold underline text-cynbit-teal dark:text-cynbit-cyan hover:opacity-80 flex-shrink-0"
          >
            Looking to commission business software? Go to Enterprise Hub →
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-200 dark:border-white/5 bg-gradient-to-b from-cynbit-teal/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal border border-cynbit-teal/20 text-xs font-semibold uppercase tracking-wider mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            Talent & Careers
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Build the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cynbit-teal via-cynbit-cyan to-cynbit-sky">Digital Logic</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            At Cynbit, you don't push mindless tickets. You co-architect enterprise platforms, train autonomous AI systems, and master technical problem-solving with high-velocity ownership.
          </p>
        </div>
      </section>

      {/* Culture Highlights */}
      <section className="py-16 border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Cpu className="w-7 h-7 text-cynbit-teal mb-3" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">State-of-the-Art Tooling</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Work directly with modern stacks: React 18, Node.js, vector databases, LLM orchestration, and modern cloud deployment.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Building className="w-7 h-7 text-cynbit-cyan mb-3" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Hybrid & Flexible</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Operating out of our Jaipur headquarters in Pratap Nagar with flexible remote options across India.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Sparkles className="w-7 h-7 text-purple-500 mb-3" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Direct Mentorship</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Work in flat hierarchies directly alongside the founders with transparent code reviews and career coaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveTab('internships')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'internships'
                  ? 'bg-cynbit-teal text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Internships & Trainees ({CAREERS_LIST.internships.length})
            </button>
            <button
              onClick={() => setActiveTab('fulltime')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'fulltime'
                  ? 'bg-cynbit-teal text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Full-Time Roles ({CAREERS_LIST.fullTime.length})
            </button>
          </div>

          {/* Listings */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {activeTab === 'internships' ? (
              CAREERS_LIST.internships.map((role) => (
                <div
                  key={role.title}
                  className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 hover:border-cynbit-teal/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-cynbit-teal/10 text-cynbit-teal font-semibold">
                        {role.department}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {role.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cynbit-teal transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                      {role.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRole(role)}
                    className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-cynbit-teal dark:hover:bg-cynbit-teal dark:hover:text-white transition-all flex items-center gap-2"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              CAREERS_LIST.fullTime.map((role) => (
                <div
                  key={role.title}
                  className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 hover:border-cynbit-teal/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-cynbit-teal/10 text-cynbit-teal font-semibold">
                        {role.department}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {role.experience}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {role.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cynbit-teal transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                      {role.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRole(role)}
                    className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-cynbit-teal dark:hover:bg-cynbit-teal dark:hover:text-white transition-all flex items-center gap-2"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application Drawer / Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 p-8 shadow-2xl">
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {applied ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Application Submitted!</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We have received your application for <strong>{selectedRole.title}</strong>. Our hiring team will review your profile and contact you.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cynbit-teal/10 flex items-center justify-center text-cynbit-teal">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Apply: {selectedRole.title}
                    </h3>
                    <p className="text-xs text-cynbit-teal font-medium">
                      {selectedRole.department} • {selectedRole.location}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationForm.name}
                      onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                      placeholder="e.g., Rohit Verma"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                        placeholder="rohit@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                        placeholder="+91 91234 56789"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Resume URL / Google Drive Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={applicationForm.resumeLink}
                      onChange={(e) => setApplicationForm({ ...applicationForm, resumeLink: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      GitHub / Portfolio Link
                    </label>
                    <input
                      type="url"
                      value={applicationForm.portfolio}
                      onChange={(e) => setApplicationForm({ ...applicationForm, portfolio: e.target.value })}
                      placeholder="https://github.com/yourhandle"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Why do you want to join Cynbit?
                    </label>
                    <textarea
                      rows={2}
                      value={applicationForm.note}
                      onChange={(e) => setApplicationForm({ ...applicationForm, note: e.target.value })}
                      placeholder="Highlight relevant projects or code repositories..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
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
