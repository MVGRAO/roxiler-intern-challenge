import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Store Ratings Platform</h1>
        <div className="flex items-center">
          {user && <span className="text-gray-700 mr-4">Welcome, {user.name}</span>}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;