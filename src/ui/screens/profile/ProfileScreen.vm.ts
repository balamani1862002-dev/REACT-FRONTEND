import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { User } from '../../../models/auth.model';

export const useProfileViewModel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      logger.log('ProfileVM', 'Fetching profile');
      const user = await apiClient.get<User>('/users/profile');
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setProfileImage(user.profileImage || '');
      logger.log('ProfileVM', 'Profile loaded');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load profile');
      setError(appError.message);
      logger.error('ProfileVM', 'Failed to load profile', appError);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setError('');
      setSuccess(false);
      logger.log('ProfileVM', 'Updating profile');
      await apiClient.put('/users/profile', { name, email, phone, address, profileImage });
      setSuccess(true);
      logger.log('ProfileVM', 'Profile updated');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to update profile');
      setError(appError.message);
      logger.error('ProfileVM', 'Failed to update profile', appError);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    state: { name, email, phone, address, profileImage, error, success },
    loading,
    actions: { setName, setEmail, setPhone, setAddress, setProfileImage, handleSave },
  };
};
