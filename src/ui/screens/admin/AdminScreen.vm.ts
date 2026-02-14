import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { User } from '../../../models/auth.model';
import { appConfig } from '../../../core/config/appConfig';

export const useAdminViewModel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      logger.log('AdminVM', 'Fetching users');
      
      const response = await apiClient.get<User[]>('/admin/users');
      setUsers(response);
      
      logger.log('AdminVM', 'Users loaded');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load users');
      logger.error('AdminVM', 'Failed to load users', appError);
      setError(appError.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      logger.log('AdminVM', 'Deleting user', { userId });
      
      await apiClient.delete(`/admin/users/${userId}`);
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      
      logger.log('AdminVM', 'User deleted');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to delete user');
      logger.error('AdminVM', 'Failed to delete user', appError);
      setError(appError.message);
    }
  };

  const impersonateUser = async (userId: string) => {
    try {
      logger.log('AdminVM', 'Impersonating user', { userId });
      
      const response = await apiClient.post<{ token: string }>(`/admin/impersonate/${userId}`, {});
      localStorage.setItem(appConfig.tokenKey, response.token);
      navigate('/dashboard');
      
      logger.log('AdminVM', 'Impersonation successful');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to impersonate user');
      logger.error('AdminVM', 'Failed to impersonate user', appError);
      setError(appError.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    state: { users, error },
    loading,
    actions: { 
      deleteUser, 
      impersonateUser,
      clearError: () => setError(''),
    },
  };
};
