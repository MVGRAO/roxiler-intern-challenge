import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Stores', path: '/admin/stores' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar links={adminLinks} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet /> {/* This enables nested routing */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
