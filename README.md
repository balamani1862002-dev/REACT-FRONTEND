# Money Manager - React + TypeScript MVVM Application

A production-ready web application built with React, TypeScript, and MVVM architecture for managing todos and tracking finances.

## Tech Stack

- React 19 with TypeScript
- Tailwind CSS for styling
- Axios for API calls
- React Router for navigation
- @dnd-kit for drag and drop
- React Quill for rich text editing
- Recharts for data visualization

## Architecture

This application follows **MVVM (Model-View-ViewModel)** architecture:

- **Model**: API calls, DTOs, types
- **View**: Pure UI components
- **ViewModel**: Business logic and state management
- **Core**: Logger, API client, Error handling
- **Reusables**: Shared UI components

## Folder Structure

```
src/
├── core/
│   ├── api/          # Axios instance and API client
│   ├── error/        # Error boundary and AppError class
│   ├── logger/       # Centralized logger
│   └── config/       # App configuration
├── ui/
│   ├── components/   # Layout components (Navbar)
│   ├── reusables/    # Reusable UI components
│   └── screens/      # Feature screens with MVVM pattern
├── models/           # TypeScript interfaces and types
└── routes/           # Route configuration
```

## Features

### Authentication
- User signup and login
- JWT token management
- Protected routes
- Admin login (hidden route at `/admin-login`)

### Dashboard
- Overview of todos and finances
- Key metrics display
- Quick navigation

### Todo Management
- Create, edit, delete todos
- Rich text editor for descriptions
- Drag and drop organization
- Filter by status and importance
- Mark as completed

### Money Tracking
- Add income and expenses
- Transaction history
- View by daily, weekly, monthly, yearly
- Current balance calculation
- Category-based tracking

### Profile Management
- Edit user information
- Upload profile image
- Update contact details

### Admin Panel
- User management
- Delete users
- Impersonate users (view as user)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## MVVM Pattern

Each feature follows this structure:

```
screens/[feature]/
├── [Feature]Screen.tsx      # View (UI only)
└── [Feature]Screen.vm.ts    # ViewModel (logic)
```

### View Rules
- No business logic
- No API calls
- Only receives data from ViewModel
- Uses Tailwind CSS only

### ViewModel Rules
- Exports a custom hook
- Handles state management
- Makes API calls
- Contains validation logic
- Returns state, loading, and actions

## Core Features

### Centralized Logger
- Enable/disable logging via config
- Module-based logging
- Never logs sensitive data

### Error Handling
- AppError class for standardized errors
- ErrorBoundary for UI crash protection
- Try/catch in all async operations

### API Layer
- Centralized Axios instance
- Automatic JWT token attachment
- Global error handling
- Request/response interceptors

## Production Safety

- No `console.log` in production (use logger)
- Environment variables for configuration
- Secure token storage
- TypeScript strict mode
- No `any` types
- Proper error handling

## Available Routes

- `/login` - User login
- `/signup` - User registration
- `/admin-login` - Admin login (hidden)
- `/welcome` - Welcome page for new users
- `/dashboard` - Main dashboard
- `/todos` - Todo management
- `/money` - Money tracking
- `/profile` - User profile
- `/admin` - Admin panel (protected)

## Development Guidelines

1. Follow MVVM architecture strictly
2. Keep Views under 100 lines
3. Use try/catch for all async operations
4. Log all important actions
5. Use Tailwind CSS only
6. Create reusable components for repeated UI
7. Use TypeScript interfaces for all data structures

## License

MIT
