import { useState, useEffect } from 'react';
import { logger } from '../../../core/logger/logger';
import { Transaction } from '../../../models/transaction.model';
import { mockTransactions, mockDelay } from '../../../core/mock/mockData';

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

export const useAnalyticsViewModel = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      logger.log('AnalyticsVM', 'Fetching transactions for analytics');
      
      await mockDelay(500);
      setTransactions([...mockTransactions]);
      
      logger.log('AnalyticsVM', 'Transactions loaded');
      setError('');
    } catch (err) {
      logger.error('AnalyticsVM', 'Failed to load transactions', err);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  // Calculate category breakdown
  const getCategoryBreakdown = (): CategoryData[] => {
    const categoryMap = new Map<string, number>();
    let totalExpense = 0;

    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
        totalExpense += t.amount;
      });

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalExpense) * 100,
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  // Calculate monthly trends
  const getMonthlyTrends = (): MonthlyData[] => {
    const monthMap = new Map<string, { income: number; expense: number }>();

    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, { income: 0, expense: 0 });
      }

      const data = monthMap.get(monthKey)!;
      if (t.type === 'income') {
        data.income += t.amount;
      } else {
        data.expense += t.amount;
      }
    });

    return Array.from(monthMap.entries())
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        ...data,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  // Calculate yearly comparison
  const getYearlyComparison = () => {
    const yearMap = new Map<number, { income: number; expense: number; balance: number }>();

    transactions.forEach(t => {
      const year = new Date(t.date).getFullYear();
      
      if (!yearMap.has(year)) {
        yearMap.set(year, { income: 0, expense: 0, balance: 0 });
      }

      const data = yearMap.get(year)!;
      if (t.type === 'income') {
        data.income += t.amount;
      } else {
        data.expense += t.amount;
      }
      data.balance = data.income - data.expense;
    });

    const years = Array.from(yearMap.entries())
      .map(([year, data]) => ({ year, ...data }))
      .sort((a, b) => a.year - b.year);

    // Calculate growth percentages
    return years.map((yearData, index) => {
      if (index === 0) {
        return { ...yearData, growth: 0 };
      }
      const prevBalance = years[index - 1].balance;
      const growth = prevBalance !== 0 ? ((yearData.balance - prevBalance) / Math.abs(prevBalance)) * 100 : 0;
      return { ...yearData, growth };
    });
  };

  // Calculate income vs expense
  const getIncomeVsExpense = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense };
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    state: {
      transactions,
      categoryBreakdown: getCategoryBreakdown(),
      monthlyTrends: getMonthlyTrends(),
      yearlyComparison: getYearlyComparison(),
      incomeVsExpense: getIncomeVsExpense(),
      error,
    },
    loading,
    actions: {
      clearError: () => setError(''),
    },
  };
};
