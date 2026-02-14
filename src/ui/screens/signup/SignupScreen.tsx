import React from 'react';
import { useSignupViewModel } from './SignupScreen.vm';
import { Loader } from '../../reusables/Loader';

export const SignupScreen: React.FC = () => {
  const { state, loading, actions } = useSignupViewModel();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-soft-lilac">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-soft-lilac overflow-hidden py-8">
      {/* Wavy Background */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path fill="#8B5CF6" fillOpacity="0.1" d="M0,400 C360,300 720,500 1440,400 L1440,800 L0,800 Z" />
          <path fill="#5B21B6" fillOpacity="0.1" d="M0,500 C360,400 720,600 1440,500 L1440,800 L0,800 Z" />
          <path fill="#4C1D95" fillOpacity="0.05" d="M0,600 C360,500 720,700 1440,600 L1440,800 L0,800 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl p-8 border border-light-lavender">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-gradient-to-br from-royal-purple to-soft-lavender rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-deep-indigo mb-2">Create Account</h1>
          <p className="text-cool-gray text-sm">Join Money Manager today</p>
        </div>
        
        {state.error && (
          <div className="bg-red-50 border border-finance-expense text-finance-expense px-4 py-3 rounded-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{state.error}</span>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-deep-indigo mb-2">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              value={state.name}
              onChange={(e) => actions.setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full pl-10 pr-4 py-3 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent text-deep-indigo transition-all"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-deep-indigo mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="email"
              value={state.email}
              onChange={(e) => actions.setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent text-deep-indigo transition-all"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-deep-indigo mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              value={state.password}
              onChange={(e) => actions.setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full pl-10 pr-4 py-3 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent text-deep-indigo transition-all"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-deep-indigo mb-2">Phone (Optional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
              type="text"
              value={state.phone}
              onChange={(e) => actions.setPhone(e.target.value)}
              placeholder="Enter your phone"
              className="w-full pl-10 pr-4 py-3 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent text-deep-indigo transition-all"
            />
          </div>
        </div>

        <button
          onClick={actions.handleSignup}
          className="w-full py-3 bg-gradient-to-r from-royal-purple to-soft-lavender text-white rounded-lg font-semibold hover:from-deep-purple hover:to-royal-purple transition-all transform hover:scale-[1.02] shadow-lg mb-4"
        >
          Create Account
        </button>

        <p className="text-center text-cool-gray text-sm">
          Already have an account?{' '}
          <button onClick={actions.navigateToLogin} className="text-royal-purple hover:text-deep-purple font-semibold transition-colors">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
