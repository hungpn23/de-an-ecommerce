import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, PrivateRoutes, PublicRoutes } from './components/index.ts';
import { Add, List, Order } from './pages/index.ts';

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          { path: '/add', element: <Add /> },
          { path: '/list', element: <List /> },
          { path: '/order', element: <Order /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [{ path: '/login', element: <Login /> }],
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
