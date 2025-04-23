import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import showToast from "../../components/Popup";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(formData);

    if (result.success) {
      showToast("Login successful!", "success");
      navigate("/userhome");
    } else {
      setError(result.message);
      showToast("Id Password Does Not Match!", "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[76vh] flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">User Login</h2>
          <p className="text-white/80">Enter your credentials to continue</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-6 text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
              isLoading
                ? "bg-purple-700 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/20"
            } flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-white/70 text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="underline hover:text-white underline-offset-4">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            Not a User?{" "}
            <Link to="/admin-login" className="underline hover:text-white underline-offset-4">
              Admin Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
