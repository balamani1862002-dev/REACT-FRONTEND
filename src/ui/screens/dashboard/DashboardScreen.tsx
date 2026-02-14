import React from 'react';
import { useDashboardViewModel } from './DashboardScreen.vm';
import { Card } from '../../reusables/Card';
import { Loader } from '../../reusables/Loader';

export const DashboardScreen: React.FC = () => {
  const { state, loading, actions } = useDashboardViewModel();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-bg">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-app-bg min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-8 h-8 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h1 className="text-3xl font-bold text-primary-text">Dashboard</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-muted-text text-sm font-medium mb-2">Total Todos</h3>
          <p className="text-3xl font-bold text-primary-purple">{state.stats.totalTodos}</p>
        </Card>

        <Card>
          <h3 className="text-muted-text text-sm font-medium mb-2">Completed Todos</h3>
          <p className="text-3xl font-bold text-todo-completed">{state.stats.completedTodos}</p>
        </Card>

        <Card>
          <h3 className="text-muted-text text-sm font-medium mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-finance-income">₹{state.stats.totalIncome.toFixed(2)}</p>
        </Card>

        <Card>
          <h3 className="text-muted-text text-sm font-medium mb-2">Total Expense</h3>
          <p className="text-3xl font-bold text-finance-expense">₹{state.stats.totalExpense.toFixed(2)}</p>
        </Card>

        <Card>
          <h3 className="text-muted-text text-sm font-medium mb-2">Current Balance</h3>
          <p className="text-3xl font-bold text-finance-balance">₹{state.stats.currentBalance.toFixed(2)}</p>
        </Card>
      </div>
    </div>
  );
};
