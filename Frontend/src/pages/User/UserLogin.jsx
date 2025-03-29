import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import showToast from "../../components/Popup";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // State to store error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData); // Call the login function from AuthContext

    if (result.success) {
      
      showToast("Login successful!", "success");
      navigate("/userhome"); // Redirect to user home page
    } else {
      setError(result.message);
      showToast("Id Password Does Not Match!", "error"); // Display error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        
        <p className="text-center mt-4 text-sm font-semibold">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-center mt-2 text-sm ">
          Not an User?{" "}
          <Link to="/admin-login" className="text-blue-600 hover:underline ">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
