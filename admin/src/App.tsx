import React from 'react';
import { Navbar, Sidebar } from './components';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <>
        <Navbar />
        <hr />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] py-8 text-gray-600 text-base">
            <Routes>
              <Route path="/add"></Route>
            </Routes>
          </div>
        </div>
      </>
    </div>
  );
}
