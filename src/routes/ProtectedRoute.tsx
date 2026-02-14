import React from 'react';
import { Navigate } from 'react-router-dom';
import { appConfig } from '../core/config/appConfig';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem(appConfig.tokenKey);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
