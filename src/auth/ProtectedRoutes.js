import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import AuthContext

// Protect function to check if the user is authenticated
export const protect = (Component) => {
  return (props) => {
    const { user } = useContext(AuthContext);

    return user ? <Component {...props} /> : <Navigate to="/login" />;
  };
};

// Authorize roles based on user role
export const authorizeRoles = (...allowedRoles) => {
  return (Component) => {
    return (props) => {
      const { role } = useContext(AuthContext);

      if (allowedRoles.includes(role)) {
        return <Component {...props} />;
      } else {
        return <Navigate to="/" />;
      }
    };
  };
};
