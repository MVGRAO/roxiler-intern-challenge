import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log("User role:", user.role);
  if (role && user.role !== role) {
    // Redirect to a default page if role doesn't match
    // For simplicity, we redirect to login, but you can have a dedicated "Unauthorized" page.
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;