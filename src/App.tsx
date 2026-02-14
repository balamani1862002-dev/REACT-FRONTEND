import React from 'react';
import { ErrorBoundary } from './core/error/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
