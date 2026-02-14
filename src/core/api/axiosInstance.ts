import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { appConfig } from '../config/appConfig';
import { logger } from '../logger/logger';
import { AppError } from '../error/AppError';

// Backend response structure
interface BackendSuccessResponse<T = any> {
  statusCode: number;
  statusText: string;
  data: T;
}

interface BackendErrorResponse {
  statusCode: number;
  statusText: string;
  error: {
    code: string;
    message: string;
  };
}

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
  (response: AxiosResponse<BackendSuccessResponse>) => {
    // Extract data from standardized backend response
    const backendResponse = response.data;
    
    logger.log('API', `Response ${backendResponse.statusCode}`, backendResponse.data);
    
    // Return only the data part to the caller
    response.data = backendResponse.data;
    return response;
  },
  (error: AxiosError<BackendErrorResponse>) => {
    let statusCode = 500;
    let message = 'An unexpected error occurred';
    let errorCode = 'UNKNOWN_ERROR';

    if (error.response) {
      // Backend responded with error in standardized format
      const backendError = error.response.data;
      
      if (backendError && backendError.error) {
        statusCode = backendError.statusCode;
        message = backendError.error.message;
        errorCode = backendError.error.code;
      } else {
        // Fallback if response doesn't match expected format
        statusCode = error.response.status;
        message = error.message;
      }
    } else if (error.request) {
      // Request made but no response received
      statusCode = 0;
      message = error.message || 'Network error - no response from server';
      errorCode = 'NETWORK_ERROR';
    } else {
      // Something else happened
      message = error.message;
      errorCode = 'REQUEST_ERROR';
    }
    
    logger.error('API', `Error ${statusCode}`, message);
    
    // Handle 401 - Unauthorized
    if (statusCode === 401) {
      localStorage.removeItem(appConfig.tokenKey);
      window.location.href = '/login';
    }
    
    return Promise.reject(
      new AppError(message, statusCode, errorCode)
    );
  }
);

export default axiosInstance;
