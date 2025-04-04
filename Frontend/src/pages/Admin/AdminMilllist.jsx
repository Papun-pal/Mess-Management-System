import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import showToast from "../../components/Popup";

function AdminMilllist() {
  const { admin } = useAdminAuth(); // Get logged-in admin info
  const [mealData, setMealData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealName, setMealName] = useState("");

  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  // Fetch Meal Data
  const fetchMealData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/mealList/meals`, {
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
      });

      const meals = response.data.data || [];
      const formattedMeals = formatMealData(meals);
      setMealData(formattedMeals);
    } catch (error) {
      console.error("Error fetching meal data:", error);
      showToast(error.response?.data?.message || "Failed to fetch meal data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Format Meal Data
  const formatMealData = (meals) => {
    const formatted = {};
    meals.forEach((meal) => {
      const day = meal.day.toLowerCase();
      if (!formatted[day]) {
        formatted[day] = { lunch: "--", dinner: "--" };
      }
      if (meal.mealType === "lunch") {
        formatted[day].lunch = meal.mealName;
      } else if (meal.mealType === "dinner") {
        formatted[day].dinner = meal.mealName;
      }
    });
    return formatted;
  };

  // Add Meal
  const handleAddMeal = async () => {
    if (!day || !mealType || !mealName) {
      return showToast("Please fill all fields to add a meal.", "info");
    }

    try {
      const payload = { day, mealType, mealName };
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/mealList/admin/meals`, payload, {
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
      });

      showToast(response.data.message,"success" );
      fetchMealData(); // Refresh the meal data
      setDay("");
      setMealType("");
      setMealName("");
    } catch (error) {
      console.error("Error adding meal:", error);
    
      
      showToast(error.response?.data?.message || "Meal already exists for the given day and meal type." ,"error");
    }
  };

  // Update Meal
  const handleUpdateMeal = async () => {
    if (!day || !mealType || !mealName) {
      return showToast("Please fill all fields to update a meal.", "info");
    }

    try {
      const payload = { day, mealType, mealName };
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/mealList/admin/meals/update`, payload, {
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
      });

      showToast(response.data.message || "Meal updated successfully!", "success");
      fetchMealData(); // Refresh the meal data
      setDay("");
      setMealType("");
      setMealName("");
    } catch (error) {
      console.error("Error updating meal:", error);
      showToast(error.response?.data?.message || "Failed to update meal. Please try again.", "error");
    }
  };

  // Delete Meal
  const handleDeleteMeal = async () => {
    if (!day || !mealType) {
      return showToast("Please select a day and meal type to delete a meal.", "info");
    }

    try {
      const payload = { day, mealType };
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/mealList/admin/meals/delete`, {
        headers: {
          Authorization: `Bearer ${admin.accessToken}`,
        },
        data: payload,
      });

      showToast(response.data.message || "Meal deleted successfully!", "success");
      fetchMealData(); // Refresh the meal data
      setDay("");
      setMealType("");
    } catch (error) {
      console.error("Error deleting meal:", error);
      showToast(error.response?.data?.message || "Failed to delete meal. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchMealData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-700 p-6">
      <h2 className="text-2xl font-bold text-[#EAEAEA] mb-4">Admin Meal List</h2>

      {/* Input Fields */}
      <div className="bg-gray-600 p-6 shadow rounded w-full max-w-lg mb-6">
        <div className="mb-4">
          <label className="block text-[#EAEAEA] mb-2">Select Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full p-2 border rounded bg-gray-700 text-[#EAEAEA]"
          >
            <option value="">Select Day</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-[#EAEAEA] mb-2">Select Meal Type</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full p-2 border rounded bg-gray-700 text-[#EAEAEA]"
          >
            <option value="">Select Meal Type</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-[#EAEAEA] mb-2">Enter Meal Name</label>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder="Enter Meal Name"
            className="w-full p-2 border rounded bg-gray-700 text-[#EAEAEA]"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleAddMeal}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add Meal
          </button>
          <button
            onClick={handleUpdateMeal}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Meal
          </button>
          <button
            onClick={handleDeleteMeal}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Delete Meal
          </button>
        </div>
      </div>

      {/* Meal List Table */}
      {loading ? (
        <p className="text-[#EAEAEA]">Loading...</p>
      ) : (
        <div className="bg-gray-600 p-6 shadow rounded w-full max-w-lg">
          <table className="w-full text-[#EAEAEA]">
            <thead>
              <tr className="border-b border-[#8F93F6]">
                <th className="text-left py-2">Day</th>
                <th className="text-left py-2">Lunch</th>
                <th className="text-left py-2">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day) => {
                const meal = mealData[day] || { lunch: "--", dinner: "--" };
                return (
                  <tr key={day} className="border-b border-[#8F93F6]">
                    <td className="py-2">{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                    <td className="py-2">{meal.lunch}</td>
                    <td className="py-2">{meal.dinner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminMilllist;