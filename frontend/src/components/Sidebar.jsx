import { Link } from 'react-router-dom';

const Sidebar = ({ links }) => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">Menu</div>
      <nav className="flex-1 px-4">
        <ul>
          {links.map((link) => (
            <li key={link.name} className="mb-2">
              <Link
                to={link.path}
                className="block px-4 py-2 rounded-md hover:bg-gray-700"
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