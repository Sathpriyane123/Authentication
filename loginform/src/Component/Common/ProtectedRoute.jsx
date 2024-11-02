// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/" replace />;
  }

  // If authenticated and trying to access the login page, redirect to the dashboard
  if (location.pathname === '/') {
    return user.isAdmin ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/user/dashboard" replace />
    );
  }

  return children; // Render the protected content if authenticated
};

export default ProtectedRoute;
