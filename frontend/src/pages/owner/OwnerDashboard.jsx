/* eslint-disable no-unused-vars */
import AverageRating from './AverageRating';
import RatingsTable from './RatingsTable';
import { useEffect, useState } from 'react';
import { storesAPI } from '../../services/api.js';

const OwnerDashboard = () => {
  const [avg, setAvg] = useState(0);
  const [storeId, setStoreId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasStore, setHasStore] = useState(false);
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const mine = await storesAPI.getMyStores();
        
        if (mine && mine.length > 0) {
          const store = mine[0];
          setStoreId(store.id);
          setStoreData(store);
          setHasStore(true);
          
          // Calculate average from actual ratings
          if (store.ratings && store.ratings.length > 0) {
            const totalScore = store.ratings.reduce((sum, rating) => sum + rating.score, 0);
            const average = totalScore / store.ratings.length;
            setAvg(Number(average.toFixed(1)));
          } else {
            setAvg(0);
          }
        } else {
          setHasStore(false);
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
        setError(error.message || "Failed to fetch store data");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  // Alternative: Fetch detailed ratings to calculate average
  useEffect(() => {
    if (storeId) {
      const fetchDetailedRatings = async () => {
        try {
          const response = await storesAPI.getMyStoreRatings(storeId);
          if (response && response.store && response.store.ratings) {
            const ratings = response.store.ratings;
            if (ratings.length > 0) {
              const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
              const average = totalScore / ratings.length;
              setAvg(Number(average.toFixed(1)));
            }
          }
        } catch (error) {
          console.error("Error fetching detailed ratings:", error);
        }
      };

      fetchDetailedRatings();
    }
  }, [storeId]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Store Dashboard</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Store Dashboard</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!hasStore) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Store Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-4">No Store Found</h2>
          <p className="text-gray-600 mb-4">
            You don't have any stores yet. Create your first store to start managing ratings.
          </p>
          <a 
            href="/owner/create-store" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Store
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Store Dashboard</h1>
      
      <AverageRating rating={avg} />
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Ratings</h2>
        {storeId && (
          <RatingsTable storeId={storeId} />
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
