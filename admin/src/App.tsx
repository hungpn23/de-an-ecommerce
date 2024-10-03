import React, { useState } from 'react';
import { Login, Navbar, Sidebar } from './components';
import { Route, Routes } from 'react-router-dom';
import { Add, List, Order } from './pages';

export const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function App() {
  const [Token, setToken] = useState('');

  return (
    <div className="bg-gray-50 min-h-screen">
      {Token === '' ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] py-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/order" element={<Order />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
