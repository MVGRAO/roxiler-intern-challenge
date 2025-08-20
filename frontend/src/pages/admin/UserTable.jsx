import { useEffect, useState } from 'react'; 
import CreateUserForm from './CreateUserForm.jsx'; // Import the user creation form
import ChangePasswordModal from './ChangePasswordModal.jsx'; // Import the modal
import { adminAPI } from '../../services/api.js';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', address: '' });

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleFilter, sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        role: roleFilter,
        sortBy,
        sortOrder,
      };
      const data = await adminAPI.getUsers(params);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address || ''
    });
  };

  const handleUpdate = async (userId) => {
    try {
      await adminAPI.updateUser(userId, editForm);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return null;
    return <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search users by name, email, or address..."
          className="flex-1 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="OWNER">Store Owner</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th 
                className="p-3 text-left cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('name')}
              >
                Name <SortIcon column="name" />
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('email')}
              >
                Email <SortIcon column="email" />
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('address')}
              >
                Address <SortIcon column="address" />
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('role')}
              >
                Role <SortIcon column="role" />
              </th>
              <th className="p-3 text-left">Stores</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="p-3">
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-3">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    user.address || 'N/A'
                  )}
                </td>
                <td className="p-3">
                  {editingUser === user.id ? (
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                      className="w-full p-1 border rounded"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="USER">User</option>
                      <option value="OWNER">Store Owner</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                      user.role === 'OWNER' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="p-3">{user.stores?.length || 0}</td>
                <td className="p-3">
                  {editingUser === user.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(user.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
