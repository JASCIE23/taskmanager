import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Request interceptor for adding token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error - please check your connection'));
    }
    
    // Handle server errors with messages
    const message = error.response.data?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, task: any) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export default api;