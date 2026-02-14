import React from 'react';
import { ErrorBoundary } from './core/error/ErrorBoundary';
import { ToastProvider } from './core/context/ToastContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
