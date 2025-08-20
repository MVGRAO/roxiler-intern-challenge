import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ links, isLoading }) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">Menu</div>
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <nav className="flex-1 px-4">
        <ul>
          {links.map((link) => (
            <li key={link.name} className="mb-2">
              <Link
                to={link.path}
                className={`block px-4 py-2 rounded-md hover:bg-gray-700 ${
                  location.pathname === link.path ? 'bg-gray-700' : ''
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
