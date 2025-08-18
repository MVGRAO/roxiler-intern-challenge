const AdminStats = () => {
  const stats = [
    { label: 'Total Users', value: 150 },
    { label: 'Total Stores', value: 30 },
    { label: 'Total Ratings Submitted', value: 450 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
