import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// --- THE FIX IS HERE ---
import { useAuth } from '../components/context/AuthContext.jsx';

const PublicRoute = () => {
  const { authUser } = useAuth();
  return authUser ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;