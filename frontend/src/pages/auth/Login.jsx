/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email)
    console.log(password)
    try {
      console.log("logging in")
      const { user } = await login({ email, password });
      console.log(user)
      if (user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'OWNER') navigate('/owner');
      else navigate('/user');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg"
                defaultValue="user@example.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg"
                defaultValue="password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Do not have account?{" "}
            <Link to={'/signup'} className="text-blue-500">
              SignUp
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;
