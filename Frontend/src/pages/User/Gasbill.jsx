import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import showToast from "../../components/Popup";

function Gasbill() {
  const { user } = useAuth(); // Get logged-in user info
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [billData, setBillData] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Fetch gas bill details
  const fetchBill = async () => {
    if (!month || !year) return showToast("Please select a month and year.", "info");
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/gasBills/bills/${monthNames[month]}/${year}`,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      // console.log("Gas bill data:", response.data.data);
      setBillData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gas bill:", error);
      showToast(error.response?.data?.message || "Failed to fetch gas bill. Please try again.", "error");
      setLoading(false);
    }
  };

  // Update user amount
  const updateBill = async () => {
    if (!amount) return showToast("Please enter an amount to pay.", "info");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/gasBills/bills/update/${monthNames[month]}/${year}`,
        { amount },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      showToast("Gas bill updated successfully!", "success");
      fetchBill(); // Refresh the bill data
    } catch (error) {
      console.error("Error updating gas bill:", error);
      showToast(error.response?.data?.message || "Failed to update gas bill. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-700 p-6">
      <h2 className="text-2xl font-bold text-[#EAEAEA] mb-4">Gas Bill</h2>

      {/* Month & Year Selection */}
      <div className="flex gap-4 mb-6">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded bg-[#1E1E2E] text-[#EAEAEA] border-[#8F93F6]"
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
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded bg-[#1E1E2E] text-[#EAEAEA] border-[#8F93F6]"
        >
          <option value="">Select Year</option>
          {Array.from({ length: 7 }, (_, i) => 2024 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={fetchBill}
          className="bg-[#FCA311] text-[#121212] px-4 py-2 rounded hover:bg-[#E89F0D]"
        >
          Fetch Bill
        </button>
      </div>

      {/* Show Bill Data */}
      {loading ? (
        <p className="text-[#EAEAEA]">Loading...</p>
      ) : billData ? (
        <div className="bg-gray-600 p-6 shadow rounded w-full max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-[#EAEAEA]">
            Gas Bill Details for {monthNames[month]}/{year}
          </h3>
          <p className="text-[#EAEAEA]">
            Total Bill: <strong>Rs. {billData.totalbill}</strong>
          </p>
          <h4 className="mt-4 font-medium text-[#8F93F6]">All Users' Bills:</h4>
          {billData.users
            .sort((a, b) => {
              // Sort so that the logged-in user's data appears first
              if (String(a.userId._id) === String(user._id)) return -1;
              if (String(b.userId._id) === String(user._id)) return 1;
              return 0;
            })
            .map((userBill) => {
              return (
                <div key={userBill.userId._id} className="mt-4 border-b pb-2 border-[#8F93F6]">
                  <p className="text-[#EAEAEA]">
                    <strong>Name:</strong> {userBill.userId.username}
                  </p>
                  <p className="text-[#EAEAEA]">
                    <strong>Email:</strong> {userBill.userId.email}
                  </p>
                  <p className="text-[#EAEAEA]">
                    <strong>Amount:</strong> Rs. {userBill.amount}
                  </p>
                  <p className="text-[#EAEAEA]">
                    <strong>Status:</strong> {userBill.status}
                  </p>

                  {/* Allow editing only for the logged-in user */}
                  {String(userBill.userId._id) === String(user._id) && (
                    <div className="mt-2">
                      <input
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="p-2 border rounded bg-[#121212] text-[#EAEAEA] border-[#8F93F6] mr-2"
                      />
                      <button
                        onClick={updateBill}
                        className="ml-2 bg-[#FCA311] text-[#121212] px-4 py-2 rounded hover:bg-[#E89F0D]"
                      >
                        Pay
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <p className="text-[#EAEAEA]">No gas bill data available. Please fetch a bill.</p>
      )}
    </div>
  );
}

export default Gasbill;