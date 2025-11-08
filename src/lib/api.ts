// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// export const api = axios.create({
//   baseURL: API_URL,
// });

// export const issueAPI = {
//   list: (params?: any) => api.get('/issues', { params }),
//   create: (data: any) => api.post('/issues', data),
//   get: (id: string) => api.get(`/issues/${id}`),
//   update: (id: string, data: any) => api.patch(`/issues/${id}`, data),
// };


import axios from 'axios';
import { Issue } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
});

export const issueAPI = {
  list: (params?: { status?: string; priority?: string }) =>
    api.get<Issue[]>('/issues', { params }),
  create: (data: Issue) => api.post<Issue>('/issues', data),
  get: (id: string) => api.get<Issue>(`/issues/${id}`),
  update: (id: string, data: Partial<Issue>) => api.patch<Issue>(`/issues/${id}`, data),
};
