import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { appConfig } from '../../../core/config/appConfig';
import { LoginRequest, AuthResponse } from '../../../models/auth.model';
import { useToast } from '../../../core/context/ToastContext';
import { getUserFriendlyMessage, getSuccessMessage } from '../../../core/utils/messageMapper';

export const useLoginViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.showWarning('Please fill in all fields');
        return;
      }

      setLoading(true);
      logger.log('LoginVM', 'User login attempt', { email });

      const request: LoginRequest = { email, password };
      const response = await apiClient.post<AuthResponse>('/auth/login', request);
      debugger
      localStorage.setItem(appConfig.tokenKey, response.token);
      logger.log('LoginVM', 'Login successful');
      
      toast.showSuccess(getSuccessMessage('login'));
      
      // Navigate based on role from response
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Login failed');
      const friendlyMessage = getUserFriendlyMessage(appError.message);
      toast.showError(friendlyMessage);
      logger.error('LoginVM', 'Login failed', appError);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      email,
      password,
    },
    loading,
    actions: {
      setEmail,
      setPassword,
      handleLogin,
      navigateToSignup: () => navigate('/signup'),
      navigateToForgotPassword: () => navigate('/forgot-password'),
    },
  };
};
