// src/utils/axiosInstance.js
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401 && localStorage.getItem('refreshToken')) {
      try {
        const res = await axios.post('/api/users/refresh', {
          refreshToken: localStorage.getItem('refreshToken')
        });
        localStorage.setItem('accessToken', res.data.accessToken);
        err.config.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
        return axios(err.config);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
