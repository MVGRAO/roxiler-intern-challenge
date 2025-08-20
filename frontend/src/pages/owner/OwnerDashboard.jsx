import AverageRating from './AverageRating';
import RatingsTable from './RatingsTable';
import { useEffect, useState } from 'react';
import { storesAPI } from '../../services/api.js';

const OwnerDashboard = () => {
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const mine = await storesAPI.getMyStores();
        if (mine && mine.length) {
          const r = mine[0].rating || 0;
          setAvg(Number(r.toFixed(1)));
        }
      } catch {
        console.log("Something error occured in the OwnerDashboard");
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Store Dashboard</h1>
      {/* Store owners can see the average rating of their store */}
      <AverageRating rating={avg} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Ratings</h2>
        {/* They can also view a list of users who have submitted ratings */}
        <RatingsTable />
      </div>
    </div>
  );
};

export default OwnerDashboard;