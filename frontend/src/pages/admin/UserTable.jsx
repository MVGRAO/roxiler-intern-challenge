import { mockUsers } from '../../utils/mockData';
// const mockUsers = [
//   { id: 1, name: "Alice", email: "alice@example.com", address: "Hyderabad", role: "user" },
//   { id: 2, name: "Bob", email: "bob@example.com", address: "Bangalore", role: "storeOwner" },
// ];

const UsersTable = () => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold text-lg mb-2">Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.address}</td>
              <td className="p-3">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
