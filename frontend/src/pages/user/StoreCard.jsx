import { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            onClick={() => setRating(starValue)}
            className={`w-6 h-6 cursor-pointer ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      })}
    </div>
  );
};

const StoreCard = ({ store }) => {
  // Mock state for user's rating
  const [userRating, setUserRating] = useState(null); 

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{store.name}</h3>
        <p className="text-gray-600 mb-2">{store.address}</p>
        <p className="text-lg font-semibold mb-4">Overall Rating: {store.rating} ★</p>
      </div>
      <div>
        <hr className="my-4"/>
        <h4 className="font-semibold mb-2">Your Rating</h4>
        {userRating && <p className="text-gray-700 mb-2">You rated this store: {userRating} ★</p>}
        {/* Allows users to submit or modify their rating */}
        <StarRating rating={userRating} setRating={setUserRating} />
      </div>
    </div>
  );
};

export default StoreCard;