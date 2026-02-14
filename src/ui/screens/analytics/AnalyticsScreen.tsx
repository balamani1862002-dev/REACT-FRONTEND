import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalyticsViewModel } from './AnalyticsScreen.vm';
import { Card } from '../../reusables/Card';
import { Loader } from '../../reusables/Loader';

export const AnalyticsScreen: React.FC = () => {
  const { state, loading, actions } = useAnalyticsViewModel();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  const { categoryBreakdown, monthlyTrends, yearlyComparison, incomeVsExpense } = state;

  const pieColors = [
    'bg-royal-purple',
    'bg-soft-lavender',
    'bg-rich-gold',
    'bg-warm-amber',
    'bg-finance-income',
    'bg-finance-expense',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h1 className="text-3xl font-bold text-deep-indigo">Transaction Analytics</h1>
        </div>
        <button
          onClick={() => navigate('/money')}
          className="px-4 py-2 bg-white text-deep-indigo border border-light-lavender rounded-lg font-medium hover:bg-light-lavender transition-all"
        >
          Back to Transactions
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

      {/* Income vs Expense Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-deep-indigo mb-4">Income vs Expense</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-cool-gray">Total Income</span>
                <span className="text-sm font-semibold text-finance-income">₹{incomeVsExpense.income.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-finance-income h-3 rounded-full transition-all"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-cool-gray">Total Expense</span>
                <span className="text-sm font-semibold text-finance-expense">₹{incomeVsExpense.expense.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-finance-expense h-3 rounded-full transition-all"
                  style={{ width: `${(incomeVsExpense.expense / incomeVsExpense.income) * 100}%` }}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-light-lavender">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-deep-indigo">Net Balance</span>
                <span className={`text-lg font-bold ${incomeVsExpense.income - incomeVsExpense.expense >= 0 ? 'text-finance-income' : 'text-finance-expense'}`}>
                  ₹{(incomeVsExpense.income - incomeVsExpense.expense).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Pie Chart - Category Breakdown */}
        <Card>
          <h3 className="text-lg font-semibold text-deep-indigo mb-4">Expense by Category</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {categoryBreakdown.reduce((acc, cat, index) => {
                  const startAngle = acc.angle;
                  const angle = (cat.percentage / 100) * 360;
                  const endAngle = startAngle + angle;
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArc = angle > 180 ? 1 : 0;
                  
                  const colors = ['#5B21B6', '#8B5CF6', '#EAB308', '#FACC15', '#16A34A', '#DC2626'];
                  
                  acc.elements.push(
                    <path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={colors[index % colors.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  );
                  
                  acc.angle = endAngle;
                  return acc;
                }, { angle: 0, elements: [] as React.ReactElement[] }).elements}
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            {categoryBreakdown.map((cat, index) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${pieColors[index % pieColors.length]}`} />
                  <span className="text-sm text-deep-indigo">{cat.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-deep-indigo">₹{cat.amount.toFixed(2)}</span>
                  <span className="text-xs text-cool-gray ml-2">({cat.percentage.toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Year-over-Year Comparison Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-deep-indigo mb-6">Year-over-Year Financial Comparison</h3>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-finance-income rounded" />
            <span className="text-sm text-cool-gray">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-finance-expense rounded" />
            <span className="text-sm text-cool-gray">Expense</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-royal-purple rounded" />
            <span className="text-sm text-cool-gray">Net Balance</span>
          </div>
        </div>

        {/* Vertical Bar Chart */}
        <div className="relative px-8 py-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-32 flex flex-col justify-between text-xs text-cool-gray">
            {[6, 5, 4, 3, 2, 1, 0].map((i) => {
              const maxValue = Math.max(...yearlyComparison.map(y => Math.max(y.income, y.expense)));
              const value = (maxValue / 6) * i;
              return (
                <span key={i} className="text-right pr-2">
                  {value > 1000 ? `${(value / 1000).toFixed(0)}k` : value.toFixed(0)}
                </span>
              );
            })}
          </div>

          {/* Chart area */}
          <div className="ml-12 border-l-2 border-b-2 border-gray-300 pl-8 pb-4">
            {/* Horizontal grid lines */}
            <div className="relative h-80">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border-t border-gray-200 w-full" />
                ))}
              </div>

              {/* Bars */}
              <div className="relative h-full flex items-end justify-around gap-12 px-8">
                {yearlyComparison.map((year) => {
                  const maxValue = Math.max(...yearlyComparison.map(y => Math.max(y.income, y.expense)));
                  const incomeHeight = (year.income / maxValue) * 100;
                  const expenseHeight = (year.expense / maxValue) * 100;
                  const balanceHeight = (Math.abs(year.balance) / maxValue) * 100;

                  return (
                    <div key={year.year} className="flex items-end justify-center gap-2 flex-1 h-full">
                      {/* Income bar */}
                      <div 
                        className="w-full max-w-[40px] bg-finance-income rounded-t hover:opacity-80 transition-all relative group"
                        style={{ 
                          height: `${incomeHeight}%`,
                          minHeight: '8px'
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          Income: ₹{year.income.toFixed(0)}
                        </div>
                      </div>

                      {/* Expense bar */}
                      <div 
                        className="w-full max-w-[40px] bg-finance-expense rounded-t hover:opacity-80 transition-all relative group"
                        style={{ 
                          height: `${expenseHeight}%`,
                          minHeight: '8px'
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          Expense: ₹{year.expense.toFixed(0)}
                        </div>
                      </div>

                      {/* Balance bar */}
                      <div 
                        className="w-full max-w-[40px] bg-royal-purple rounded-t hover:opacity-80 transition-all relative group"
                        style={{ 
                          height: `${balanceHeight}%`,
                          minHeight: '8px'
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          Balance: ₹{year.balance.toFixed(0)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

           
          </div>
          {/* Year labels and growth - positioned below X-axis */}
          <div className="flex justify-around gap-12 px-8 pt-6">
            {yearlyComparison.map((year, index) => (
              <div key={year.year} className="flex-1 text-center">
                <div className="text-lg font-bold text-deep-indigo">{year.year}</div>
                {index > 0 && (
                  <div className={`text-sm font-semibold mt-1 ${
                    year.growth >= 0 ? 'text-finance-income' : 'text-finance-expense'
                  }`}>
                    {year.growth >= 0 ? '↑' : '↓'} {Math.abs(year.growth).toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* X-axis label */}
          <div className="text-center mt-4 text-sm font-medium text-cool-gray">Year</div>
        </div>
      </Card>

      {/* Transaction Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <div className="text-center">
            <div className="text-cool-gray text-sm mb-2">Total Transactions</div>
            <div className="text-3xl font-bold text-royal-purple">{state.transactions.length}</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-cool-gray text-sm mb-2">Average Transaction</div>
            <div className="text-3xl font-bold text-royal-purple">
              ₹{(state.transactions.reduce((sum, t) => sum + t.amount, 0) / state.transactions.length).toFixed(2)}
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-cool-gray text-sm mb-2">Largest Transaction</div>
            <div className="text-3xl font-bold text-royal-purple">
              ₹{Math.max(...state.transactions.map(t => t.amount)).toFixed(2)}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
