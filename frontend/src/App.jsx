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

// User Pages
import UserDashboard from './pages/user/UserDashboard';

// Owner Pages
import OwnerDashboard from './pages/owner/OwnerDashboard';

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="System Administrator">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Normal User Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="Normal User">
            <UserLayout>
              <UserDashboard />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* Store Owner Routes */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="Store Owner">
            <OwnerLayout>
              <OwnerDashboard />
            </OwnerLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;