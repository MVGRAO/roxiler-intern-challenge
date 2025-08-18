import AdminStats from './AdminStats';
import UsersTable from './UserTable.jsx';
import StoresTable from './StoresTable.jsx';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* The dashboard displays key statistics */}
      <AdminStats /> 

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        {/* Admins can view a list of normal and admin users */}
        <UsersTable />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Store Management</h2>
        {/* Admins can view a list of stores */}
        <StoresTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
