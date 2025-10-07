import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  register: (email: string, password: string) =>
    api.post('/auth/register', { email, password }),
    
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
    
  logout: () =>
    api.post('/auth/logout'),
    
  getMe: () =>
    api.get('/auth/me'),
};

// Form API
export const formAPI = {
  submit: (email: string, answers: Record<string, string>) =>
    api.post('/form/submit', { email, answers }),
    
  getSubmissions: () =>
    api.get('/form/submissions'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;