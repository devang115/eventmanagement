import React, { useContext } from 'react';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation(); 
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    // Optionally redirect to home or login page after logout
    navigate('/'); 
  };

  return (
    <nav className="bg-blue-700 py-3 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          EventApp 
        </Link>

        {/* Display "Home" link only on non-home routes */}
        {location.pathname !== '/' && ( 
          <Link to="/" className="text-white ml-6 hover:text-gray-300">
            Home
          </Link>
        )}
        {user && (
          <Link
            to="/create"
            className="text-white ml-6 hover:text-gray-300"
          >
            Create Event
          </Link>
        )}
      </div>

      <div>
        {user ? (
          <>
            <span className="text-white mr-4 hidden md:inline-block"> 
              Welcome, {user.name}
            </span>
            <Link to="/profile" className="text-white mr-4 hover:text-gray-300">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;