import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';

export const useForgotPasswordViewModel = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError('');
      setSuccess(false);
      
      if (!email) {
        setError('Please enter your email address');
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      setLoading(true);
      logger.log('ForgotPasswordVM', 'Password reset request', { email });

      await apiClient.post('/auth/forgot-password', { email });

      setSuccess(true);
      logger.log('ForgotPasswordVM', 'Password reset request successful');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to process request');
      setError(appError.message);
      logger.error('ForgotPasswordVM', 'Password reset failed', appError);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      email,
      error,
      success,
    },
    loading,
    actions: {
      setEmail,
      handleSubmit,
      navigateToLogin: () => navigate('/login'),
    },
  };
};
