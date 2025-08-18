import StoreList from './StoreList';

const UserDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Registered Stores</h1>
      {/* Normal users can view a list of all registered stores */}
      <StoreList />
    </div>
  );
};

export default UserDashboard;