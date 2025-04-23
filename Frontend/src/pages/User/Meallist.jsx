import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import showToast from "../../components/Popup";

function Meallist() {
   const { user } = useAuth(); 
  const [mealData, setMealData] = useState([]);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  const fetchMealData = async () => {
    setLoading(true);
    try {
      const token = user?.accessToken; // Retrieve token from localStorage
      if (!token) {
       showToast("Please log in to view meal data.", "info");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/mealList/meals`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    fetchMealData();
  }, []);

  return (
    <div className="min-h-[74vh] flex flex-col items-center bg-gray-700 p-6">
      <h2 className="text-2xl font-bold text-[#EAEAEA] mb-4">Meal List</h2>

      {loading ? (
        <p className="text-[#EAEAEA]">Loading...</p>
      ) : (
        <div className="bg-[#1E1E2E] p-6 shadow rounded w-full max-w-lg">
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

export default Meallist;