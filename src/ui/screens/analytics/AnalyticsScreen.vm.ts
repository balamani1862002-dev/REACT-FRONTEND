import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

interface YearlyData {
  year: number;
  income: number;
  expense: number;
  balance: number;
  growth: number;
}

interface AnalyticsData {
  categoryBreakdown: CategoryData[];
  monthlyTrends: MonthlyData[];
  yearlyComparison: YearlyData[];
}

export const useAnalyticsViewModel = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    categoryBreakdown: [],
    monthlyTrends: [],
    yearlyComparison: [],
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

  // Calculate income vs expense from yearly comparison
  const getIncomeVsExpense = () => {
    const income = analytics.yearlyComparison.reduce((sum, year) => sum + year.income, 0);
    const expense = analytics.yearlyComparison.reduce((sum, year) => sum + year.expense, 0);
    return { income, expense };
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    state: {
      categoryBreakdown: analytics.categoryBreakdown,
      yearlyComparison: analytics.yearlyComparison,
      incomeVsExpense: getIncomeVsExpense(),
      error,
    },
    loading,
    actions: {
      clearError: () => setError(''),
    },
  };
};
