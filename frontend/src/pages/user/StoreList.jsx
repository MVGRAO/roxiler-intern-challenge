import { useEffect, useState } from 'react';
import { storesAPI } from '../../services/api.js';
import StoreCard from './StoreCard.jsx';

const StoreList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await storesAPI.getAll();
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
        alert('Failed to fetch stores. Please try again later.');
        setLoading(false);
      }
    })();
  }, []);
  
  console.log("Stores fetched:", stores);
  console.log("Loading state:", loading);
  
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Store Name or Address..."
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <div>Loading stores...</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map(store => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
      )}
    </div>
  );
};

export default StoreList;
