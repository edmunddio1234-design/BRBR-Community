const API_URL = import.meta.env.VITE_API_URL || 'https://brbr-community.onrender.com';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const request = async (path, opts = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers: { ...getHeaders(), ...opts.headers },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export const api = {
  // Auth
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  // Members
  getMembers: () => request('/api/members'),
  getMember: (id) => request(`/api/members/${id}`),

  // Profile
  getProfile: () => request('/api/profile'),
  updateProfile: (data) => request('/api/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Messages
  getConversations: () => request('/api/messages/conversations'),
  getMessages: (userId) => request(`/api/messages/${userId}`),
  sendMessage: (userId, text) => request('/api/messages', { method: 'POST', body: JSON.stringify({ to_id: userId, text }) }),

  // Prayer / Reflections
  getPrayers: () => request('/api/prayer'),
  createPrayer: (data) => request('/api/prayer', { method: 'POST', body: JSON.stringify(data) }),
  prayForRequest: (id) => request(`/api/prayer/${id}/pray`, { method: 'POST' }),

  // Connections / Help Board
  getConnections: () => request('/api/connections'),
  createConnection: (data) => request('/api/connections', { method: 'POST', body: JSON.stringify(data) }),
  respondToConnection: (id) => request(`/api/connections/${id}/respond`, { method: 'POST' }),

  // Jobs / Opportunities
  getJobs: () => request('/api/jobs'),
  createJob: (data) => request('/api/jobs', { method: 'POST', body: JSON.stringify(data) }),
  applyToJob: (id) => request(`/api/jobs/${id}/apply`, { method: 'POST' }),

  // Gallery
  getGallery: () => request('/api/gallery'),
  uploadPhoto: (data) => request('/api/gallery', { method: 'POST', body: JSON.stringify(data) }),
  likePhoto: (id) => request(`/api/gallery/${id}/like`, { method: 'POST' }),
  commentPhoto: (id, text) => request(`/api/gallery/${id}/comment`, { method: 'POST', body: JSON.stringify({ text }) }),

  // Suggestions
  getSuggestions: () => request('/api/suggestions'),
  createSuggestion: (data) => request('/api/suggestions', { method: 'POST', body: JSON.stringify(data) }),
  voteSuggestion: (id) => request(`/api/suggestions/${id}/vote`, { method: 'POST' }),
  commentSuggestion: (id, text) => request(`/api/suggestions/${id}/comment`, { method: 'POST', body: JSON.stringify({ text }) }),

  // Notifications
  getNotifications: () => request('/api/notifications'),
  getUnreadCount: () => request('/api/notifications/unread'),
  markNotificationRead: (id) => request(`/api/notifications/${id}/read`, { method: 'PUT' }),
  markAllNotificationsRead: () => request('/api/notifications/read-all', { method: 'PUT' }),
};
