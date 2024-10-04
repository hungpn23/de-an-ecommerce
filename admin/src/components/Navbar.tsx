import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/admin_assets';

export default function Navbar() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} className="w-[max(10%,80px)]" alt="" />
      <button
        onClick={handleOnClick}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
}
