import React from 'react';
import { useProfileViewModel } from './ProfileScreen.vm';
import { Card } from '../../reusables/Card';
import { Loader } from '../../reusables/Loader';

export const ProfileScreen: React.FC = () => {
  const { state, loading, actions } = useProfileViewModel();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-8 h-8 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h1 className="text-3xl font-bold text-deep-indigo">Edit Profile</h1>
      </div>

      {state.error && (
        <div className="bg-red-50 border border-finance-expense text-finance-expense px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
          <span>{state.error}</span>
          <button onClick={actions.clearError} className="text-finance-expense hover:text-red-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {state.success && (
        <div className="bg-green-50 border border-finance-income text-finance-income px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
          <span>Profile updated successfully!</span>
          <button onClick={actions.clearSuccess} className="text-finance-income hover:text-green-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <Card>
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto group">
            <div className="w-full h-full bg-gradient-to-br from-soft-lavender to-light-lavender rounded-full flex items-center justify-center border-4 border-royal-purple shadow-lg">
              {state.uploadingImage ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-purple"></div>
                  <span className="text-xs text-royal-purple">Uploading...</span>
                </div>
              ) : state.profileImage ? (
                <img src={state.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <svg className="w-16 h-16 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-10 h-10 bg-royal-purple rounded-full flex items-center justify-center shadow-lg hover:bg-deep-indigo transition-all transform hover:scale-110 border-2 border-white"
              title="Change profile picture"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) actions.handleImageUpload(file);
              }}
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-deep-indigo mb-2">Name</label>
            <input
              type="text"
              value={state.name}
              onChange={(e) => actions.setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent text-deep-indigo transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep-indigo mb-2">Email</label>
            <input
              type="email"
              value={state.email}
              onChange={(e) => actions.setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent text-deep-indigo transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep-indigo mb-2">Phone</label>
            <input
              type="text"
              value={state.phone}
              onChange={(e) => actions.setPhone(e.target.value)}
              placeholder="Enter your phone"
              className="w-full px-4 py-3 border-2 border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent text-deep-indigo transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep-indigo mb-2">Address</label>
            <textarea
              value={state.address}
              onChange={(e) => actions.setAddress(e.target.value)}
              placeholder="Enter your address"
              rows={3}
              className="w-full px-4 py-3 border-2 border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent text-deep-indigo transition-all resize-none"
            />
          </div>

          <button
            onClick={actions.handleSave}
            className="w-full px-6 py-3 bg-gradient-to-r from-royal-purple to-soft-lavender text-white rounded-lg font-semibold hover:from-deep-indigo hover:to-royal-purple transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Save Changes
          </button>
        </div>
      </Card>
    </div>
  );
};
