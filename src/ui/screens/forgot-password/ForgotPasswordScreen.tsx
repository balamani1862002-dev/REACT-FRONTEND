import React from 'react';
import { useForgotPasswordViewModel } from './ForgotPasswordScreen.vm';
import { Loader } from '../../reusables/Loader';

export const ForgotPasswordScreen: React.FC = () => {
  const { state, loading, actions } = useForgotPasswordViewModel();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-bg">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-app-bg overflow-hidden">
      {/* Wavy Background */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#5B21B6" fillOpacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        <path fill="#8B5CF6" fillOpacity="0.1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      <div className="relative z-10 max-w-md w-full mx-4 bg-white rounded-lg shadow-2xl p-8 border border-border-light">
        <h1 className="text-3xl font-bold text-center mb-2 text-primary-text">Forgot Password</h1>
        <p className="text-center text-muted-text mb-6 text-sm">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        
        {state.error && (
          <div className="bg-red-50 border border-finance-expense text-finance-expense px-4 py-3 rounded mb-4">
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="bg-green-50 border border-todo-completed text-todo-completed px-4 py-3 rounded mb-4">
            <p className="font-medium mb-1">Check your email!</p>
            <p className="text-sm">
              If an account exists with this email, you will receive password reset instructions shortly.
            </p>
          </div>
        )}

        {!state.success && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary-text mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-text">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={state.email}
                  onChange={(e) => actions.setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 border border-border-light rounded focus:outline-none focus:ring-2 focus:ring-primary-purple text-primary-text"
                  onKeyPress={(e) => e.key === 'Enter' && actions.handleSubmit()}
                />
              </div>
            </div>

            <button
              onClick={actions.handleSubmit}
              className="w-full px-4 py-2 bg-gradient-to-r from-primary-purple to-primary-light text-white rounded font-medium hover:from-primary-dark hover:to-primary-purple transition-all shadow-md mb-4"
            >
              Send Reset Instructions
            </button>
          </>
        )}

        <div className="text-center">
          <button
            onClick={actions.navigateToLogin}
            className="text-primary-purple hover:text-primary-dark hover:underline text-sm transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
