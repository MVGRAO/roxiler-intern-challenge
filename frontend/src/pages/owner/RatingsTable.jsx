const mockRatings = [
  { id: 1, userName: 'Bob Smith', rating: 5 },
  { id: 2, userName: 'Diana Prince', rating: 4 },
  { id: 3, userName: 'Clark Kent', rating: 5 },
];

const RatingsTable = () => {
return (
  <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left p-3">User Name</th>
          <th className="text-left p-3">Rating Given</th>
        </tr>
      </thead>
      <tbody>
        {mockRatings.map(review => (
          <tr key={review.id} className="border-b hover:bg-gray-50">
            <td className="p-3">{review.userName}</td>
            <td className="p-3 font-semibold">{review.rating} ★</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default RatingsTable;