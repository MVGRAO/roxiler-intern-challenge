import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  validateName,
  validatePassword,
  validateEmail,
  validateAddress,
} from "../../utils/validation.js";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Save user to localStorage (mock signup)
    const newUser = {
      name: data.name,
      email: data.email,
      address: data.address,
      password: data.password,
      role: data.role,
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Signup successful!");

    // Redirect based on role
    if (newUser.role === "System Administrator") navigate("/admin");
    else if (newUser.role === "Store Owner") navigate("/owner");
    else navigate("/user"); // Normal User
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              {...register("name", { validate: validateName })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              {...register("email", { validate: validateEmail })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <textarea
              {...register("address", { validate: validateAddress })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.address ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { validate: validatePassword })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-gray-700">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.role ? "border-red-500" : ""
              }`}
            >
              <option value="Normal User">Normal User</option>
              <option value="Store Owner">Store Owner</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
