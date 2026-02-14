import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { User } from '../../../models/auth.model';

export const useAdminViewModel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      logger.log('AdminVM', 'Fetching users');
      const data = await apiClient.get<User[]>('/admin/users');
      setUsers(data);
      logger.log('AdminVM', 'Users loaded');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load users');
      setError(appError.message);
      logger.error('AdminVM', 'Failed to load users', appError);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      logger.log('AdminVM', 'Deleting user', { userId });
      await apiClient.delete(`/admin/users/${userId}`);
      await fetchUsers();
      logger.log('AdminVM', 'User deleted');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to delete user');
      setError(appError.message);
      logger.error('AdminVM', 'Failed to delete user', appError);
    }
  };

  const impersonateUser = async (userId: string) => {
    try {
      logger.log('AdminVM', 'Impersonating user', { userId });
      const response = await apiClient.post<{ token: string }>(`/admin/impersonate/${userId}`, {});
      localStorage.setItem('auth_token', response.token);
      navigate('/dashboard');
      logger.log('AdminVM', 'Impersonation successful');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to impersonate user');
      setError(appError.message);
      logger.error('AdminVM', 'Failed to impersonate user', appError);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    state: { users, error },
    loading,
    actions: { deleteUser, impersonateUser },
  };
};
