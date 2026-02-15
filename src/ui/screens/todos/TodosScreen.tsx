import React, { useState } from 'react';
import { useTodosViewModel } from './TodosScreen.vm';
import { Card } from '../../reusables/Card';
import { Loader } from '../../reusables/Loader';
import { RichTextEditor } from '../../reusables/RichTextEditor';
import { Todo } from '../../../models/todo.model';

export const TodosScreen: React.FC = () => {
  const { state, loading, actions } = useTodosViewModel();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [hasReminder, setHasReminder] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleSubmit = () => {
    if (state.editingTodo) {
      actions.updateTodo(state.editingTodo.id, { 
        title, 
        description,
        hasReminder,
        reminderDate: hasReminder ? reminderDate : undefined,
        isImportant,
      });
    } else {
      actions.createTodo({ 
        title, 
        description,
        hasReminder,
        reminderDate: hasReminder ? reminderDate : undefined,
        isImportant,
      });
    }
    setTitle('');
    setDescription('');
    setReminderDate('');
    setHasReminder(false);
    setIsImportant(false);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null) return;
    actions.reorderTodos(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  const formatReminderDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h1 className="text-3xl font-bold text-deep-indigo">Todos</h1>
        </div>
        <button
          onClick={actions.openModal}
          className="px-4 py-2 bg-gradient-to-r from-royal-purple to-soft-lavender text-white rounded-lg font-medium hover:from-deep-purple hover:to-royal-purple transition-all shadow-md"
        >
          Add Todo
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => actions.setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            state.filter === 'all'
              ? 'bg-gradient-to-r from-royal-purple to-soft-lavender text-white shadow-md'
              : 'bg-white text-deep-indigo hover:bg-light-lavender border border-light-lavender'
          }`}
        >
          All
        </button>
        <button
          onClick={() => actions.setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            state.filter === 'completed'
              ? 'bg-gradient-to-r from-royal-purple to-soft-lavender text-white shadow-md'
              : 'bg-white text-deep-indigo hover:bg-light-lavender border border-light-lavender'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => actions.setFilter('important')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            state.filter === 'important'
              ? 'bg-gradient-to-r from-royal-purple to-soft-lavender text-white shadow-md'
              : 'bg-white text-deep-indigo hover:bg-light-lavender border border-light-lavender'
          }`}
        >
          Important
        </button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.todos.map((todo, index) => (
          <div
            key={todo.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="cursor-move"
          >
            <Card>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cool-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                  <h3 className="font-semibold text-lg text-deep-indigo">{todo.title}</h3>
                  {todo.isImportant && (
                    <svg className="w-5 h-5 text-warm-amber fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={todo.status === 'completed'}
                  onChange={() => actions.toggleStatus(todo)}
                  className="w-5 h-5 text-todo-completed accent-todo-completed cursor-pointer"
                />
              </div>
              <p className="text-cool-gray text-sm mb-2" dangerouslySetInnerHTML={{ __html: todo.description }} />
              
              {todo.hasReminder && todo.reminderDate && (
                <div className="flex items-center gap-2 mb-3 text-sm text-royal-purple">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span>{formatReminderDate(todo.reminderDate)}</span>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    actions.editTodo(todo);
                    setTitle(todo.title);
                    setDescription(todo.description);
                    setHasReminder(todo.hasReminder);
                    setReminderDate(todo.reminderDate || '');
                    setIsImportant(todo.isImportant);
                  }}
                  className="px-4 py-2 bg-soft-lavender text-white rounded-lg font-medium hover:bg-royal-purple transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => actions.deleteTodo(todo.id)}
                  className="px-4 py-2 bg-finance-expense text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {state.isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 border border-light-lavender">
            <div className="flex items-center justify-between p-4 border-b border-light-lavender">
              <h2 className="text-xl font-semibold text-deep-indigo">{state.editingTodo ? 'Edit Todo' : 'Add Todo'}</h2>
              <button onClick={() => {
                actions.closeModal();
                setTitle('');
                setDescription('');
                setReminderDate('');
                setHasReminder(false);
                setIsImportant(false);
              }} className="text-cool-gray hover:text-deep-indigo text-2xl">
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-deep-indigo mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full px-3 py-2 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple text-deep-indigo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-deep-indigo mb-1">Description</label>
                <RichTextEditor
                  value={description}
                  onChange={setDescription}
                  placeholder="Enter description..."
                  className="border border-light-lavender rounded-lg"
                />
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isImportant}
                    onChange={(e) => setIsImportant(e.target.checked)}
                    className="w-4 h-4 text-warm-amber accent-warm-amber"
                  />
                  <svg className="w-5 h-5 text-warm-amber fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-medium text-deep-indigo">Mark as Important</span>
                </label>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasReminder}
                    onChange={(e) => setHasReminder(e.target.checked)}
                    className="w-4 h-4 text-royal-purple accent-royal-purple"
                  />
                  <span className="text-sm font-medium text-deep-indigo">Set Reminder</span>
                </label>
              </div>
              
              {hasReminder && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-deep-indigo mb-1">Reminder Date</label>
                  <input
                    type="datetime-local"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full px-3 py-2 border border-light-lavender rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple text-deep-indigo"
                  />
                </div>
              )}
              
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-gradient-to-r from-royal-purple to-soft-lavender text-white rounded-lg font-medium hover:from-deep-purple hover:to-royal-purple transition-all shadow-md"
              >
                {state.editingTodo ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
