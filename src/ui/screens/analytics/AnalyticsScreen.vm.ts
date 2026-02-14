import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { Transaction } from '../../../models/transaction.model';

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

interface AnalyticsData {
  categoryBreakdown: CategoryData[];
  yearlyComparison: Array<{
    year: number;
    income: number;
    expense: number;
    balance: number;
    growth: number;
  }>;
  incomeVsExpense: {
    income: number;
    expense: number;
  };
}

export const useAnalyticsViewModel = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    categoryBreakdown: [],
    yearlyComparison: [],
    incomeVsExpense: { income: 0, expense: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      logger.log('AnalyticsVM', 'Fetching analytics data');
      
      const response = await apiClient.get<AnalyticsData>('/transactions/analytics');
      setAnalytics(response);
      
      logger.log('AnalyticsVM', 'Analytics data loaded');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load analytics');
      logger.error('AnalyticsVM', 'Failed to load analytics', appError);
      setError(appError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    state: {
      ...analytics,
      error,
    },
    loading,
    actions: {
      clearError: () => setError(''),
    },
  };
};
