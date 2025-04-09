import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Mess Management
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please select your login type to continue.
        </p>

        <div className="flex flex-col gap-6">
          {/* User Login */}
          <Link
            to="/user-login"
            className="block text-center bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            User Login
          </Link>

          {/* Admin Login */}
          <Link
            to="/admin-login"
            className="block text-center bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;