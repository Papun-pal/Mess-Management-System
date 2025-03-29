// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";
// import showToast from "../components/Popup";

// // Create the AuthContext
// const AuthContext = createContext();

// // AuthProvider component to wrap your app
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Store user info (e.g., id, token, etc.)
//   const [loading, setLoading] = useState(true); // Add a loading state

//   // Function to log out the user
//   const logout = async () => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/users/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );

//       // Clear user data from state and localStorage
//       setUser(null);
//       localStorage.removeItem("user");

//       // Optionally navigate to the login page or home page
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   // Load user data from localStorage on app load
//   React.useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false); // Set loading to false after loading user data
//   }, []);

//   // Show a toast notification when loading starts
//   React.useEffect(() => {
//     if (loading) {
//       showToast("Loading user data...", "info");
//     }
//   }, []);

  

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

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

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {!loading && children} {/* Prevent rendering until user data is loaded */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
