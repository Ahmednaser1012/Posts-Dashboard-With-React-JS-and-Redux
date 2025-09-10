// API utility functions with JWT token handling

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Get token from localStorage
const getAuthToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error reading token from localStorage:', error);
    return null;
  }
};

// Create headers with authorization token
const createAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: createAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle unauthorized responses
    if (response.status === 401) {
      // Token might be expired, clear localStorage and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      window.location.href = '/login';
      throw new Error('Unauthorized - Token expired');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Specific API methods
export const api = {
  // GET request
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  
  // POST request
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // PUT request
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // DELETE request
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
  
  // Login request (doesn't require token)
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },
  
  // Refresh token
  refreshToken: async () => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No token available');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }
    
    return response.json();
  },
};

// Token validation utility
export const isTokenValid = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    // Decode JWT payload (basic validation)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token is expired
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// Auto-refresh token utility
export const setupTokenRefresh = (dispatch, refreshAction) => {
  const token = getAuthToken();
  if (!token || !isTokenValid()) return;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiry = expirationTime - currentTime;
    
    // Refresh token 5 minutes before expiry
    const refreshTime = Math.max(timeUntilExpiry - (5 * 60 * 1000), 0);
    
    setTimeout(() => {
      dispatch(refreshAction());
    }, refreshTime);
  } catch (error) {
    console.error('Token refresh setup error:', error);
  }
};

export default api;