const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Có lỗi xảy ra');
  }

  return data;
}

export const api = {
  getServices: (featured) =>
    request(`/services${featured ? '?featured=true' : ''}`),

  getDoctors: () => request('/doctors'),

  createAppointment: (body) =>
    request('/appointments', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  getMe: () => request('/auth/me'),

  getAppointments: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/appointments?${qs}`);
  },

  updateAppointmentStatus: (id, body) =>
    request(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify(body) }),

  getDashboardStats: () => request('/appointments/dashboard/stats'),
};
