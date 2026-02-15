import React from 'react';
import { useAdminViewModel } from './AdminScreen.vm';
import { Card } from '../../reusables/Card';
import { Loader } from '../../reusables/Loader';

export const AdminScreen: React.FC = () => {
  const { state, loading, actions } = useAdminViewModel();
  const [deleteModal, setDeleteModal] = React.useState<{ show: boolean; userId: string; userName: string }>({
    show: false,
    userId: '',
    userName: ''
  });

  const handleDeleteClick = (userId: string, userName: string) => {
    setDeleteModal({ show: true, userId, userName });
  };

  const handleConfirmDelete = () => {
    actions.deleteUser(deleteModal.userId);
    setDeleteModal({ show: false, userId: '', userName: '' });
  };

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, userId: '', userName: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h1 className="text-2xl sm:text-3xl font-bold text-deep-indigo">User Management</h1>
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

      <Card>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-light-lavender">
                  <th className="text-left py-3 px-2 sm:px-4 text-deep-indigo font-semibold text-sm sm:text-base">Name</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-deep-indigo font-semibold text-sm sm:text-base">Email</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-deep-indigo font-semibold text-sm sm:text-base whitespace-nowrap">Balance</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-deep-indigo font-semibold text-sm sm:text-base whitespace-nowrap">Todos</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-deep-indigo font-semibold text-sm sm:text-base hidden lg:table-cell">Created</th>
                  <th className="text-center py-3 px-2 sm:px-4 text-deep-indigo font-semibold text-sm sm:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.users.map((user) => {
                  return (
                    <tr 
                      key={user.id} 
                      className="border-b border-light-lavender hover:bg-soft-lilac transition-colors cursor-pointer"
                      onClick={() => actions.impersonateUser(user.id)}
                    >
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-deep-indigo font-medium text-sm sm:text-base">{user.name}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-cool-gray text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">{user.email}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-finance-income font-semibold text-sm sm:text-base whitespace-nowrap">₹{user.currentBalance.toFixed(2)}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-royal-purple font-semibold text-sm sm:text-base">{user.remainingTodos}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-cool-gray text-sm sm:text-base hidden lg:table-cell">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Edit user:', user.id);
                          }}
                          className="group relative w-8 h-8 sm:w-10 sm:h-10 rounded-[20px] border-none bg-[rgb(93,93,116)] flex items-center justify-center shadow-[0px_5px_10px_rgba(0,0,0,0.123)] cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.336)] before:content-[''] before:w-[200%] before:h-[200%] before:bg-[rgb(102,102,141)] before:absolute before:z-[1] before:scale-0 before:transition-all before:duration-300 before:rounded-full before:blur-[10px] hover:before:scale-100 after:content-[''] after:w-[20px] after:h-[1.5px] after:absolute after:bottom-[13px] after:-left-[5px] after:bg-white after:rounded-[2px] after:z-[2] after:scale-x-0 after:origin-left after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100 hover:after:left-0 hover:after:origin-right"
                          title="Edit User"
                        >
                          <svg 
                            className="h-[10px] sm:h-[12px] fill-white z-[3] transition-all duration-200 origin-bottom group-hover:rotate-[-15deg] group-hover:translate-x-[5px]" 
                            height="1em" 
                            viewBox="0 0 512 512"
                          >
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(user.id, user.name);
                          }}
                          className="group relative flex h-8 w-8 sm:h-10 sm:w-10 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600 transition-colors"
                          title="Delete User"
                        >
                          <svg 
                            viewBox="0 0 1.625 1.625" 
                            className="absolute -top-7 fill-white delay-100 group-hover:top-4 group-hover:animate-[spin_1.4s] group-hover:duration-1000 transition-all" 
                            height={8} 
                            width={8}
                          >
                            <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195" />
                            <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033" />
                            <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016" />
                          </svg>
                          <svg 
                            width={9} 
                            fill="none" 
                            viewBox="0 0 39 7" 
                            className="origin-right duration-500 group-hover:rotate-90"
                          >
                            <line strokeWidth={4} stroke="white" y2={5} x2={39} y1={5} />
                            <line strokeWidth={3} stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1={12} />
                          </svg>
                          <svg width={9} fill="none" viewBox="0 0 33 39">
                            <mask fill="white" id={`path-1-inside-1_8_19_${user.id}`}>
                              <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                            </mask>
                            <path 
                              mask={`url(#path-1-inside-1_8_19_${user.id})`}
                              fill="white" 
                              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" 
                            />
                            <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
                            <path strokeWidth={4} stroke="white" d="M21 6V29" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-md w-full transform transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-deep-indigo">Confirm Delete</h3>
                <p className="text-xs sm:text-sm text-cool-gray">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-cool-gray mb-6">
              Are you sure you want to delete <span className="font-semibold text-deep-indigo">{deleteModal.userName}</span>? 
              All associated data will be permanently removed.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2.5 rounded-lg border-2 border-light-lavender text-deep-indigo font-semibold hover:bg-soft-lilac transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
