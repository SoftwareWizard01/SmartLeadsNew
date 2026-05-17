import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',

  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global error handling & 401 Auto-logout
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    // Skip toast if it's the initial /me check on load
    const isMeCheck = error.config?.url === '/auth/me';

    if (error.response?.status === 401) {
      if (!isMeCheck) {
        toast.error('Session expired. Please log in again.');
      }
      useAuthStore.getState().logout();
    } else if (error.response?.data?.message) {
      if (!isMeCheck) {
        toast.error(error.response.data.message);
      }
    } else {
      if (!isMeCheck) {
        toast.error('An unexpected error occurred.');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
