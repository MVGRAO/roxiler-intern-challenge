import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children }) => {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Users', path: '#' },
    { name: 'Stores', path: '#' },
    { name: 'Settings', path: '#' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar links={adminLinks} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;