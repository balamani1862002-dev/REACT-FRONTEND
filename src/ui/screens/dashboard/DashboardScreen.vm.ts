import { useState, useEffect } from 'react';
import { logger } from '../../../core/logger/logger';
import { TransactionSummary } from '../../../models/transaction.model';
import { mockTodos, mockTransactionSummary, mockDelay } from '../../../core/mock/mockData';

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

      await mockDelay(500);

      const completedCount = mockTodos.filter(t => t.status === 'completed').length;

      setStats({
        totalTodos: mockTodos.length,
        completedTodos: completedCount,
        totalIncome: mockTransactionSummary.totalIncome,
        totalExpense: mockTransactionSummary.totalExpense,
        currentBalance: mockTransactionSummary.currentBalance,
      });

      logger.log('DashboardVM', 'Dashboard data loaded');
      setError('');
    } catch (err) {
      logger.error('DashboardVM', 'Failed to load dashboard', err);
      setError('Failed to load dashboard');
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
