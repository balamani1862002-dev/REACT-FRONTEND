import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '../../../core/logger/logger';

export const useWelcomeViewModel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      logger.log('WelcomeVM', 'Search initiated', { query: searchQuery });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return {
    state: { searchQuery },
    actions: {
      setSearchQuery,
      handleSearch,
      navigateToDashboard: () => navigate('/dashboard'),
      navigateToTodos: () => navigate('/todos'),
    },
  };
};
