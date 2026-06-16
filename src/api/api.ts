import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  // Use relative API path so requests go to the same host (Next.js API routes)
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const userInfo = useAuthStore.getState().userInfo;
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default api;
