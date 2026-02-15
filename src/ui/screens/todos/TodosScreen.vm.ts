import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/apiClient';
import { logger } from '../../../core/logger/logger';
import { AppError } from '../../../core/error/AppError';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../../../models/todo.model';
import { useToast } from '../../../core/context/ToastContext';

interface TodosResponse {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
}

export const useTodosViewModel = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'important'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { showToast } = useToast();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      logger.log('TodosVM', 'Fetching todos');
      
      const response = await apiClient.get<TodosResponse>('/todos');
      setTodos(response.todos || []);
      
      logger.log('TodosVM', 'Todos loaded', { count: response.todos?.length || 0 });
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to load todos');
      logger.error('TodosVM', 'Failed to load todos', appError);
      setError(appError.message);
      showToast(appError.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (request: CreateTodoRequest) => {
    try {
      logger.log('TodosVM', 'Creating todo', request);
      
      const newTodo = await apiClient.post<Todo>('/todos', request);
      setTodos([...todos, newTodo]);
      setIsModalOpen(false);
      
      logger.log('TodosVM', 'Todo created successfully');
      showToast('Todo created successfully', 'success');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to create todo');
      logger.error('TodosVM', 'Failed to create todo', appError);
      setError(appError.message);
      showToast(appError.message, 'error');
    }
  };

  const updateTodo = async (id: string, request: UpdateTodoRequest) => {
    try {
      logger.log('TodosVM', 'Updating todo', { id });
      
      const updatedTodo = await apiClient.put<Todo>(`/todos/${id}`, request);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      
      setEditingTodo(null);
      setIsModalOpen(false);
      logger.log('TodosVM', 'Todo updated successfully');
      showToast('Todo updated successfully', 'success');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to update todo');
      logger.error('TodosVM', 'Failed to update todo', appError);
      setError(appError.message);
      showToast(appError.message, 'error');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      logger.log('TodosVM', 'Deleting todo', { id });
      
      await apiClient.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
      
      logger.log('TodosVM', 'Todo deleted successfully');
      showToast('Todo deleted successfully', 'success');
      setError('');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to delete todo');
      logger.error('TodosVM', 'Failed to delete todo', appError);
      setError(appError.message);
      showToast(appError.message, 'error');
    }
  };

  const toggleStatus = async (todo: Todo) => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    await updateTodo(todo.id, { status: newStatus });
  };

  const reorderTodos = async (startIndex: number, endIndex: number) => {
    try {
      const result = Array.from(filteredTodos);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      const reordered = result.map((todo, index) => ({ ...todo, order: index }));
      
      // Update the main todos array
      const updatedTodos = todos.map(todo => {
        const found = reordered.find(t => t.id === todo.id);
        return found || todo;
      });
      
      setTodos(updatedTodos);
      
      // Send reorder request to backend
      await apiClient.put('/todos/reorder', { todos: reordered });
      logger.log('TodosVM', 'Todos reordered');
    } catch (err) {
      const appError = err instanceof AppError ? err : new AppError('Failed to reorder todos');
      logger.error('TodosVM', 'Failed to reorder todos', appError);
      setError(appError.message);
      // Revert on error
      fetchTodos();
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'completed') return todo.status === 'completed';
      if (filter === 'important') return todo.isImportant;
      return true;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    state: {
      todos: filteredTodos,
      filter,
      error,
      isModalOpen,
      editingTodo,
    },
    loading,
    actions: {
      setFilter,
      createTodo,
      updateTodo,
      deleteTodo,
      toggleStatus,
      reorderTodos,
      openModal: () => setIsModalOpen(true),
      closeModal: () => {
        setIsModalOpen(false);
        setEditingTodo(null);
      },
      editTodo: (todo: Todo) => {
        setEditingTodo(todo);
        setIsModalOpen(true);
      },
      clearError: () => setError(''),
    },
  };
};
