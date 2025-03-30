import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import showToast from "../components/Popup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on app load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Run only once when the component mounts

  // Save user data in localStorage when user state updates
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Function to log out the user
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);
      localStorage.removeItem("user");

      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Logout Error:", error);
      showToast("Logout failed!", "error");
    }
  };

  // Function to log in the user
  const login = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        formData,
        {
          withCredentials: true, // Enable cookies
        }
      );

      const { user, accessToken } = response.data.data;
      setUser({ ...user, accessToken });
      localStorage.setItem("user", JSON.stringify({ ...user, accessToken }));

      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, login }}>
      {!loading && children} {/* Prevent rendering until user data is loaded */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
