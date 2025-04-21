import React, { createContext, useContext, useState } from "react";
import axios from "axios";



// Create AdminAuthContext
const AdminAuthContext = createContext();

// AdminAuthProvider component
export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // Store admin info (e.g., id, token, etc.)
  const [loading, setLoading] = useState(true);
  // console.log(admin);
 

  // Function to log in the admin
  const adminLogin = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`, // Admin login API
        formData,
        {
          withCredentials: true,
        }
      );
      
      
      // Extract admin details from response
      const { admin, accessToken, refreshToken } = response.data.data;
      // console.log(response.data.data);
      const adminData = {
        id: admin._id,
        adminname: admin.adminname,
        email: admin.email,
        accessToken,
        refreshToken,
      };

      setAdmin(adminData);
      localStorage.setItem("admin", JSON.stringify(adminData));
      
      return { success: true };
      
    } catch (error) {
      console.error("Admin Login Error:", error);

      if (error.response?.data?.message) {
        return { success: false, message: error.response.data.message };
      } else {
        return { success: false, message: "Admin login failed. Please try again." };
      }
    }
  };

  // Function to log out the admin
  const adminLogout = async (navigate) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/logout`, // Admin logout API
        {},
        { withCredentials: true }
      );

      setAdmin(null);
      localStorage.removeItem("admin");
    
      window.location.href = "/login";
    } catch (error) {
      console.error("Admin Logout Error:", error);
    }
  };

  // Load admin data from localStorage when the app starts
  React.useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false); // Mark loading as complete
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin, adminLogin, adminLogout }}>
      {!loading && children} {/* Prevent rendering until loading is complete */}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use the AdminAuthContext
export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
