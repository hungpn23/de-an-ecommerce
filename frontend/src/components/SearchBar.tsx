import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { assets } from '../assets/frontend_assets';
import { useLocation } from 'react-router-dom';

export default function SearchBar() {
  const { Search, setSearch, ShowSearch, setShowSearch } = useContext(ShopContext);
  const [Visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return ShowSearch && Visible ? (
    <div className="border-t border-b bg-gray-100 text-center">
      <div className="inline-flex items-center justify-between border border-gray-400 px-5 py-2 my-5 mx-2 rounded-full w-3/4 sm:w-1/2">
        <input
          onChange={e => setSearch(e.target.value)}
          value={Search}
          className="flex-1 outline-none text-sm bg-inherit"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer mx-1"
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null;
}
