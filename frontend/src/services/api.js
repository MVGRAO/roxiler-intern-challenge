const API_BASE_URL = 'http://localhost:5000/api';

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
      throw new Error(data.error || 'Something went wrong');
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
    const response = await apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    setAuthToken(response.token);
    return response;
  },

  login: async (credentials) => {
    const response = await apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setAuthToken(response.token);
    return response;
  },

  logout: () => {
    setAuthToken(null);
  },

  getProfile: async () => {
    return await apiRequest('/users/profile');
  },

  updateProfile: async (profileData) => {
    return await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Stores API
export const storesAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/stores?${queryString}`);
  },

  getById: async (id) => {
    return await apiRequest(`/stores/${id}`);
  },

  create: async (storeData) => {
    return await apiRequest('/stores', {
      method: 'POST',
      body: JSON.stringify(storeData),
    });
  },

  update: async (id, storeData) => {
    return await apiRequest(`/stores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(storeData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/stores/${id}`, {
      method: 'DELETE',
    });
  },

  getMyStores: async () => {
    return await apiRequest('/stores/owner/my-stores');
  },
};

// Ratings API
export const ratingsAPI = {
  getStoreRatings: async (storeId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/ratings/store/${storeId}?${queryString}`);
  },

  create: async (ratingData) => {
    return await apiRequest('/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    });
  },

  update: async (id, ratingData) => {
    return await apiRequest(`/ratings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ratingData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/ratings/${id}`, {
      method: 'DELETE',
    });
  },

  getMyRatings: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/ratings/user/my-ratings?${queryString}`);
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
