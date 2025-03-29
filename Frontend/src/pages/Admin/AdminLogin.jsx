import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import showToast from "../../components/Popup";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAdminAuth(); // Access the login function from AuthContext

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

    const result = await adminLogin(formData, "admin"); // Pass "admin" to differentiate login types

    if (result.success) {
      showToast("Admin logged in successfully", "success");

      navigate("/admin-home"); // Redirect to admin home page
    } else {
      showToast("Failed to log in", "error");
      setError(result.message); // Display error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
          >
            Admin Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Not an admin?{" "}
          <Link to="/user-login" className="text-blue-600 hover:underline">
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
