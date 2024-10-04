import { Navbar, Sidebar } from './components';
import { Outlet } from 'react-router-dom';

export const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] py-8 text-gray-600 text-base">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
