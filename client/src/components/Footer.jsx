import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/cynbitData';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  ShieldAlert,
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-surface dark:bg-surface-dark border-t border-slate-200/80 dark:border-slate-800 pt-16 md:pt-20 pb-16 md:pb-12 px-4 md:px-8 lg:px-12 font-body transition-colors">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top Assessment Prototype Banner Notice */}
        <div className="mb-12 p-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <ShieldAlert className="w-5 h-5 text-primary dark:text-primary-dim shrink-0" />
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              <strong className="text-primary dark:text-primary-dim font-bold">Independent Assessment Prototype:</strong> Built for Full Stack Developer Intern assessment. Not affiliated with or deployed by Cynbit Technologies.
            </p>
          </div>
          <Link
            to="/discovery"
            className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-primary-dim hover:underline whitespace-nowrap"
          >
            Explore Smart Hub →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div>
              <Link to="/" className="inline-block hover:scale-105 transition-transform">
                <img
                  src="/logo.svg"
                  alt="Cynbit Technologies"
                  className="h-10 md:h-12 w-auto"
                />
              </Link>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
                Architecting the digital future with autonomous AI agents, high-performance custom software, and scalable cloud foundations from Jaipur, Rajasthan.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 items-center">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white hover:bg-primary dark:hover:bg-primary transition-all hover:-translate-y-1"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white hover:bg-primary dark:hover:bg-primary transition-all hover:-translate-y-1"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white hover:bg-primary dark:hover:bg-primary transition-all hover:-translate-y-1"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white hover:bg-primary dark:hover:bg-primary transition-all hover:-translate-y-1"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Email & Phone Contact */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300 group">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-primary-dim shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm font-bold hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-4 text-slate-600 dark:text-slate-300 group">
                <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-sm font-bold">
                  {COMPANY_INFO.phones.map((p, idx) => (
                    <a
                      key={idx}
                      href={`tel:${p.replace(/\s+/g, '')}`}
                      className="hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h4 className="text-primary dark:text-primary-dim font-bold text-xs uppercase tracking-wider font-headline">
                Explore
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link
                    to="/story"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dim transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dim transition-colors"
                  >
                    Core Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dim transition-colors"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dim transition-colors"
                  >
                    Product Suite
                  </Link>
                </li>
                <li>
                  <Link
                    to="/discovery"
                    className="text-primary dark:text-primary-dim font-bold hover:underline"
                  >
                    Smart Project Hub
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-primary dark:text-primary-dim font-bold text-xs uppercase tracking-wider font-headline">
                Impact
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link
                    to="/story#impact"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dim transition-colors"
                  >
                    Social Initiatives
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bitelevate"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dim transition-colors"
                  >
                    BitElevate
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dim transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dim transition-colors"
                  >
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Briefing & Location Card */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-6 md:p-8 bg-surface-container-low dark:bg-surface-dark-container rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h5 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
                Subscribe to our Technical Briefing
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                Join 25k+ architects receiving our weekly technical and strategic deep-dives.
              </p>

              {subscribed ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="architect@domain.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-primary text-slate-800 dark:text-slate-100"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-5 py-2.5 rounded-full font-black uppercase tracking-wider text-[10px] hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                  >
                    Join
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>

            {/* Headquarters Card */}
            <div className="p-5 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 dark:border-primary/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-primary-dim shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="font-headline text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary dark:text-primary-dim">
                  Headquarters
                </p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {COMPANY_INFO.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-headline">
            © 2026 Cynbit Technologies. Engineered for Optimism.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 font-headline">
            <Link to="/story" className="hover:text-primary transition-colors">Vision</Link>
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link to="/discovery" className="hover:text-primary transition-colors">Smart Hub</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
