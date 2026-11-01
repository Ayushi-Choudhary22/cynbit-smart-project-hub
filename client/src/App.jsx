import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Story from './pages/Story';
import Team from './pages/Team';
import Products from './pages/Products';
import BitElevate from './pages/BitElevate';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Discovery from './pages/Discovery';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Auto scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 404 Fallback
function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-center px-4">
      <div className="max-w-md space-y-6">
        <span className="text-5xl font-black font-mono text-cynbit-teal">404</span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Page Not Found</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The requested architectural route does not exist or has been restructured.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cynbit-teal text-white font-semibold text-sm hover:bg-cynbit-cyan transition-all shadow-md"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-cynbit-light dark:bg-cynbit-dark text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/story" element={<Story />} />
            <Route path="/team" element={<Team />} />
            <Route path="/products" element={<Products />} />
            <Route path="/bitelevate" element={<BitElevate />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/studio" element={<Discovery />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
