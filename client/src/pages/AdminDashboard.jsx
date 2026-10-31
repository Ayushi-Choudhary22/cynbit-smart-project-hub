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
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getInquiryStatsApi, 
  getInquiriesApi, 
  getInquiryDetailApi, 
  updateInquiryStatusApi, 
  addInternalNoteApi 
} from '../services/api';

const STATUS_COLORS = {
  New: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Reviewing: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'Clarification Required': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  Qualified: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Closed: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
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

  // Selected Inquiry for Modal Inspector
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
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
    if (token) {
      fetchData();
    }
  }, [token, statusFilter, categoryFilter]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Open Inquiry Inspector
  const handleInspectInquiry = async (inquiryId) => {
    setDetailLoading(true);
    setActionSuccess('');
    try {
      const res = await getInquiryDetailApi(token, inquiryId);
      if (res.success && res.data?.inquiry) {
        setSelectedInquiry(res.data.inquiry);
      }
    } catch (err) {
      console.error('Failed to get inquiry details:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  // Update Status
  const handleUpdateStatus = async (newStatus) => {
    if (!selectedInquiry || !token) return;
    setUpdatingStatus(true);
    setActionSuccess('');
    try {
      const res = await updateInquiryStatusApi(token, selectedInquiry._id, newStatus);
      if (res.success && res.data?.inquiry) {
        setSelectedInquiry(res.data.inquiry);
        setActionSuccess(`Status updated to ${newStatus}`);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Add Internal Note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedInquiry || !token) return;
    setSavingNote(true);
    try {
      const res = await addInternalNoteApi(token, selectedInquiry._id, newNote.trim());
      if (res.success && res.data?.inquiry) {
        setSelectedInquiry(res.data.inquiry);
        setNewNote('');
        setActionSuccess('Internal note logged');
        fetchData();
      }
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setSavingNote(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-cynbit-teal animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-mono">Loading Cynbit Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-cynbit-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cynbit-teal px-2 py-0.5 rounded bg-cynbit-teal/10">
                Command Center
              </span>
              <span className="text-xs text-slate-400">
                Logged in as <strong>{admin?.name}</strong> ({admin?.email})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Smart Project Discovery Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-cynbit-card text-slate-600 dark:text-slate-300 hover:text-cynbit-teal transition-colors shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 my-8">
          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Total Inquiries
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {stats?.total || 0}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-blue-500/20 shadow-sm">
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-wider block mb-1">
              New
            </span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats?.byStatus?.New || 0}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-amber-500/20 shadow-sm">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block mb-1">
              Reviewing
            </span>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats?.byStatus?.Reviewing || 0}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-purple-500/20 shadow-sm">
            <span className="text-[10px] font-mono text-purple-500 uppercase tracking-wider block mb-1">
              Clarification
            </span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats?.byStatus?.['Clarification Required'] || 0}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-emerald-500/20 shadow-sm">
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider block mb-1">
              Qualified
            </span>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats?.byStatus?.Qualified || 0}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Closed
            </span>
            <span className="text-2xl font-bold text-slate-600 dark:text-slate-400">
              {stats?.byStatus?.Closed || 0}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-cynbit-card border border-slate-200 dark:border-white/10 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name, email, or ref ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
            />
          </form>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
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

            <div className="flex items-center gap-2 text-xs">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cynbit-teal max-w-[200px]"
              >
                <option value="">All Categories</option>
                <option value="Build a new website or web application">Web App</option>
                <option value="Build a mobile application">Mobile App</option>
                <option value="Automate a business process using AI">AI Automation</option>
                <option value="Build an AI agent or integrate an LLM">AI Agent</option>
                <option value="Improve or modernize an existing software system">Modernization</option>
                <option value="Cloud infrastructure or migration">Cloud Infra</option>
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
                Try clearing search filters or create a new discovery submission from the public website.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-4 px-6">Reference ID</th>
                    <th className="py-4 px-6">Client & Company</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Submitted</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {inquiries.map((inq) => {
                    const statusClass = STATUS_COLORS[inq.status] || STATUS_COLORS.New;
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
                            {inq.name}
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            {inq.company ? `${inq.company} • ` : ''}{inq.email}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                          {inq.category}
                        </td>
                        <td className="py-4 px-6 text-slate-500 font-mono">
                          {new Date(inq.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusClass}`}>
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleInspectInquiry(inq._id)}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-semibold text-xs hover:bg-cynbit-teal hover:text-white transition-all inline-flex items-center gap-1.5"
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

      {/* Slide-Over Inquiry Inspector Modal */}
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
            <div className="p-6 overflow-y-auto space-y-8 text-xs">
              
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
                    Change lifecycle progress for this client inquiry.
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
                          ? 'bg-cynbit-teal text-white border-cynbit-teal shadow-sm'
                          : 'bg-white dark:bg-cynbit-card text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cynbit-teal'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

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
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Company</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedInquiry.company || 'Direct Individual'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Submitted At</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Discovery Questionnaire Answers */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-cynbit-teal">
                  Original Adaptive Discovery Answers
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(selectedInquiry.answers || {}).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <span className="font-mono text-[10px] text-slate-400 uppercase block mb-1">
                        {key}
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Architecture Blueprint */}
              {selectedInquiry.blueprint && (
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cynbit-teal" />
                    <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                      AI-Architected Project Blueprint
                    </h4>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-4">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">Project Overview</span>
                      <p className="text-base font-bold text-slate-900 dark:text-white">
                        {selectedInquiry.blueprint.projectOverview}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-blue-500 font-mono text-[10px] uppercase block font-bold">Problem Statement</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {selectedInquiry.blueprint.problemStatement}
                        </p>
                      </div>
                      <div>
                        <span className="text-emerald-500 font-mono text-[10px] uppercase block font-bold">Proposed Architecture</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {selectedInquiry.blueprint.proposedSolution}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Functional Modules</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedInquiry.blueprint.functionalRequirements?.map((f, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Technical Stack</span>
                        <div className="space-y-1 text-slate-700 dark:text-slate-300">
                          {selectedInquiry.blueprint.technicalConsiderations?.map((item, i) => (
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
                          {selectedInquiry.blueprint.clarificationQuestions?.map((item, i) => (
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
                    placeholder="Add an internal note (e.g., scheduled architecture review call with CTO)..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-cynbit-teal"
                  />
                  <button
                    type="submit"
                    disabled={savingNote || !newNote.trim()}
                    className="px-4 py-2.5 rounded-xl bg-cynbit-teal text-white font-semibold text-xs hover:bg-cynbit-cyan transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </button>
                </form>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Cynbit Internal Assessment Engine
              </span>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
