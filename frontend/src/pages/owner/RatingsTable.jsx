import { useState, useEffect } from 'react';
import { storesAPI } from '../../services/api';

const RatingsTable = ({ storeId }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      if (!storeId) return;
      
      try {
        setLoading(true);
        const response = await storesAPI.getMyStoreRatings(storeId);
        
        if (response && response.store) {
          const ratingsData = response.store.ratings || [];
          setRatings(ratingsData);
          
          // Calculate average from actual ratings
          if (ratingsData.length > 0) {
            const totalScore = ratingsData.reduce((sum, rating) => sum + rating.score, 0);
            const average = totalScore / ratingsData.length;
            setAverageRating(Number(average.toFixed(1)));
          }
        } else {
          setRatings([]);
          setAverageRating(0);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch ratings');
        console.error('Error fetching ratings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [storeId]);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">User Ratings</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total Ratings: {ratings.length} | Average: {averageRating} ★
        </p>
      </div>
      {ratings.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">User Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Rating Given</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map(rating => (
              <tr key={rating.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{rating.user?.name || 'Anonymous'}</td>
                <td className="p-3 text-sm text-gray-600">{rating.user?.email || 'N/A'}</td>
                <td className="p-3 font-semibold">{rating.score} ★</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-gray-500 text-center py-4">
          No ratings submitted yet for this store
        </div>
      )}
    </div>
  );
};

export default RatingsTable;
