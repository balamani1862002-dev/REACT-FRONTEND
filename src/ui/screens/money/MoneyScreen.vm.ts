import { useState, useEffect } from 'react';
import { logger } from '../../../core/logger/logger';
import { Transaction, CreateTransactionRequest, TransactionSummary } from '../../../models/transaction.model';
import { mockTransactions, mockTransactionSummary, mockDelay } from '../../../core/mock/mockData';

const ITEMS_PER_PAGE = 5;

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
      
      await mockDelay(500);
      setAllTransactions([...mockTransactions]);
      setSummary({ ...mockTransactionSummary });
      updateDisplayedTransactions([...mockTransactions], 1);
      setCurrentPage(1);
      
      logger.log('MoneyVM', 'Transactions loaded');
      setError('');
    } catch (err) {
      logger.error('MoneyVM', 'Failed to load transactions', err);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      logger.log('MoneyVM', 'Loading more transactions');
      
      await mockDelay(300);
      const nextPage = currentPage + 1;
      updateDisplayedTransactions(allTransactions, nextPage);
      setCurrentPage(nextPage);
      
      logger.log('MoneyVM', 'More transactions loaded');
    } catch (err) {
      logger.error('MoneyVM', 'Failed to load more transactions', err);
      setError('Failed to load more transactions');
    } finally {
      setLoadingMore(false);
    }
  };

  const createTransaction = async (request: CreateTransactionRequest) => {
    try {
      logger.log('MoneyVM', 'Creating transaction');
      
      await mockDelay(300);
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...request,
        createdAt: new Date().toISOString(),
      };
      
      const updatedTransactions = [newTransaction, ...allTransactions];
      setAllTransactions(updatedTransactions);
      updateDisplayedTransactions(updatedTransactions, currentPage);
      
      // Recalculate summary
      const totalIncome = updatedTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = updatedTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      setSummary({
        totalIncome,
        totalExpense,
        currentBalance: totalIncome - totalExpense,
      });
      
      setIsModalOpen(false);
      logger.log('MoneyVM', 'Transaction created');
      setError('');
    } catch (err) {
      logger.error('MoneyVM', 'Failed to create transaction', err);
      setError('Failed to create transaction');
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      logger.log('MoneyVM', 'Deleting transaction', { id });
      
      await mockDelay(300);
      const updatedTransactions = allTransactions.filter(t => t.id !== id);
      setAllTransactions(updatedTransactions);
      updateDisplayedTransactions(updatedTransactions, currentPage);
      
      // Recalculate summary
      const totalIncome = updatedTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = updatedTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      setSummary({
        totalIncome,
        totalExpense,
        currentBalance: totalIncome - totalExpense,
      });
      
      logger.log('MoneyVM', 'Transaction deleted');
      setError('');
    } catch (err) {
      logger.error('MoneyVM', 'Failed to delete transaction', err);
      setError('Failed to delete transaction');
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
