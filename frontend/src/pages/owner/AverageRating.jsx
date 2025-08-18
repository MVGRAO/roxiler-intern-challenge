const AverageRating = ({ rating }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow inline-block">
      <h3 className="text-gray-500 font-medium">Average Store Rating</h3>
      <p className="text-4xl font-bold mt-2">{rating} <span className="text-yellow-400">★</span></p>
    </div>
  );
};

export default AverageRating;