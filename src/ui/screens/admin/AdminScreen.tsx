import React from 'react';
import { useAdminViewModel } from './AdminScreen.vm';
import { Card } from '../../reusables/Card';
import { Loader } from '../../reusables/Loader';

export const AdminScreen: React.FC = () => {
  const { state, loading, actions } = useAdminViewModel();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-app-bg">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-app-bg min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary-text">🔐 Admin Panel</h1>

      {state.error && (
        <div className="bg-red-50 border border-finance-expense text-finance-expense px-4 py-3 rounded mb-4">
          {state.error}
        </div>
      )}

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-primary-text">User Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-2 text-primary-text">Name</th>
                <th className="text-left py-2 text-primary-text">Email</th>
                <th className="text-left py-2 text-primary-text">Role</th>
                <th className="text-left py-2 text-primary-text">Created</th>
                <th className="text-left py-2 text-primary-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((user) => (
                <tr key={user.id} className="border-b border-border-light hover:bg-app-bg">
                  <td className="py-3 text-primary-text">{user.name}</td>
                  <td className="py-3 text-muted-text">{user.email}</td>
                  <td className="py-3 text-primary-text">{user.role}</td>
                  <td className="py-3 text-muted-text">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => actions.impersonateUser(user.id)}
                        className="px-4 py-2 bg-white text-primary-text rounded font-medium hover:bg-app-bg transition-colors border border-border-light"
                      >
                        View As
                      </button>
                      <button
                        onClick={() => actions.deleteUser(user.id)}
                        className="px-4 py-2 bg-finance-expense text-white rounded font-medium hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
