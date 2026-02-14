import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Navbar } from '../ui/components/Navbar';
import { Loader } from '../ui/reusables/Loader';

const LoginScreen = lazy(() => import('../ui/screens/login/LoginScreen').then(m => ({ default: m.LoginScreen })));
const SignupScreen = lazy(() => import('../ui/screens/signup/SignupScreen').then(m => ({ default: m.SignupScreen })));
const ForgotPasswordScreen = lazy(() => import('../ui/screens/forgot-password/ForgotPasswordScreen').then(m => ({ default: m.ForgotPasswordScreen })));
const WelcomeScreen = lazy(() => import('../ui/screens/welcome/WelcomeScreen').then(m => ({ default: m.WelcomeScreen })));
const DashboardScreen = lazy(() => import('../ui/screens/dashboard/DashboardScreen').then(m => ({ default: m.DashboardScreen })));
const TodosScreen = lazy(() => import('../ui/screens/todos/TodosScreen').then(m => ({ default: m.TodosScreen })));
const MoneyScreen = lazy(() => import('../ui/screens/money/MoneyScreen').then(m => ({ default: m.MoneyScreen })));
const AnalyticsScreen = lazy(() => import('../ui/screens/analytics/AnalyticsScreen').then(m => ({ default: m.AnalyticsScreen })));
const ProfileScreen = lazy(() => import('../ui/screens/profile/ProfileScreen').then(m => ({ default: m.ProfileScreen })));
const AdminScreen = lazy(() => import('../ui/screens/admin/AdminScreen').then(m => ({ default: m.AdminScreen })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/admin-login" element={<LoginScreen />} />

          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomeScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-soft-lilac">
                  <Navbar />
                  <DashboardScreen />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-soft-lilac">
                  <Navbar />
                  <TodosScreen />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/money"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-soft-lilac">
                  <Navbar />
                  <MoneyScreen />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-soft-lilac">
                  <Navbar />
                  <AnalyticsScreen />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-soft-lilac">
                  <Navbar />
                  <ProfileScreen />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-soft-lilac">
                  <Navbar />
                  <AdminScreen />
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
