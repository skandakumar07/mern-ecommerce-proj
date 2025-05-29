// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ user, children, adminOnly = false }) {
  const location = useLocation();

  if (!user) {
    toast.info('Please log in to continue');
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }
  if (adminOnly && !user.isAdmin) {
  toast.error("Access denied. Admins only.");
  return <Navigate to="/" />;
}

  return children;
}
