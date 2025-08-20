import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

   
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const role = login(email, password); // Mock login
      if (role === 'System Administrator') navigate('/admin');
      else if (role === 'Normal User') navigate('/user');
      else if (role === 'Store Owner') navigate('/owner');
      else alert('User not found!');
    } catch (error) {
        console.error("Login failed:", error);
        alert('An error occurred. Please try again.');
    } finally {
        setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <fieldset disabled={isLoading}> {/* Disable form elements when loading */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-200"
                defaultValue="user@example.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-200"
                defaultValue="password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </fieldset>
        </form>
        <p className="text-sm text-center mt-4">
          Login as: <strong>admin@example.com</strong>, <strong>user@example.com</strong>, or <strong>owner@example.com</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;