import { useState, useEffect } from "react";

// Mock user data. In a real app, this would come from an API or database.
const MOCK_USERS = {
  "admin@example.com": { name: "Admin User", role: "System Administrator", password: "admin123" },
  "user@example.com": { name: "Normal User", role: "Normal User", password: "user123" },
  "owner@example.com": { name: "Store Owner", role: "Store Owner", password: "owner123" },
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login with email + password
  const login = (email, password) => {
    const userToLogin = MOCK_USERS[email];
    if (userToLogin && userToLogin.password === password) {
      const userData = { email, ...userToLogin };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return userData.role;
    }
    return null; // invalid credentials
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, loading, login, logout };
};

export default useAuth;
