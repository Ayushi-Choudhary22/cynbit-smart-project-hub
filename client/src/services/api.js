const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
};

// Public Discovery & Inquiry Endpoints
export const generateBlueprintApi = async (category, answers) => {
  const res = await fetch(`${API_BASE}/discovery/blueprint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, answers }),
  });
  return handleResponse(res);
};

export const submitInquiryApi = async (inquiryData) => {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData),
  });
  return handleResponse(res);
};

export const checkHealthApi = async () => {
  const res = await fetch(`${API_BASE}/health`);
  return handleResponse(res);
};

// Admin Authentication
export const adminLoginApi = async (email, password) => {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export const getAdminProfileApi = async (token) => {
  const res = await fetch(`${API_BASE}/admin/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
};

// Admin Management Endpoints
export const getInquiryStatsApi = async (token) => {
  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
};

export const getInquiriesApi = async (token, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/admin/inquiries?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
};

export const getInquiryDetailApi = async (token, id) => {
  const res = await fetch(`${API_BASE}/admin/inquiries/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
};

export const updateInquiryStatusApi = async (token, id, status) => {
  const res = await fetch(`${API_BASE}/admin/inquiries/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};

export const addInternalNoteApi = async (token, id, note) => {
  const res = await fetch(`${API_BASE}/admin/inquiries/${id}/notes`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ note }),
  });
  return handleResponse(res);
};
