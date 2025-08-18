import { useState } from 'react';
import { mockStores } from '../../utils/mockData';
// import StoreCard from './StoreCard.jsx';
import StoreCard from './Storecard';

const StoreList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = mockStores.filter(store =>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map(store => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreList;