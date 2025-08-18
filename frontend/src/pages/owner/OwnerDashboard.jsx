import AverageRating from './AverageRating';
import RatingsTable from './RatingsTable';

const OwnerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Store Dashboard</h1>
      {/* Store owners can see the average rating of their store */}
      <AverageRating rating={4.8} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Ratings</h2>
        {/* They can also view a list of users who have submitted ratings */}
        <RatingsTable />
      </div>
    </div>
  );
};

export default OwnerDashboard;