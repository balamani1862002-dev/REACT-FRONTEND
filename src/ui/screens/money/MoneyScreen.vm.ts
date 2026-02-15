import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { Transaction, CreateTransactionRequest, TransactionSummary } from '../../../models/transaction.model';

const ITEMS_PER_PAGE = 5;

interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}

export const useMoneyViewModel = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [summary, setSummary] = useState<TransactionSummary>({
    totalIncome: 0,
    totalExpense: 0,
    currentBalance: 0,
  });
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateDisplayedTransactions = (transactions: Transaction[], page: number) => {
    const endIndex = page * ITEMS_PER_PAGE;
    const displayed = transactions.slice(0, endIndex);
    setDisplayedTransactions(displayed);
    setHasMore(endIndex < transactions.length);
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      logger.log('MoneyVM', 'Fetching transactions');
      
      const [transactionsRes, summaryData] = await Promise.all([
        apiClient.get<TransactionsResponse>('/transactions'),
        apiClient.get<TransactionSummary>('/transactions/summary')
      ]);
      
      setAllTransactions(transactionsRes.transactions);
      setSummary(summaryData);
      updateDisplayedTransactions(transactionsRes.transactions, 1);
      setCurrentPage(1);
      
      logger.log('MoneyVM', 'Transactions loaded');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load transactions');
      logger.error('MoneyVM', 'Failed to load transactions', appError);
      setError(appError.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      logger.log('MoneyVM', 'Loading more transactions');
      
      const nextPage = currentPage + 1;
      updateDisplayedTransactions(allTransactions, nextPage);
      setCurrentPage(nextPage);
      
      logger.log('MoneyVM', 'More transactions loaded');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load more transactions');
      logger.error('MoneyVM', 'Failed to load more transactions', appError);
      setError(appError.message);
    } finally {
      setLoadingMore(false);
    }
  };

  const createTransaction = async (request: CreateTransactionRequest) => {
    try {
      logger.log('MoneyVM', 'Creating transaction');
      
      const newTransaction = await apiClient.post<Transaction>('/transactions', request);
      
      const updatedTransactions = [newTransaction, ...allTransactions];
      setAllTransactions(updatedTransactions);
      updateDisplayedTransactions(updatedTransactions, currentPage);
      
      // Fetch updated summary
      const summaryData = await apiClient.get<TransactionSummary>('/transactions/summary');
      setSummary(summaryData);
      
      setIsModalOpen(false);
      logger.log('MoneyVM', 'Transaction created');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to create transaction');
      logger.error('MoneyVM', 'Failed to create transaction', appError);
      setError(appError.message);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      logger.log('MoneyVM', 'Deleting transaction', { id });
      
      await apiClient.delete(`/transactions/${id}`);
      
      const updatedTransactions = allTransactions.filter(t => t.id !== id);
      setAllTransactions(updatedTransactions);
      updateDisplayedTransactions(updatedTransactions, currentPage);
      
      // Fetch updated summary
      const summaryData = await apiClient.get<TransactionSummary>('/transactions/summary');
      setSummary(summaryData);
      
      logger.log('MoneyVM', 'Transaction deleted');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to delete transaction');
      logger.error('MoneyVM', 'Failed to delete transaction', appError);
      setError(appError.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    state: {
      transactions: displayedTransactions,
      summary,
      view,
      error,
      isModalOpen,
      hasMore,
    },
    loading,
    loadingMore,
    actions: {
      setView,
      createTransaction,
      deleteTransaction,
      loadMore,
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
      clearError: () => setError(''),
    },
  };
};
