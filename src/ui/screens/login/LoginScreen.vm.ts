import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { appConfig } from '../../../core/config/appConfig';
import { mockDelay, validateCredentials, mockAuthResponse } from '../../../core/mock/mockData';

export const useLoginViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError('');
      
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      setLoading(true);
      logger.log('LoginVM', 'User login attempt', { email });

      // Simulate API call with mock data
      await mockDelay(1000);

      // Validate credentials using mock data
      const user = validateCredentials(email, password);

      if (!user) {
        throw new AppError('Invalid email or password', 401, 'AUTH_FAILED');
      }

      // Generate mock auth response
      const response = mockAuthResponse(user);

      localStorage.setItem(appConfig.tokenKey, response.token);
      logger.log('LoginVM', 'Login successful', { userId: user.id, role: user.role });
      
      // Navigate based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Login failed');
      setError(appError.message);
      logger.error('LoginVM', 'Login failed', appError);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      email,
      password,
      error,
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
