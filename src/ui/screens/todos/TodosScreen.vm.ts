import { useState, useEffect } from 'react';
import { logger } from '../../../core/logger/logger';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../../../models/todo.model';
import { mockTodos, mockDelay } from '../../../core/mock/mockData';

export const useTodosViewModel = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'important'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      logger.log('TodosVM', 'Fetching todos');
      
      await mockDelay(500);
      const todosWithOrder = mockTodos.map((todo, index) => ({ ...todo, order: index }));
      setTodos(todosWithOrder);
      
      logger.log('TodosVM', 'Todos loaded');
      setError('');
    } catch (err) {
      logger.error('TodosVM', 'Failed to load todos', err);
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (request: CreateTodoRequest) => {
    try {
      logger.log('TodosVM', 'Creating todo');
      
      await mockDelay(300);
      const newTodo: Todo = {
        id: Date.now().toString(),
        ...request,
        status: 'pending',
        isImportant: request.isImportant || false,
        hasReminder: request.hasReminder || false,
        reminderDate: request.reminderDate,
        order: todos.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setTodos([...todos, newTodo]);
      setIsModalOpen(false);
      logger.log('TodosVM', 'Todo created');
      setError('');
    } catch (err) {
      logger.error('TodosVM', 'Failed to create todo', err);
      setError('Failed to create todo');
    }
  };

  const updateTodo = async (id: string, request: UpdateTodoRequest) => {
    try {
      logger.log('TodosVM', 'Updating todo', { id });
      
      await mockDelay(300);
      setTodos(todos.map(todo => 
        todo.id === id 
          ? { ...todo, ...request, updatedAt: new Date().toISOString() }
          : todo
      ));
      
      setEditingTodo(null);
      setIsModalOpen(false);
      logger.log('TodosVM', 'Todo updated');
      setError('');
    } catch (err) {
      logger.error('TodosVM', 'Failed to update todo', err);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      logger.log('TodosVM', 'Deleting todo', { id });
      
      await mockDelay(300);
      setTodos(todos.filter(todo => todo.id !== id));
      
      logger.log('TodosVM', 'Todo deleted');
      setError('');
    } catch (err) {
      logger.error('TodosVM', 'Failed to delete todo', err);
      setError('Failed to delete todo');
    }
  };

  const toggleStatus = async (todo: Todo) => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    await updateTodo(todo.id, { status: newStatus });
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
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
