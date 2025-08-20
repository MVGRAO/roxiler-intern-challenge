import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <div className="container mx-auto px-6 py-8">
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default UserLayout;