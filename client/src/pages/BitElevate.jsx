import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Code2, 
  Cpu, 
  Award, 
  Compass, 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  X,
  Send
} from 'lucide-react';

export default function BitElevate() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState('Full Stack Engineering');
  const [submitted, setSubmitted] = useState(false);
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '3rd Year',
    track: 'Full Stack Engineering'
  });

  const handleApply = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setStudentForm({
        name: '',
        email: '',
        phone: '',
        college: '',
        year: '3rd Year',
        track: 'Full Stack Engineering'
      });
    }, 2500);
  };

  const cohorts = [
    {
      id: 'fullstack',
      title: 'Full Stack & Distributed Systems',
      duration: '12 Weeks',
      badge: 'Most Popular',
      desc: 'Master the complete lifecycle of production web software: React 18, Node.js microservices, caching with Redis, MongoDB, and AWS cloud deployment.',
      skills: ['React & Tailwind', 'Node.js & Express', 'MongoDB Atlas', 'Docker & CI/CD', 'REST & GraphQL'],
    },
    {
      id: 'ai-agents',
      title: 'Autonomous AI & LLM Systems',
      duration: '10 Weeks',
      badge: 'Advanced Track',
      desc: 'Move past superficial prompt engineering. Build multi-agent autonomous pipelines, RAG vector search, function-calling systems, and production LLM gateways.',
      skills: ['LangChain / LlamaIndex', 'Vector DBs (Pinecone)', 'Gemini & OpenAI APIs', 'Embeddings & RAG', 'Agentic Workflows'],
    },
    {
      id: 'system-design',
      title: 'Systems & Cloud Infrastructure',
      duration: '8 Weeks',
      badge: 'Architecture Core',
      desc: 'Deep-dive into zero-trust architectures, database sharding, fault tolerance, API rate-limiting, and high-concurrency event loops.',
      skills: ['Microservice Architecture', 'Load Balancing & NGINX', 'Event-Driven Pub/Sub', 'Security & JWT', 'Performance Profiling'],
    },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Enterprise Disclaimer Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              <strong>Student & Technologist Track:</strong> This page is exclusively dedicated to technical learning, student cohorts, and mentorship.
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
            <GraduationCap className="w-3.5 h-3.5" />
            Cynbit Technical Learning Initiative
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Bridging the Gap from Theory to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cynbit-teal via-cynbit-cyan to-cynbit-sky">Production Rigor</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            BitElevate is Cynbit’s flagship mentorship engine. We train students and developers using real industry repositories, automated code-rigor evaluations, and direct mentorship from core engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all shadow-lg shadow-cynbit-teal/20"
            >
              <span>Apply for Upcoming Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10"
            >
              <span>Explore Internships</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-cynbit-teal font-bold mb-3">Pedagogy & Rigor</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Why BitElevate is Different</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Terminal className="w-8 h-8 text-cynbit-teal mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Real Repositories</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No simulated "to-do list" tutorials. You contribute to production codebases with automated CI/CD and linting gates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Cpu className="w-8 h-8 text-cynbit-cyan mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">AI Rigor Evaluation</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Powered by Cynbit Studio’s evaluation engine, your pull requests receive automated feedback on time complexity and scalability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Code2 className="w-8 h-8 text-cynbit-sky mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">1-on-1 Architect Office Hours</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Regular technical office hours with Cynbit founders and senior engineers in Jaipur and remote channels.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
              <Award className="w-8 h-8 text-purple-500 mb-4" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Direct Hiring Pipeline</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Top performers in BitElevate cohorts transition directly into paid software engineering and AI internships at Cynbit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cohorts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-cynbit-teal font-bold mb-3">Available Programs</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Choose Your Specialization</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cohorts.map((cohort) => (
              <div 
                key={cohort.id}
                className="rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 p-8 shadow-sm hover:border-cynbit-teal/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cynbit-teal/10 text-cynbit-teal">
                      {cohort.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {cohort.duration}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {cohort.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {cohort.desc}
                  </p>

                  <div className="space-y-2 mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      Curriculum Highlights
                    </span>
                    {cohort.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cynbit-teal flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCohort(cohort.title);
                    setStudentForm(prev => ({ ...prev, track: cohort.title }));
                    setModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-cynbit-teal text-white font-semibold text-xs hover:bg-cynbit-cyan transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply for This Cohort</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Application Received</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Your interest in the <strong>{studentForm.track}</strong> has been logged. Our mentorship team will review your application.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cynbit-teal/10 flex items-center justify-center text-cynbit-teal">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      BitElevate Cohort Application
                    </h3>
                    <p className="text-xs text-cynbit-teal font-medium">
                      Direct Student Mentorship & Training
                    </p>
                  </div>
                </div>

                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      placeholder="e.g., Priya Sharma"
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
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        placeholder="priya@college.edu"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={studentForm.phone}
                        onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        College / Institution
                      </label>
                      <input
                        type="text"
                        required
                        value={studentForm.college}
                        onChange={(e) => setStudentForm({ ...studentForm, college: e.target.value })}
                        placeholder="e.g., RTU Kota / MNIT Jaipur"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Academic Year
                      </label>
                      <select
                        value={studentForm.year}
                        onChange={(e) => setStudentForm({ ...studentForm, year: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="Final Year">Final Year</option>
                        <option value="Recent Graduate">Recent Graduate</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Preferred Track
                    </label>
                    <select
                      value={studentForm.track}
                      onChange={(e) => setStudentForm({ ...studentForm, track: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                    >
                      <option value="Full Stack & Distributed Systems">Full Stack & Distributed Systems</option>
                      <option value="Autonomous AI & LLM Systems">Autonomous AI & LLM Systems</option>
                      <option value="Systems & Cloud Infrastructure">Systems & Cloud Infrastructure</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Student Application</span>
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
