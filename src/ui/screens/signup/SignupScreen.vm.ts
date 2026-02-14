import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { SignupRequest, AuthResponse } from '../../../models/auth.model';
import { appConfig } from '../../../core/config/appConfig';

export const useSignupViewModel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError('');
      
      if (!name || !email || !password) {
        setError('Please fill in all required fields');
        return;
      }

      setLoading(true);
      logger.log('SignupVM', 'User signup attempt', { email });

      const request: SignupRequest = { name, email, password, phone };
      const response = await apiClient.post<AuthResponse>('/auth/signup', request);

      localStorage.setItem(appConfig.tokenKey, response.token);
      logger.log('SignupVM', 'Signup successful');
      
      navigate('/welcome');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Signup failed');
      setError(appError.message);
      logger.error('SignupVM', 'Signup failed', appError);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { name, email, password, phone, error },
    loading,
    actions: {
      setName,
      setEmail,
      setPassword,
      setPhone,
      handleSignup,
      navigateToLogin: () => navigate('/login'),
    },
  };
};
