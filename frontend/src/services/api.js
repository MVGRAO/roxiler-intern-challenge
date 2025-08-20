const API_BASE_URL = 'http://localhost:3001';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to set auth token
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: async (userData) => {
    const response = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response;
  },

  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setAuthToken(response.token);
    setCurrentUser(response.user);
    return response;
  },

  logout: () => {
    setAuthToken(null);
    setCurrentUser(null);
  },

  resetUserPassword: async (userId, newPassword) => {
    return await apiRequest(`/admin/users/${userId}/reset-password`, {
      method: 'PUT',
      body: JSON.stringify({ newPassword }),
    });
  },

  updatePassword: async (passwordData) => {
    return await apiRequest('/auth/update-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },
};

// Stores API
export const storesAPI = {
  getAll: async () => {
    return await apiRequest(`/stores`);
  },

  create: async (storeData) => {
    return await apiRequest('/stores', {
      method: 'POST',
      body: JSON.stringify(storeData),
    });
  },

  getMyStores: async () => {
    return await apiRequest('/stores/mine');
  },

  getMyStoreDetails: async (storeId) => {
    return await apiRequest(`/stores/mine/${storeId}`);
  },

  getMyStoreRatings: async (storeId) => {
    return await apiRequest(`/stores/mine/${storeId}/ratings`);
  },
};

// Admin API
export const adminAPI = {
  getStats: async () => {
    return await apiRequest('/admin/stats');
  },

  getUsers: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiRequest(`/admin/users${query ? `?${query}` : ''}`);
  },

  createUser: async (userData) => {
    return await apiRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  updateUser: async (userId, userData) => {
    return await apiRequest(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  deleteUser: async (userId) => {
    return await apiRequest(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  },

  getUserDetails: async (userId) => {
    return await apiRequest(`/admin/users/${userId}`);
  },

  getStores: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await apiRequest(`/admin/stores${query ? `?${query}` : ''}`);
  },

  createStore: async (storeData) => {
    return await apiRequest('/admin/stores', {
      method: 'POST',
      body: JSON.stringify(storeData),
    });
  },

  getStoreDetails: async (storeId) => {
    return await apiRequest(`/admin/stores/${storeId}`);
  },
};

// Ratings API
export const ratingsAPI = {
  create: async (ratingData) => {
    return await apiRequest('/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    });
  },

  update: async (ratingId, ratingData) => {
    return await apiRequest(`/ratings/${ratingId}`, {
      method: 'PUT',
      body: JSON.stringify(ratingData),
    });
  },

  delete: async (ratingId) => {
    return await apiRequest(`/ratings/${ratingId}`, {
      method: 'DELETE',
    });
  },

  getMyRatings: async () => {
    return await apiRequest('/ratings/my-ratings');
  },

  getUserStoreRating: async (storeId, userId) => {
    return await apiRequest(`/ratings/store/${storeId}/user/${userId}`);
  },
};

// Utility functions
export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};
