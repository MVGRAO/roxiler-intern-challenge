import { mockStores } from '../../utils/mockData';

const StoresTable = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Address</th>
            <th className="text-left p-3">Rating</th>
          </tr>
        </thead>
        <tbody>
          {mockStores.map(store => (
            // The table lists stores with their Name, Email, Address, and Rating
            <tr key={store.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{store.name}</td>
              <td className="p-3">{store.email}</td>
              <td className="p-3">{store.address}</td>
              <td className="p-3 font-semibold">{store.rating} ★</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoresTable;