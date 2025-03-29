import React, { useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import showToast from "../../components/Popup";

const AdminWeeklyfund = () => {
  const { admin } = useAdminAuth(); // Get logged-in admin info
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [totalFund, setTotalFund] = useState("");
  const [fundData, setFundData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    userId: "",
    amount: "",
  });

  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Set Total Weekly Fund
  const setTotalWeeklyFund = async () => {
    if (!month || !week || !totalFund) {
      return showToast("Please fill all fields to set the total weekly fund.", "info");
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/weeklyFund/admin/weekly-fund/set/${monthNames[month]}/${week}`;
      const payload = { amount: totalFund };

      await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${admin.accessToken}` },
      });

      showToast("Total weekly fund set successfully!", "success");

      // Clear input fields
      setMonth("");
      setWeek("");
      setTotalFund("");
    } catch (error) {
      console.error("Error setting total weekly fund:", error);
      showToast(error.response?.data?.message || "Failed to set total weekly fund. Please try again.", "error");
    }
  };

  // Delete Weekly Fund
  const deleteWeeklyFund = async () => {
    if (!month || !week) {
      return showToast("Please select a month and week to delete the weekly fund.", "info");
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/weeklyFund/admin/weekly-fund/delete/${monthNames[month]}/${week}`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${admin.accessToken}` },
      });

      showToast(`Weekly fund for ${monthNames[month]} (Week ${week}) has been deleted successfully!`, "success");

      // Clear input fields
      setMonth("");
      setWeek("");
      setTotalFund("");
      setFundData([]);
    } catch (error) {
      console.error("Error deleting weekly fund:", error);
      showToast(error.response?.data?.message || "Failed to delete weekly fund. Please try again.", "error");
    }
  };

  // Fetch All User Weekly Fund Details
  const fetchUserWeeklyFunds = async () => {
    if (!month || !week) {
      return showToast("Please select a month and week.", "info");
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/weeklyFund/weekly-fund/${monthNames[month]}/${week}`,
        { headers: { Authorization: `Bearer ${admin.accessToken}` } }
      );
      setFundData(response.data.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weekly fund details:", error);
     
     
        showToast(error.response?.data?.message || "No weekly fund record found for this month and week.", "info");
      
      
      setLoading(false);
    }
  };

  // Update User Weekly Fund
  const updateUserWeeklyFund = async () => {
    const { userId, amount } = updateData;
    if (!userId || !amount) {
      return showToast("Please fill all fields to update the weekly fund.", "info");
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/weeklyFund/admin/weekly-fund/update/${monthNames[month]}/${week}`,
        { userId, amount },
        { headers: { Authorization: `Bearer ${admin.accessToken}` } }
      );
      showToast("User weekly fund updated successfully!", "success");

      // Clear input fields
      setUpdateData({ userId: "", amount: "" });
      fetchUserWeeklyFunds(); // Refresh the fund data
    } catch (error) {
      console.error("Error updating user weekly fund:", error);
      showToast(error.response?.data?.message || "Failed to update user weekly fund. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-700 p-6">
      <div className="bg-gray-600 shadow-lg rounded-lg p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column: Set Total Weekly Fund */}
        <div className="bg-blue-200 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Month & Year</h2>
          <div className="space-y-4">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Month</option>
              {monthNames.map((name, index) =>
                index > 0 ? (
                  <option key={index} value={index}>
                    {name}
                  </option>
                ) : null
              )}
            </select>
            <select
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Week</option>
              {Array.from({ length: 4 }, (_, i) => i + 1).map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
             <h2 className="text-2xl font-bold text-blue-600 mb-4">Set Total Weekly Fund</h2>
            <input
              type="number"
              placeholder="Enter Total Weekly Fund Amount"
              value={totalFund}
              onChange={(e) => setTotalFund(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={setTotalWeeklyFund}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Set Total Weekly Fund
            </button>
            <button
              onClick={deleteWeeklyFund}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 mt-2"
            >
              Delete Weekly Fund
            </button>
          </div>
        </div>

        {/* Second Column: Update User Weekly Funds */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Update User Weekly Funds</h2>
          <div className="space-y-4">
            <button
              onClick={fetchUserWeeklyFunds}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Fetch User Weekly Funds
            </button>
            {loading ? (
              <p>Loading...</p>
            ) : (
              fundData.map((fund) => (
                <div key={fund.userId._id} className="border-b pb-4 mb-4">
                  <p>
                    <strong>Name:</strong> {fund.userId.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {fund.userId.email}
                  </p>
                  <p>
                    <strong>Amount:</strong> Rs. {fund.amount}
                  </p>
                  <p>
                    <strong>Status:</strong> {fund.status}
                  </p>
                  <div className="mt-2">
                    <input
                      type="number"
                      placeholder="Enter Amount"
                      value={updateData.amount}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, amount: e.target.value, userId: fund.userId._id })
                      }
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button
                      onClick={updateUserWeeklyFund}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
                    >
                      Update Weekly Fund
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWeeklyfund;