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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      logger.log('ProfileVM', 'Fetching profile');
      const user = await apiClient.get<any>('/users/profile');
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
      setAddress(user.address || '');
      // Handle both camelCase and snake_case from backend
      setProfileImage(user.profile_image || user.profileImage || '');
      logger.log('ProfileVM', 'Profile loaded');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load profile');
      setError(appError.message);
      logger.error('ProfileVM', 'Failed to load profile', appError);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    try {
      // Validate file size (max 2MB)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSizeInBytes) {
        setError('Image size must be less than 2MB. Please choose a smaller image.');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }

      setUploadingImage(true);
      logger.log('ProfileVM', 'Converting image to base64', { fileName: file.name, fileSize: file.size });
      
      // Create an image element to resize
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      
      img.onload = () => {
        // Create canvas to resize image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions (max 800x800)
        let width = img.width;
        let height = img.height;
        const maxDimension = 800;
        
        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw resized image
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression (0.7 quality for JPEG)
        const base64String = canvas.toDataURL('image/jpeg', 0.7);
        
        setProfileImage(base64String);
        setUploadingImage(false);
        logger.log('ProfileVM', 'Image converted to base64', { 
          originalSize: file.size,
          compressedLength: base64String.length 
        });
        console.log('Base64 preview:', base64String.substring(0, 100) + '...');
        console.log('Compressed image size:', Math.round(base64String.length / 1024), 'KB');
      };
      
      img.onerror = () => {
        setUploadingImage(false);
        logger.error('ProfileVM', 'Failed to load image');
        setError('Failed to load image file');
      };
      
      reader.onerror = () => {
        setUploadingImage(false);
        logger.error('ProfileVM', 'Failed to read image file');
        setError('Failed to read image file');
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      setUploadingImage(false);
      logger.error('ProfileVM', 'Failed to process image', err);
      setError('Failed to process image');
    }
  };

  const handleSave = async () => {
    try {
      setError('');
      setSuccess(false);
      logger.log('ProfileVM', 'Updating profile', { 
        hasProfileImage: !!profileImage,
        imageLength: profileImage.length,
        imagePreview: profileImage.substring(0, 50)
      });
      
      await apiClient.put('/users/profile', { 
        name, 
        email, 
        phone, 
        address, 
        profile_image: profileImage 
      });
      setSuccess(true);
      
      // Dispatch custom event to notify Navbar of profile update
      window.dispatchEvent(new Event('profileUpdated'));
      
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
    state: { name, email, phone, address, profileImage, error, success, uploadingImage },
    loading,
    actions: { 
      setName, 
      setEmail, 
      setPhone, 
      setAddress, 
      handleImageUpload,
      handleSave,
      clearError: () => setError(''),
      clearSuccess: () => setSuccess(false),
    },
  };
};
