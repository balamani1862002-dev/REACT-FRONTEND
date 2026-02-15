import React, { useState } from 'react';
import { useMoneyViewModel } from './MoneyScreen.vm';
import { Card } from '../../reusables/Card';
import { Loader } from '../../reusables/Loader';

export const MoneyScreen: React.FC = () => {
  const { state, loading, loadingMore, actions } = useMoneyViewModel();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    actions.createTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    });
    setAmount('');
    setCategory('');
    setDescription('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-royal-purple flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold text-deep-indigo">Money Tracking</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => window.location.href = '/analytics'}
            className="px-3 sm:px-4 py-2 bg-white text-royal-purple border border-royal-purple rounded-lg font-medium hover:bg-royal-purple hover:text-white transition-all flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Analytics</span>
          </button>
          <button
            onClick={actions.openModal}
            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-royal-purple to-soft-lavender text-white rounded-lg font-medium hover:from-deep-purple hover:to-royal-purple transition-all shadow-md text-sm sm:text-base whitespace-nowrap"
          >
            Add Transaction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-cool-gray text-sm font-medium mb-2">Current Balance</h3>
          <p className="text-3xl font-bold text-finance-balance">₹{state.summary.currentBalance.toFixed(2)}</p>
        </Card>
        <Card>
          <h3 className="text-cool-gray text-sm font-medium mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-finance-income">₹{state.summary.totalIncome.toFixed(2)}</p>
        </Card>
        <Card>
          <h3 className="text-cool-gray text-sm font-medium mb-2">Total Expense</h3>
          <p className="text-3xl font-bold text-finance-expense">₹{state.summary.totalExpense.toFixed(2)}</p>
        </Card>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => actions.setView('daily')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            state.view === 'daily'
              ? 'bg-gradient-to-r from-royal-purple to-soft-lavender text-white shadow-md'
              : 'bg-white text-deep-indigo hover:bg-light-lavender border border-light-lavender'
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => actions.setView('weekly')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            state.view === 'weekly'
              ? 'bg-gradient-to-r from-royal-purple to-soft-lavender text-white shadow-md'
              : 'bg-white text-deep-indigo hover:bg-light-lavender border border-light-lavender'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => actions.setView('monthly')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            state.view === 'monthly'
              ? 'bg-gradient-to-r from-royal-purple to-soft-lavender text-white shadow-md'
              : 'bg-white text-deep-indigo hover:bg-light-lavender border border-light-lavender'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => actions.setView('yearly')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            state.view === 'yearly'
              ? 'bg-gradient-to-r from-royal-purple to-soft-lavender text-white shadow-md'
              : 'bg-white text-deep-indigo hover:bg-light-lavender border border-light-lavender'
          }`}
        >
          Yearly
        </button>
      </div>

      {state.error && (
        <div className="bg-red-50 border border-finance-expense text-finance-expense px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
          <span>{state.error}</span>
          <button onClick={actions.clearError} className="text-finance-expense hover:text-red-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-deep-indigo">Transaction History</h2>
        <div className="space-y-2">
          {state.transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-3 bg-soft-lilac rounded-lg border border-light-lavender">
              <div>
                <p className="font-medium text-deep-indigo">{transaction.category}</p>
                <p className="text-sm text-cool-gray">{transaction.description}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${transaction.type === 'income' ? 'text-finance-income' : 'text-finance-expense'}`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                </p>
                <button
                  onClick={() => actions.deleteTransaction(transaction.id)}
                  className="px-4 py-2 bg-finance-expense text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-xs mt-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {state.hasMore && (
          <div className="mt-6 text-center">
            <button
              onClick={actions.loadMore}
              disabled={loadingMore}
              className="px-6 py-3 bg-white text-royal-purple border-2 border-royal-purple rounded-lg font-medium hover:bg-royal-purple hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </Card>

      {state.isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full my-8 border border-light-lavender max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-light-lavender flex-shrink-0">
              <h2 className="text-xl font-semibold text-deep-indigo">Add Transaction</h2>
              <button onClick={actions.closeModal} className="text-cool-gray hover:text-deep-indigo text-2xl">
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="mb-4">
                <label className="block text-sm font-medium text-deep-indigo mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                  className="w-full px-3 py-2 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple text-deep-indigo"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-deep-indigo mb-1">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple text-deep-indigo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-deep-indigo mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category"
                  className="w-full px-3 py-2 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple text-deep-indigo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-deep-indigo mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="w-full px-3 py-2 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple text-deep-indigo"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-gradient-to-r from-royal-purple to-soft-lavender text-white rounded-lg font-medium hover:from-deep-purple hover:to-royal-purple transition-all shadow-md"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
