import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// --- THE FIX IS HERE ---
import { useAuth } from '../components/context/AuthContext.jsx';

const ProtectedRoute = () => {
  const { authUser } = useAuth();
  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;