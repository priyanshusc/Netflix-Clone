// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; // Import useAuth to get user info

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Check for user and if their email is verified
  if (!user || !user.emailVerified) {
    return <Navigate to="/login" />;
  }
  return children;
};