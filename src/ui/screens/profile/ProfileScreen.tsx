import React from 'react';
import { useProfileViewModel } from './ProfileScreen.vm';
import { Card } from '../../reusables/Card';
import { Loader } from '../../reusables/Loader';

export const ProfileScreen: React.FC = () => {
  const { state, loading, actions } = useProfileViewModel();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-bg">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl bg-app-bg min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary-text">👤 Edit Profile</h1>

      {state.error && (
        <div className="bg-red-50 border border-finance-expense text-finance-expense px-4 py-3 rounded mb-4">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="bg-green-50 border border-todo-completed text-todo-completed px-4 py-3 rounded mb-4">
          Profile updated successfully!
        </div>
      )}

      <Card>
        <div className="mb-6">
          <div className="w-24 h-24 bg-app-bg rounded-full mx-auto mb-4 flex items-center justify-center border border-border-light">
            {state.profileImage ? (
              <img src={state.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-3xl text-muted-text">👤</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) actions.setProfileImage(URL.createObjectURL(file));
            }}
            className="block mx-auto text-sm text-primary-text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-text mb-1">Name</label>
          <input
            type="text"
            value={state.name}
            onChange={(e) => actions.setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-border-light rounded focus:outline-none focus:ring-2 focus:ring-primary-purple text-primary-text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-text mb-1">Email</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => actions.setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-border-light rounded focus:outline-none focus:ring-2 focus:ring-primary-purple text-primary-text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-text mb-1">Phone</label>
          <input
            type="text"
            value={state.phone}
            onChange={(e) => actions.setPhone(e.target.value)}
            placeholder="Enter your phone"
            className="w-full px-3 py-2 border border-border-light rounded focus:outline-none focus:ring-2 focus:ring-primary-purple text-primary-text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-primary-text mb-1">Address</label>
          <input
            type="text"
            value={state.address}
            onChange={(e) => actions.setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full px-3 py-2 border border-border-light rounded focus:outline-none focus:ring-2 focus:ring-primary-purple text-primary-text"
          />
        </div>

        <button
          onClick={actions.handleSave}
          className="w-full px-4 py-2 bg-gradient-to-r from-primary-purple to-primary-light text-white rounded font-medium hover:from-primary-dark hover:to-primary-purple transition-all shadow-md"
        >
          Save Changes
        </button>
      </Card>
    </div>
  );
};
