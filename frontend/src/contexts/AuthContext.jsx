/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, getCurrentUser, setCurrentUser, isAuthenticated } from '../services/api.js';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize from localStorage if token and user exist
    try {
      if (isAuthenticated()) {
    const stored = getCurrentUser();
    console.log("Stored user:", stored);
        if (stored) {
          setUser(stored);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    setUser(response.user);
    console.log("User role after login:", response.user.role);
    setCurrentUser(response.user);
    return response;
  };

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    return response;
  };

  const logout = () => {
    authAPI.logout();
    setCurrentUser(null);
    setUser(null);
  };

  const updateProfile = async (_profileData) => {
    throw new Error('Not implemented');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
