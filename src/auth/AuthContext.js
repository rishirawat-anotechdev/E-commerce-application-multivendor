import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Check if user is authenticated (on mount)
  useEffect(() => {
    const token = document.cookie.match(/token=([^;]*)/);
    if (token) {
      try {
        const decoded = jwt_decode(token[1]);
        setUser(decoded);
        setRole(decoded.role); // Assuming your JWT contains a `role` field
      } catch (error) {
        console.error('Invalid token');
        setUser(null);
        setRole(null);
      }
    }
  }, []);

  const logout = () => {
    // Clear token and user data
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
