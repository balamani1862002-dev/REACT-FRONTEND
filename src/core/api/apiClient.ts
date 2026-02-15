import axiosInstance from './axiosInstance';
import { logger } from '../logger/logger';
import { AppError } from '../error/AppError';

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    try {
      logger.log('APIClient', `GET ${url}`);
      const response = await axiosInstance.get<T>(url);
      logger.log('APIClient', `GET ${url} - Success`);
      return response.data;
    } catch (error) {
      logger.error('APIClient', `GET ${url} - Failed`, error);
      throw error instanceof AppError ? error : new AppError('Request failed');
    }
  },

  async post<T>(url: string, data?: any): Promise<T> {
    try {
      logger.log('APIClient', `POST ${url}`);
      const response = await axiosInstance.post<T>(url, data);
      debugger
      logger.log('APIClient', `POST ${url} - Success`);
      return response.data;
    } catch (error) {
      logger.error('APIClient', `POST ${url} - Failed`, error);
      throw error instanceof AppError ? error : new AppError('Request failed');
    }
  },

  async put<T>(url: string, data?: any): Promise<T> {
    try {
      logger.log('APIClient', `PUT ${url}`);
      const response = await axiosInstance.put<T>(url, data);
      logger.log('APIClient', `PUT ${url} - Success`);
      return response.data;
    } catch (error) {
      logger.error('APIClient', `PUT ${url} - Failed`, error);
      throw error instanceof AppError ? error : new AppError('Request failed');
    }
  },

  async delete<T>(url: string): Promise<T> {
    try {
      logger.log('APIClient', `DELETE ${url}`);
      const response = await axiosInstance.delete<T>(url);
      logger.log('APIClient', `DELETE ${url} - Success`);
      return response.data;
    } catch (error) {
      logger.error('APIClient', `DELETE ${url} - Failed`, error);
      throw error instanceof AppError ? error : new AppError('Request failed');
    }
  },
};
