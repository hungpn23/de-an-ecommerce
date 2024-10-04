import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  let token = localStorage.getItem('access_token');

  return token ? <Outlet /> : <Navigate to="/login" />;
}
