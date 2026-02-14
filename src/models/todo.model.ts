export interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  isImportant: boolean;
  hasReminder: boolean;
  reminderDate?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  isImportant?: boolean;
  hasReminder?: boolean;
  reminderDate?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
  isImportant?: boolean;
  hasReminder?: boolean;
  reminderDate?: string;
  order?: number;
}
