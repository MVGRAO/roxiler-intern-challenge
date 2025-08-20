import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const OwnerLayout = () => {
    const ownerLinks = [
        { name: 'Dashboard', path: '/owner/dashboard' },
        { name: 'Create Store', path: '/owner/create-store' },
        { name: 'My Ratings', path: '/owner/ratings' },
        { name: 'Average Rating', path: '/owner/average-rating' },
        { name: 'Change Password', path: '/owner/change-password' },
      ];

  return (
    <div className="flex h-screen bg-gray-100">
        <Sidebar links={ownerLinks} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6 py-8">
                    <Outlet/>
                </div>
            </main>
        </div>
    </div>
  );
};

export default OwnerLayout;
