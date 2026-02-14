import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';

interface DashboardStats {
  totalTodos: number;
  completedTodos: number;
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;
}

export const useDashboardViewModel = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTodos: 0,
    completedTodos: 0,
    totalIncome: 0,
    totalExpense: 0,
    currentBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      logger.log('DashboardVM', 'Fetching dashboard data');

      const response = await apiClient.get<DashboardStats>('/dashboard/stats');
      setStats(response);

      logger.log('DashboardVM', 'Dashboard data loaded');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load dashboard');
      logger.error('DashboardVM', 'Failed to load dashboard', appError);
      setError(appError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    state: { stats, error },
    loading,
    actions: { 
      refresh: fetchDashboardData,
      clearError: () => setError(''),
    },
  };
};
