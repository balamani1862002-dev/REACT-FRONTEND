export const appConfig = {
  enableLogging: true,
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  tokenKey: 'auth_token',
};
