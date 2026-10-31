import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { COMPANY_INFO, FAQ_LIST } from '../data/cynbitData';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 border-b border-slate-200 dark:border-white/5 bg-gradient-to-b from-cynbit-teal/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal border border-cynbit-teal/20 text-xs font-semibold uppercase tracking-wider mb-6">
            <Mail className="w-3.5 h-3.5" />
            Connect with Cynbit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Let's Engineer Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cynbit-teal via-cynbit-cyan to-cynbit-sky">Digital Architecture</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Have a project in mind, want to partner, or need technical consulting? Reach our engineering team in Jaipur or use our AI discovery engine for instant project scoping.
          </p>
        </div>
      </section>

      {/* Discovery Callout Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-cynbit-dark via-slate-900 to-cynbit-card border border-cynbit-teal/40 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cynbit-teal/20 flex items-center justify-center text-cynbit-cyan flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cynbit-cyan font-bold">
                Recommended For New Projects
              </div>
              <h3 className="text-xl font-bold">
                Start with Smart Project Discovery
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Instead of waiting for an introductory email exchange, turn your incomplete requirements into a comprehensive, AI-architected blueprint right now.
              </p>
            </div>
          </div>
          <Link
            to="/discovery"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-cynbit-teal hover:bg-cynbit-cyan text-white font-semibold text-sm transition-all shadow-lg shadow-cynbit-teal/30 flex items-center gap-2"
          >
            <span>Launch Smart Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Details Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-cynbit-teal font-bold mb-2">Direct Access</h2>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Headquarters</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-cynbit-teal/10 flex items-center justify-center text-cynbit-teal flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Jaipur Office</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {COMPANY_INFO.address}
                    </p>
                    <span className="inline-block mt-2 text-[11px] font-mono text-cynbit-teal font-medium">
                      Registered Engineering Hub
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-cynbit-sky/10 flex items-center justify-center text-cynbit-sky flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Phone Lines</h4>
                    <div className="space-y-1">
                      {COMPANY_INFO.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s+/g, '')}`}
                          className="block text-xs text-slate-600 dark:text-slate-400 hover:text-cynbit-teal font-mono"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Email Dispatch</h4>
                    <div className="space-y-1">
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="block text-xs text-slate-600 dark:text-slate-400 hover:text-cynbit-teal font-mono"
                      >
                        {COMPANY_INFO.email}
                      </a>
                      <a
                        href={`mailto:${COMPANY_INFO.supportEmail}`}
                        className="block text-xs text-slate-600 dark:text-slate-400 hover:text-cynbit-teal font-mono"
                      >
                        {COMPANY_INFO.supportEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white mb-2">
                  <Clock className="w-4 h-4 text-cynbit-teal" />
                  <span>Engineering Operating Hours</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Monday to Saturday: 10:00 AM – 7:00 PM IST<br />
                  Support tickets monitored 24/7 for enterprise contracts.
                </p>
              </div>
            </div>

            {/* General Inquiry Form */}
            <div className="lg:col-span-2">
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Use this form for partnerships, inquiries, media queries, or general discussions.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Message Dispatched!</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                      Thank you for contacting Cynbit Technologies. A member of our team will review your message shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g., Ananya Deshmukh"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="ananya@company.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          placeholder="e.g., Enterprise Partnership / Consulting"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Detail your inquiry or requirements..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-cynbit-teal text-white font-semibold hover:bg-cynbit-cyan transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-cynbit-teal/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-cynbit-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-cynbit-teal font-bold mb-2">Knowledge Base</h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-cynbit-teal transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
