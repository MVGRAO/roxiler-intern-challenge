import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api.js';

const StoresTable = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchStores();
  }, [searchTerm, sortBy, sortOrder]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        sortBy,
        sortOrder,
      };
      const data = await adminAPI.getStores(params);
      setStores(data);
    } catch (error) {
      console.error('Error fetching stores:', error);
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

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return null;
    return <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
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
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search stores by name, email, or address..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th 
                className="text-left p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('name')}
              >
                Name <SortIcon column="name" />
              </th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('email')}
              >
                Email <SortIcon column="email" />
              </th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('address')}
              >
                Address <SortIcon column="address" />
              </th>
              <th 
                className="text-left p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('rating')}
              >
                Rating <SortIcon column="rating" />
              </th>
              <th className="text-left p-3">Owner</th>
              <th className="text-left p-3">Total Ratings</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{store.name}</td>
                <td className="p-3">{store.email}</td>
                <td className="p-3">{store.address}</td>
                <td className="p-3 font-semibold">{store.rating} ★</td>
                <td className="p-3">{store.owner?.name || 'N/A'}</td>
                <td className="p-3">{store._count?.ratings || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoresTable;
