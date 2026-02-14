import { User, AuthResponse } from '../../models/auth.model';
import { Todo } from '../../models/todo.model';
import { Transaction, TransactionSummary } from '../../models/transaction.model';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, New York, NY',
    profileImage: '',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    address: '456 Oak Ave, Los Angeles, CA',
    profileImage: '',
    role: 'user',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1234567892',
    address: '789 Admin Blvd, Chicago, IL',
    profileImage: '',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z',
  },
];

// Mock Todos
export const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the MVVM architecture',
    status: 'pending',
    isImportant: true,
    hasReminder: true,
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests from team members',
    status: 'completed',
    isImportant: false,
    hasReminder: false,
    createdAt: '2026-02-09T10:00:00Z',
    updatedAt: '2026-02-12T10:00:00Z',
  },
  {
    id: '3',
    title: 'Update dependencies',
    description: 'Update all npm packages to latest versions',
    status: 'pending',
    isImportant: true,
    hasReminder: true,
    createdAt: '2026-02-11T10:00:00Z',
    updatedAt: '2026-02-11T10:00:00Z',
  },
  {
    id: '4',
    title: 'Fix login bug',
    description: 'Resolve the authentication issue reported by users',
    status: 'completed',
    isImportant: true,
    hasReminder: false,
    createdAt: '2026-02-08T10:00:00Z',
    updatedAt: '2026-02-13T10:00:00Z',
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  // 2024 Transactions
  {
    id: '1',
    type: 'income',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    description: 'Monthly apartment rent',
    date: '2024-01-20T10:00:00Z',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    type: 'expense',
    amount: 150,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    date: '2024-02-05T10:00:00Z',
    createdAt: '2024-02-05T10:00:00Z',
  },
  {
    id: '4',
    type: 'income',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2024-02-15T10:00:00Z',
    createdAt: '2024-02-15T10:00:00Z',
  },
  {
    id: '5',
    type: 'expense',
    amount: 800,
    category: 'Utilities',
    description: 'Electricity and water bill',
    date: '2024-03-10T10:00:00Z',
    createdAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '6',
    type: 'income',
    amount: 1500,
    category: 'Freelance',
    description: 'Website design project',
    date: '2024-04-07T10:00:00Z',
    createdAt: '2024-04-07T10:00:00Z',
  },
  {
    id: '7',
    type: 'expense',
    amount: 2000,
    category: 'Travel',
    description: 'Vacation expenses',
    date: '2024-05-20T10:00:00Z',
    createdAt: '2024-05-20T10:00:00Z',
  },
  {
    id: '8',
    type: 'income',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2024-06-15T10:00:00Z',
    createdAt: '2024-06-15T10:00:00Z',
  },
  {
    id: '9',
    type: 'expense',
    amount: 500,
    category: 'Healthcare',
    description: 'Medical checkup',
    date: '2024-07-10T10:00:00Z',
    createdAt: '2024-07-10T10:00:00Z',
  },
  {
    id: '10',
    type: 'expense',
    amount: 300,
    category: 'Entertainment',
    description: 'Movie and dinner',
    date: '2024-08-12T10:00:00Z',
    createdAt: '2024-08-12T10:00:00Z',
  },

  // 2025 Transactions
  {
    id: '11',
    type: 'income',
    amount: 5500,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2025-01-15T10:00:00Z',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '12',
    type: 'expense',
    amount: 1300,
    category: 'Rent',
    description: 'Monthly apartment rent',
    date: '2025-01-20T10:00:00Z',
    createdAt: '2025-01-20T10:00:00Z',
  },
  {
    id: '13',
    type: 'expense',
    amount: 200,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    date: '2025-02-05T10:00:00Z',
    createdAt: '2025-02-05T10:00:00Z',
  },
  {
    id: '14',
    type: 'income',
    amount: 5500,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2025-02-15T10:00:00Z',
    createdAt: '2025-02-15T10:00:00Z',
  },
  {
    id: '15',
    type: 'expense',
    amount: 900,
    category: 'Utilities',
    description: 'Electricity and water bill',
    date: '2025-03-10T10:00:00Z',
    createdAt: '2025-03-10T10:00:00Z',
  },
  {
    id: '16',
    type: 'income',
    amount: 2000,
    category: 'Freelance',
    description: 'Mobile app development',
    date: '2025-04-07T10:00:00Z',
    createdAt: '2025-04-07T10:00:00Z',
  },
  {
    id: '17',
    type: 'expense',
    amount: 1500,
    category: 'Shopping',
    description: 'New laptop purchase',
    date: '2025-05-20T10:00:00Z',
    createdAt: '2025-05-20T10:00:00Z',
  },
  {
    id: '18',
    type: 'income',
    amount: 5500,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2025-06-15T10:00:00Z',
    createdAt: '2025-06-15T10:00:00Z',
  },
  {
    id: '19',
    type: 'expense',
    amount: 400,
    category: 'Healthcare',
    description: 'Dental treatment',
    date: '2025-07-10T10:00:00Z',
    createdAt: '2025-07-10T10:00:00Z',
  },
  {
    id: '20',
    type: 'income',
    amount: 3000,
    category: 'Bonus',
    description: 'Performance bonus',
    date: '2025-08-12T10:00:00Z',
    createdAt: '2025-08-12T10:00:00Z',
  },
  {
    id: '21',
    type: 'expense',
    amount: 600,
    category: 'Education',
    description: 'Online course subscription',
    date: '2025-09-15T10:00:00Z',
    createdAt: '2025-09-15T10:00:00Z',
  },
  {
    id: '22',
    type: 'income',
    amount: 5500,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2025-10-15T10:00:00Z',
    createdAt: '2025-10-15T10:00:00Z',
  },
  {
    id: '23',
    type: 'expense',
    amount: 800,
    category: 'Entertainment',
    description: 'Concert tickets',
    date: '2025-11-12T10:00:00Z',
    createdAt: '2025-11-12T10:00:00Z',
  },
  {
    id: '24',
    type: 'income',
    amount: 5500,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2025-12-15T10:00:00Z',
    createdAt: '2025-12-15T10:00:00Z',
  },

  // 2026 Transactions
  {
    id: '25',
    type: 'income',
    amount: 6000,
    category: 'Salary',
    description: 'Monthly salary payment',
    date: '2026-01-15T10:00:00Z',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '26',
    type: 'expense',
    amount: 1400,
    category: 'Rent',
    description: 'Monthly apartment rent',
    date: '2026-01-20T10:00:00Z',
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: '27',
    type: 'expense',
    amount: 180,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    date: '2026-02-05T10:00:00Z',
    createdAt: '2026-02-05T10:00:00Z',
  },
  {
    id: '28',
    type: 'income',
    amount: 500,
    category: 'Freelance',
    description: 'Website design project',
    date: '2026-02-07T10:00:00Z',
    createdAt: '2026-02-07T10:00:00Z',
  },
  {
    id: '29',
    type: 'expense',
    amount: 80,
    category: 'Utilities',
    description: 'Electricity bill',
    date: '2026-02-10T10:00:00Z',
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: '30',
    type: 'expense',
    amount: 200,
    category: 'Entertainment',
    description: 'Concert tickets',
    date: '2026-02-12T10:00:00Z',
    createdAt: '2026-02-12T10:00:00Z',
  },
];

// Mock Transaction Summary
export const mockTransactionSummary: TransactionSummary = {
  totalIncome: 6500,
  totalExpense: 1860,
  currentBalance: 4640,
};

// Mock API delay
export const mockDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock Auth Response
export const mockAuthResponse = (user: User): AuthResponse => ({
  token: `mock_token_${user.id}_${Date.now()}`,
  user,
});

// Find user by email
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Validate credentials
export const validateCredentials = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  
  if (!user) {
    return null;
  }

  // Mock password validation - accept specific passwords for each user
  const validPasswords: Record<string, string> = {
    'john@example.com': 'user123',
    'jane@example.com': 'user123',
    'admin@example.com': 'admin123',
  };

  const expectedPassword = validPasswords[email.toLowerCase()];
  
  if (password === expectedPassword) {
    return user;
  }

  return null;
};
