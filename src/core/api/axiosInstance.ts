import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { appConfig } from '../config/appConfig';
import { logger } from '../logger/logger';
import { AppError } from '../error/AppError';

const axiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(appConfig.tokenKey);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logger.log('API', `${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    logger.error('API', 'Request error', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    logger.log('API', `Response ${response.status}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    const statusCode = error.response?.status || 500;
    const message = (error.response?.data as any)?.message || error.message;
    
    logger.error('API', `Error ${statusCode}`, message);
    
    if (statusCode === 401) {
      localStorage.removeItem(appConfig.tokenKey);
      window.location.href = '/login';
    }
    
    return Promise.reject(
      new AppError(message, statusCode, 'API_ERROR')
    );
  }
);

export default axiosInstance;
