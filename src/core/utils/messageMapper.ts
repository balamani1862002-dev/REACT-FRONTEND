// Maps API error messages to user-friendly messages
export const getUserFriendlyMessage = (error: string, context?: string): string => {
  const errorLower = error.toLowerCase();

  // Authentication errors
  if (errorLower.includes('invalid') && (errorLower.includes('email') || errorLower.includes('password'))) {
    return 'The email or password you entered is incorrect. Please try again.';
  }
  if (errorLower.includes('unauthorized') || errorLower.includes('401')) {
    return 'Your session has expired. Please log in again.';
  }
  if (errorLower.includes('forbidden') || errorLower.includes('403')) {
    return 'You do not have permission to perform this action.';
  }
  if (errorLower.includes('user already exists') || errorLower.includes('email already')) {
    return 'An account with this email already exists. Please use a different email or try logging in.';
  }

  // Network errors
  if (errorLower.includes('network') || errorLower.includes('fetch')) {
    return 'Unable to connect to the server. Please check your internet connection and try again.';
  }
  if (errorLower.includes('timeout')) {
    return 'The request took too long. Please try again.';
  }

  // Validation errors
  if (errorLower.includes('required') || errorLower.includes('missing')) {
    return 'Please fill in all required fields.';
  }
  if (errorLower.includes('invalid format') || errorLower.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }

  // Resource errors
  if (errorLower.includes('not found') || errorLower.includes('404')) {
    return context ? `${context} not found. It may have been deleted.` : 'The requested item was not found.';
  }

  // Server errors
  if (errorLower.includes('500') || errorLower.includes('internal server')) {
    return 'Something went wrong on our end. Please try again later.';
  }
  if (errorLower.includes('503') || errorLower.includes('service unavailable')) {
    return 'The service is temporarily unavailable. Please try again in a few moments.';
  }

  // Default fallback
  return error || 'An unexpected error occurred. Please try again.';
};

// Success messages for different operations
export const getSuccessMessage = (operation: string, itemName?: string): string => {
  switch (operation) {
    case 'login':
      return 'Welcome back! You have successfully logged in.';
    case 'signup':
      return 'Account created successfully! Welcome aboard.';
    case 'logout':
      return 'You have been logged out successfully.';
    case 'create':
      return itemName ? `${itemName} created successfully!` : 'Item created successfully!';
    case 'update':
      return itemName ? `${itemName} updated successfully!` : 'Item updated successfully!';
    case 'delete':
      return itemName ? `${itemName} deleted successfully!` : 'Item deleted successfully!';
    case 'save':
      return 'Changes saved successfully!';
    case 'reset':
      return 'Password reset email sent! Please check your inbox.';
    default:
      return 'Operation completed successfully!';
  }
};
