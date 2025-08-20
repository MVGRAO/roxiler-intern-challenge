import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import OwnerLayout from './layouts/OwnerLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersTable from './pages/admin/UserTable';
import StoresTable from './pages/admin/StoresTable';
import AdminStats from './pages/admin/AdminStats';

// User Pages
import UserDashboard from './pages/user/UserDashboard';

// Owner Pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import CreateStoreForm from './pages/owner/CreateStoreForm';
import RatingsTable from './pages/owner/RatingsTable';
import AverageRating from './pages/owner/AverageRating';
import ChangePassword from './pages/owner/ChangePassword';

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UsersTable />} />
        <Route path="stores" element={<StoresTable />} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
            <Route
        path="/user"
        element={
          <ProtectedRoute role="USER">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
      </Route>

      <Route
        path="/owner"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OwnerDashboard />} />
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="create-store" element={<CreateStoreForm />} />
        <Route path="ratings" element={<RatingsTable />} />
        <Route path="average-rating" element={<AverageRating />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}

export default App;
