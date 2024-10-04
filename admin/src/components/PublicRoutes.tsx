import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoutes() {
  let token = localStorage.getItem('access_token');

  return token ? <Navigate to="/" /> : <Outlet />;
}
