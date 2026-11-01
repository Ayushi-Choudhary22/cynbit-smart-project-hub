import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import {
  ChevronDown,
  Menu,
  X,
  History,
  Users,
  Briefcase,
  Globe,
  Terminal,
  Layers,
  Sparkles,
  School,
  Route,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, admin } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <nav className="glass-nav border-b border-slate-200/50 dark:border-slate-800/80 shadow-xs transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8 py-3.5 md:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              <img
                src="/logo.svg"
                alt="Cynbit Technologies"
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 lg:gap-2">
            {/* Company Dropdown */}
            <div className="relative group/nav">
              <button className="px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-1 transition-all hover:text-primary dark:hover:text-primary-light text-slate-600 dark:text-slate-300">
                Company
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover/nav:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-3 transition-all duration-200 origin-top-left opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden w-72 p-2">
                  <Link
                    to="/story"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <History className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Our Story
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        The vision behind Cynbit.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/team"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <Users className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Our Team
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Meet the architects.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/careers"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <Briefcase className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Careers
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Join the revolution.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/story#impact"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <Globe className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Social Impact
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Our rural IT mission.
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Expertise Dropdown */}
            <div className="relative group/nav">
              <button className="px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-1 transition-all hover:text-primary dark:hover:text-primary-light text-slate-600 dark:text-slate-300">
                Expertise
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover/nav:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-3 transition-all duration-200 origin-top-left opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden w-72 p-2">
                  <Link
                    to="/services"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <Terminal className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Services Hub
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Tailored tech solutions.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <Layers className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Product Suite
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Studio, TenantEase, Revio.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/services#stack"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <Sparkles className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Tech Stack
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Architecture capabilities.
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* BitElevate Dropdown */}
            <div className="relative group/nav">
              <button className="px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-1 transition-all hover:text-primary dark:hover:text-primary-light text-slate-600 dark:text-slate-300">
                BitElevate
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover/nav:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-3 transition-all duration-200 origin-top-left opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden w-72 p-2">
                  <Link
                    to="/bitelevate"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <School className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        The Ecosystem
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Unstructured learning.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/bitelevate#paths"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <Route className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Learning Paths
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Architect your future.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/bitelevate#diaries"
                    className="flex items-start gap-4 p-3.5 rounded-2xl transition-all hover:bg-primary/10 dark:hover:bg-primary/20 group/link border border-transparent hover:border-primary/20"
                  >
                    <BookOpen className="w-5 h-5 text-primary dark:text-primary-light group-hover/link:scale-110 transition-transform mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/link:text-primary dark:group-hover/link:text-primary-light">
                        Student Stories
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        1000+ Certified Architects.
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* AI Solution Studio Link */}
            <Link
              to="/discovery"
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 transition-all ${
                isActive('/discovery') || isActive('/studio')
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-dim hover:bg-primary hover:text-white border border-primary/20'
              }`}
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              AI Solution Studio
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold uppercase">
                AI Studio
              </span>
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary dark:hover:text-primary-light relative after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-primary after:transition-transform ${
                isActive('/contact')
                  ? 'text-primary dark:text-primary-light after:scale-x-100'
                  : 'text-slate-600 dark:text-slate-300 after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side: ThemeToggle, Admin, CTA */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Admin Badge/Link */}
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              className="p-2 rounded-full text-slate-500 hover:text-primary dark:hover:text-primary-light transition-colors"
              title={isAuthenticated ? `Admin Portal (${admin?.name})` : 'Admin Login'}
            >
              <ShieldCheck className={`w-5 h-5 ${isAuthenticated ? 'text-primary dark:text-primary-dim' : ''}`} />
            </Link>

            {/* AI Solution Studio CTA Button */}
            <Link
              to="/discovery"
              className="hidden md:flex items-center gap-2 bg-primary text-white hover:bg-primary-hover px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              AI Solution Studio
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 active:scale-90 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-[90] bg-white dark:bg-slate-950 p-6 pt-24 overflow-y-auto xl:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-8 pb-24">
          {/* Smart Discovery Banner */}
          <Link
            to="/discovery"
            onClick={() => setMobileMenuOpen(false)}
            className="p-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between shadow-xl block"
          >
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-1">
                New Experience
              </div>
              <div className="text-xl font-bold font-headline">Smart Project Discovery Hub</div>
              <div className="text-xs text-white/80 mt-1">Get an instant AI Blueprint for your idea</div>
            </div>
            <ArrowRight className="w-6 h-6 shrink-0" />
          </Link>

          {/* Company Section */}
          <div className="space-y-3">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 dark:text-primary-dim/60 border-b border-slate-200 dark:border-slate-800 pb-2">
              Company
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/story"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold"
              >
                <History className="w-5 h-5 text-primary" />
                Our Story
              </Link>
              <Link
                to="/team"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold"
              >
                <Users className="w-5 h-5 text-primary" />
                Our Team
              </Link>
              <Link
                to="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold"
              >
                <Briefcase className="w-5 h-5 text-primary" />
                Careers
              </Link>
              <Link
                to="/story#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold"
              >
                <Globe className="w-5 h-5 text-primary" />
                Social Impact
              </Link>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="space-y-3">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 dark:text-primary-dim/60 border-b border-slate-200 dark:border-slate-800 pb-2">
              Expertise
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold"
              >
                <Terminal className="w-5 h-5 text-secondary" />
                Services Hub
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold"
              >
                <Layers className="w-5 h-5 text-secondary" />
                Product Suite
              </Link>
            </div>
          </div>

          {/* BitElevate Section */}
          <div className="space-y-3">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 dark:text-primary-dim/60 border-b border-slate-200 dark:border-slate-800 pb-2">
              BitElevate
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/bitelevate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold"
              >
                <School className="w-5 h-5 text-tertiary" />
                The Ecosystem & Learning Paths
              </Link>
            </div>
          </div>

          {/* Contact & Admin */}
          <div className="pt-4 space-y-3">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 font-black uppercase tracking-widest text-xs"
            >
              Contact Support
            </Link>
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-4 rounded-2xl border border-slate-300 dark:border-slate-700 font-black uppercase tracking-widest text-xs text-slate-600 dark:text-slate-400"
            >
              {isAuthenticated ? 'Admin Dashboard' : 'Admin Portal Login'}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Dock Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl z-[150] rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] border-t border-slate-200 dark:border-slate-800">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            isActive('/') ? 'text-primary dark:text-primary-dim font-bold' : 'text-slate-500'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Home</span>
        </Link>
        <Link
          to="/services"
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            isActive('/services') ? 'text-primary dark:text-primary-dim font-bold' : 'text-slate-500'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Services</span>
        </Link>
        <Link
          to="/discovery"
          className="flex flex-col items-center justify-center p-2 bg-primary text-white rounded-2xl px-4 shadow-lg shadow-primary/30 scale-105"
        >
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Studio
          </span>
        </Link>
        <Link
          to="/products"
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            isActive('/products') ? 'text-primary dark:text-primary-dim font-bold' : 'text-slate-500'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Products</span>
        </Link>
        <Link
          to="/contact"
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            isActive('/contact') ? 'text-primary dark:text-primary-dim font-bold' : 'text-slate-500'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Contact</span>
        </Link>
      </nav>
    </header>
  );
}
