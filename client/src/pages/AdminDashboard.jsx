import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  User,
  Mail,
  Phone,
  Building,
  FileText,
  Cpu,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  X,
  Send,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Layers,
  Check,
  Eye,
  MessageSquare,
  DollarSign,
  Palette,
  Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getInquiryStatsApi,
  getInquiriesApi,
  getInquiryDetailApi,
  updateInquiryStatusApi,
  updateConsultationStatusApi,
  addInternalNoteApi,
} from '../services/api';

const STATUS_COLORS = {
  New: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Reviewing: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'Clarification Required': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  Qualified: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Closed: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
};

const CONSULTATION_STATUS_COLORS = {
  Pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Confirmed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Completed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Cancelled: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export default function AdminDashboard() {
  const { admin, token, isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  // Data state
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [consultationOnly, setConsultationOnly] = useState(false);

  // Selected Inquiry for Modal Inspector
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingConsultation, setUpdatingConsultation] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Auth gate
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Load dashboard data
  const fetchData = async () => {
    if (!token) return;
    setError('');
    try {
      const [statsRes, listRes] = await Promise.all([
        getInquiryStatsApi(token),
        getInquiriesApi(token, {
          search: search || undefined,
          status: statusFilter || undefined,
          category: categoryFilter || undefined,
          consultationOnly: consultationOnly ? 'true' : undefined,
        }),
      ]);

      if (statsRes.success) setStats(statsRes.data?.stats);
      if (listRes.success) setInquiries(listRes.data?.inquiries || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message || 'Error fetching inquiries');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, statusFilter, categoryFilter, consultationOnly]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Inspect specific inquiry details
  const handleInspectInquiry = async (id) => {
    setDetailLoading(true);
    setActionSuccess('');
    try {
      const res = await getInquiryDetailApi(token, id);
      if (res.success && res.data?.inquiry) {
        setSelectedInquiry(res.data.inquiry);
      }
    } catch (err) {
      console.error('Failed to load inquiry details:', err);
      alert('Could not retrieve full inquiry details.');
    } finally {
      setDetailLoading(false);
    }
  };

  // Update overall inquiry status
  const handleUpdateStatus = async (newStatus) => {
    if (!selectedInquiry || updatingStatus) return;
    setUpdatingStatus(true);
    setActionSuccess('');
    try {
      const res = await updateInquiryStatusApi(token, selectedInquiry._id, newStatus);
      if (res.success && res.data?.inquiry) {
        setSelectedInquiry(res.data.inquiry);
        setActionSuccess(`Pipeline status changed to ${newStatus}`);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert(err.message || 'Status update failed.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Update consultation status
  const handleUpdateConsultation = async (newConsultationStatus) => {
    if (!selectedInquiry || updatingConsultation) return;
    setUpdatingConsultation(true);
    setActionSuccess('');
    try {
      const res = await updateConsultationStatusApi(token, selectedInquiry._id, newConsultationStatus);
      if (res.success && res.data?.inquiry) {
        setSelectedInquiry(res.data.inquiry);
        setActionSuccess(`Consultation marked as ${newConsultationStatus}`);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update consultation status:', err);
      alert(err.message || 'Consultation status update failed.');
    } finally {
      setUpdatingConsultation(false);
    }
  };

  // Add internal architectural note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedInquiry || savingNote) return;
    setSavingNote(true);
    setActionSuccess('');
    try {
      const res = await addInternalNoteApi(token, selectedInquiry._id, newNote.trim());
      if (res.success && res.data?.inquiry) {
        setSelectedInquiry(res.data.inquiry);
        setNewNote('');
        setActionSuccess('Internal note recorded.');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
      alert(err.message || 'Failed to add note.');
    } finally {
      setSavingNote(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <RefreshCw className="w-8 h-8 text-cynbit-teal animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            Authenticating &amp; syncing Cynbit AI Studio records...
          </p>
        </div>
      </div>
    );
  }

  const newInquiriesCount = stats?.byStatus?.New || 0;
  const pendingConsultationsCount = stats?.consultations?.pending || 0;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cynbit-light dark:bg-cynbit-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        
        {/* Top Header & Admin Profile */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cynbit-teal/10 dark:bg-cynbit-teal/20 text-cynbit-teal dark:text-cynbit-cyan flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cynbit-teal font-bold">
                  Protected Command Center
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  Live Operations
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                Cynbit AI Solution Studio — Inquiry Command Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              title="Refresh Inquiries"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-cynbit-teal' : ''}`} />
            </button>

            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900 dark:text-white">{admin?.name || 'Architect Admin'}</div>
              <div className="text-[10px] text-slate-400 font-mono">{admin?.email}</div>
            </div>

            <button
              onClick={logout}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-rose-500 hover:bg-rose-500/10 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Real-time Notification Banner for New Leads & Consultations */}
        {(newInquiriesCount > 0 || pendingConsultationsCount > 0) && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cynbit-teal/15 via-blue-500/10 to-transparent border border-cynbit-teal/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cynbit-teal text-white flex items-center justify-center flex-shrink-0 animate-bounce">
                <Bell className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-800 dark:text-slate-200">
                <span className="font-bold text-cynbit-teal">Action Required: </span>
                You have <span className="font-bold underline">{newInquiriesCount} new inquiry(ies)</span>
                {pendingConsultationsCount > 0 && (
                  <span> and <span className="font-bold text-blue-600 dark:text-blue-400 underline">{pendingConsultationsCount} pending engineer consultation request(s)</span></span>
                )} awaiting technical qualification.
              </div>
            </div>

            <button
              onClick={() => {
                setStatusFilter('New');
                setConsultationOnly(false);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cynbit-teal text-white text-xs font-bold flex-shrink-0 shadow-xs hover:bg-cynbit-cyan transition-all"
            >
              View New Submissions
            </button>
          </div>
        )}

        {/* Operational Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Total Inquiries
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {stats?.total || 0}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-blue-500/20 shadow-xs relative overflow-hidden">
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-wider block mb-1 font-bold">
              New Leads
            </span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {stats?.byStatus?.New || 0}
            </span>
            {stats?.byStatus?.New > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            )}
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-cynbit-teal/30 shadow-xs">
            <span className="text-[10px] font-mono text-cynbit-teal uppercase tracking-wider block mb-1 font-bold">
              Consultations
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-cynbit-teal">
                {stats?.consultations?.total || 0}
              </span>
              <span className="text-[10px] font-mono text-amber-500">
                ({stats?.consultations?.pending || 0} pending)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-amber-500/20 shadow-xs">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block mb-1">
              Reviewing
            </span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {stats?.byStatus?.Reviewing || 0}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-emerald-500/20 shadow-xs">
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider block mb-1 font-bold">
              Qualified
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {stats?.byStatus?.Qualified || 0}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Closed
            </span>
            <span className="text-2xl font-black text-slate-600 dark:text-slate-400">
              {stats?.byStatus?.Closed || 0}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client, email, company, ref ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
            />
          </form>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Consultation toggle */}
            <button
              type="button"
              onClick={() => setConsultationOnly(!consultationOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                consultationOnly
                  ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-xs'
                  : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Consultations Only</span>
            </button>

            {/* Status Filter */}
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Clarification Required">Clarification Required</option>
                <option value="Qualified">Qualified</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 text-xs">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cynbit-teal max-w-[180px]"
              >
                <option value="">All Categories</option>
                <option value="Website or web application">Web App</option>
                <option value="Mobile application (iOS/Android)">Mobile App</option>
                <option value="AI automation & cognitive workflows">AI Automation</option>
                <option value="Autonomous AI agents">AI Agents</option>
                <option value="SaaS product">SaaS Suite</option>
                <option value="Cloud infrastructure & DevOps">Cloud &amp; DevOps</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden">
          {inquiries.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No inquiries found</h3>
              <p className="text-xs text-slate-500">
                Try clearing search filters or create a new discovery submission from the AI Solution Studio.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-4 px-6">Reference ID</th>
                    <th className="py-4 px-6">Client &amp; Organization</th>
                    <th className="py-4 px-6">Project Solution</th>
                    <th className="py-4 px-6">Budget &amp; Timeline</th>
                    <th className="py-4 px-6">Consultation</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {inquiries.map((inq) => {
                    const statusClass = STATUS_COLORS[inq.status] || STATUS_COLORS.New;
                    const hasConsultation = inq.consultation?.requested;
                    const consultationStatus = inq.consultation?.status || 'Pending';
                    const consultationClass = CONSULTATION_STATUS_COLORS[consultationStatus] || CONSULTATION_STATUS_COLORS.Pending;

                    return (
                      <tr
                        key={inq._id}
                        className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-4 px-6 font-mono font-bold text-cynbit-teal">
                          {inq.referenceId}
                        </td>

                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {inq.name || inq.clientName}
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            {inq.company ? `${inq.company} • ` : ''}{inq.email}
                          </div>
                        </td>

                        <td className="py-4 px-6 max-w-xs">
                          <div className="text-slate-800 dark:text-slate-200 font-medium truncate">
                            {inq.category || inq.projectCategory}
                          </div>
                          {inq.conceptApprovalStatus === 'Approved' && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Concept Approved
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                          <div>{inq.budget?.range || 'Need guidance'}</div>
                          <div className="text-slate-400 text-[10px]">{inq.timeline?.range || 'Flexible'}</div>
                        </td>

                        <td className="py-4 px-6">
                          {hasConsultation ? (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${consultationClass}`}>
                              <Calendar className="w-3 h-3" />
                              <span>{inq.consultation.method} ({consultationStatus})</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px] font-mono">No Meeting</span>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusClass}`}>
                            {inq.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleInspectInquiry(inq._id)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-semibold text-xs hover:bg-cynbit-teal hover:text-white transition-all inline-flex items-center gap-1.5 shadow-2xs"
                          >
                            <span>Inspect Brief</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SLIDE-OVER INQUIRY INSPECTOR MODAL */}
      {/* ========================================================================= */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-cynbit-teal">
                    {selectedInquiry.referenceId}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[selectedInquiry.status]}`}>
                    {selectedInquiry.status}
                  </span>
                  {selectedInquiry.consultation?.requested && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      📅 Meeting: {selectedInquiry.consultation.method} ({selectedInquiry.consultation.status})
                    </span>
                  )}
                  {selectedInquiry.conceptApprovalStatus === 'Approved' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      ✦ Client Approved Design
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedInquiry.name} • {selectedInquiry.category}
                </h2>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs leading-relaxed">
              
              {actionSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {/* Status Manager Control */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                    Update Pipeline Status
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Advance the lifecycle stage of this inquiry.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {['New', 'Reviewing', 'Clarification Required', 'Qualified', 'Closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={updatingStatus || selectedInquiry.status === st}
                      onClick={() => handleUpdateStatus(st)}
                      className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-all border ${
                        selectedInquiry.status === st
                          ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-xs'
                          : 'bg-white dark:bg-cynbit-card text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cynbit-teal'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Scheduling Manager (if requested) */}
              {selectedInquiry.consultation?.requested && (
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-blue-700 dark:text-blue-300 block">
                        Requested Engineer Consultation
                      </span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        Method: <strong>{selectedInquiry.consultation.method}</strong> • Preferred: <strong>{selectedInquiry.consultation.preferredDate || 'Not specified'}</strong> ({selectedInquiry.consultation.preferredTimeRange})
                      </p>
                      {selectedInquiry.consultation.discussionTopics && (
                        <p className="text-[11px] text-slate-500 pt-1">
                          Topic: {selectedInquiry.consultation.discussionTopics}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500">Status:</span>
                      {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((cSt) => (
                        <button
                          key={cSt}
                          type="button"
                          disabled={updatingConsultation || selectedInquiry.consultation?.status === cSt}
                          onClick={() => handleUpdateConsultation(cSt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                            selectedInquiry.consultation?.status === cSt
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white dark:bg-black/20 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-blue-400'
                          }`}
                        >
                          {cSt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Client Profile Details */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/5">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Client Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-cynbit-teal hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Phone</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedInquiry.phone || 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Organization</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedInquiry.company || 'Direct Individual'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Budget &amp; Timeline</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">
                    {selectedInquiry.budget?.range || 'Open'} • {selectedInquiry.timeline?.range || 'Flexible'}
                  </span>
                </div>
              </div>

              {/* AI Architecture Blueprint Inspector */}
              {selectedInquiry.blueprint && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cynbit-teal" />
                    <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                      AI-Architected Project Blueprint
                    </h4>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-mono block">Project Overview</span>
                        <p className="text-base font-bold text-slate-900 dark:text-white">
                          {selectedInquiry.blueprint.projectOverview || selectedInquiry.blueprint.overview}
                        </p>
                      </div>
                      {selectedInquiry.blueprint.engineUsed && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cynbit-teal/10 text-cynbit-teal border border-cynbit-teal/20 flex-shrink-0">
                          {selectedInquiry.blueprint.engineUsed}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-blue-500 font-mono text-[10px] uppercase block font-bold">Problem Statement</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {selectedInquiry.blueprint.problemStatement || selectedInquiry.blueprint.problem}
                        </p>
                      </div>
                      <div>
                        <span className="text-emerald-500 font-mono text-[10px] uppercase block font-bold">Proposed Architecture</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {selectedInquiry.blueprint.proposedSolution || selectedInquiry.blueprint.solution}
                        </p>
                      </div>
                    </div>

                    {/* Functional Modules */}
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Functional Modules</span>
                      <div className="flex flex-wrap gap-2">
                        {(selectedInquiry.blueprint.functionalRequirements || []).map((f, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-[11px]">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technical Stack */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Technical Stack</span>
                        <div className="space-y-1 text-slate-700 dark:text-slate-300">
                          {(selectedInquiry.blueprint.technicalConsiderations || []).map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-cynbit-teal" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-amber-500 font-mono text-[10px] uppercase block mb-1 font-bold">Clarification Questions</span>
                        <div className="space-y-1 text-slate-700 dark:text-slate-300">
                          {(selectedInquiry.blueprint.clarificationQuestions || []).map((item, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <span className="font-mono text-amber-500 font-bold">•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Concept & Customer Design Customizations */}
              <div className="p-4 rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-cynbit-teal block">
                  Customer Visual Customizations &amp; Feedback
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono uppercase block">Model Archetype</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedInquiry.visualConcept?.archetype || 'saas_dashboard'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono uppercase block">Selected Palette</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedInquiry.visualConcept?.theme || 'cynbit-teal'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-mono uppercase block">Concept Approval</span>
                    <span className="font-bold text-emerald-600">
                      {selectedInquiry.conceptApprovalStatus || 'Pending'}
                    </span>
                  </div>
                </div>
                {selectedInquiry.designFeedback?.customNotes && (
                  <div className="pt-2">
                    <span className="text-slate-400 text-[10px] font-mono uppercase block">Custom Design Notes:</span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      "{selectedInquiry.designFeedback.customNotes}"
                    </p>
                  </div>
                )}
              </div>

              {/* Internal Notes Timeline & Add Note */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-cynbit-teal">
                  Internal Architectural Notes ({selectedInquiry.internalNotes?.length || 0})
                </h4>

                <div className="space-y-2">
                  {selectedInquiry.internalNotes?.map((note, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-slate-800 dark:text-slate-200 font-medium">
                          {note.note}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">
                          By {note.author}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                        {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add an internal engineering or discovery note..."
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                  <button
                    type="submit"
                    disabled={savingNote || !newNote.trim()}
                    className="px-4 py-2 rounded-xl bg-cynbit-teal text-white font-bold text-xs flex items-center gap-1.5 hover:bg-cynbit-cyan transition-all disabled:opacity-50"
                  >
                    {savingNote ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Save Note</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
