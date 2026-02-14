import React from 'react';
import { useWelcomeViewModel } from './WelcomeScreen.vm';

export const WelcomeScreen: React.FC = () => {
  const { state, actions } = useWelcomeViewModel();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-purple via-primary-light to-accent-gold">
      <div className="max-w-2xl w-full mx-4 bg-white rounded-lg shadow-2xl p-8 border border-border-light">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-purple to-accent-gold rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-primary-text">Welcome to Money Manager!</h1>
          <p className="text-muted-text text-lg">
            Manage your todos and track your finances all in one place
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-text">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={state.searchQuery}
              onChange={(e) => actions.setSearchQuery(e.target.value)}
              placeholder="Search todos or transactions..."
              className="w-full pl-10 pr-3 py-3 border border-border-light rounded focus:outline-none focus:ring-2 focus:ring-primary-purple text-primary-text"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={actions.navigateToDashboard}
            className="w-full py-4 px-4 bg-gradient-to-r from-primary-purple to-primary-light text-white rounded font-medium hover:from-primary-dark hover:to-primary-purple transition-all shadow-md flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Go to Dashboard
          </button>
          <button
            onClick={actions.navigateToTodos}
            className="w-full py-4 px-4 bg-gradient-to-r from-accent-gold to-accent-soft text-white rounded font-medium hover:from-accent-soft hover:to-accent-gold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            View Todos
          </button>
        </div>
      </div>
    </div>
  );
};
