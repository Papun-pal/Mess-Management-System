import React, { useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import showToast from "../../components/Popup";

const AdminGasbill = () => {
  const { admin } = useAdminAuth();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [totalBill, setTotalBill] = useState("");
  const [billData, setBillData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amountInputs, setAmountInputs] = useState({}); // Track individual inputs

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

  // Set Total Gas Bill
  const setTotalGasBill = async () => {
    if (!month || !year || !totalBill) {
      return showToast("Please fill all fields to set the total gas bill.", "info");
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/gasBills/admin/bills/set-total/${monthNames[month]}/${year}`;
      const payload = { totalBill: totalBill };

      await axios.patch(url, payload, {
        headers: { Authorization: `Bearer ${admin.accessToken}` },
      });

      showToast("Total gas bill set successfully!", "success");

      setMonth("");
      setYear("");
      setTotalBill("");
    } catch (error) {
      console.error("Error setting total gas bill:", error);
      showToast(error.response?.data?.message || "Failed to set total gas bill. Please try again.", "error");
    }
  };

  // Delete Gas Bills
  const deleteGasBills = async () => {
    if (!month || !year) {
      return showToast("Please select a month and year to delete gas bills.", "info");
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/gasBills/admin/bills/delete/${monthNames[month]}/${year}`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${admin.accessToken}` },
      });

      showToast(`All gas bills for ${monthNames[month]} ${year} have been deleted successfully!`, "success");

      setMonth("");
      setYear("");
      setTotalBill("");
      setBillData([]);
    } catch (error) {
      console.error("Error deleting gas bills:", error);
      showToast(error.response?.data?.message || "Failed to delete gas bills. Please try again.", "error");
    }
  };

  // Fetch User Gas Bills
  const fetchUserGasBills = async () => {
    if (!month || !year) {
      return showToast("Please select a month and year.", "info");
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/gasBills/bills/${monthNames[month]}/${year}`,
        { headers: { Authorization: `Bearer ${admin.accessToken}` } }
      );
      setBillData(response.data.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user gas bills:", error);
      showToast(error.response?.data?.message || "Failed to fetch user gas bills. Please try again.", "error");
      setLoading(false);
    }
  };

  // Update User Gas Bill
  const updateUserGasBill = async (userId) => {
    const amount = amountInputs[userId];
    if (!userId || !amount) {
      return showToast("Please fill all fields to update the gas bill.", "info");
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/gasBills/admin/bills/update/${monthNames[month]}/${year}`,
        { userId, amount },
        { headers: { Authorization: `Bearer ${admin.accessToken}` } }
      );
      showToast("User gas bill updated successfully!", "success");

      setAmountInputs((prev) => ({ ...prev, [userId]: "" }));
      fetchUserGasBills(); // Refresh
    } catch (error) {
      console.error("Error updating user gas bill:", error);
      showToast(error.response?.data?.message || "Failed to update user gas bill. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-700 p-6">
      <div className="bg-gray-600 shadow-lg rounded-lg p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Set Total Gas Bill */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Select Month & Year</h2>
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
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Year</option>
              {Array.from({ length: 7 }, (_, i) => 2024 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Set Total Gas Bill</h2>
            <input
              type="number"
              placeholder="Enter Total Gas Bill Amount"
              value={totalBill}
              onChange={(e) => setTotalBill(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={setTotalGasBill}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Set Total Gas Bill
            </button>
            <button
              onClick={deleteGasBills}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 mt-2"
            >
              Delete Gas Bills
            </button>
          </div>
        </div>

        {/* Update User Gas Bills */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Update User Gas Bills</h2>
          <div className="space-y-4">
            <button
              onClick={fetchUserGasBills}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Fetch User Gas Bills
            </button>
            {loading ? (
              <p>Loading...</p>
            ) : (
              billData.map((bill) => (
                <div key={bill.userId._id} className="border-b pb-4 mb-4">
                  <p><strong>Name:</strong> {bill.userId.username}</p>
                  <p><strong>Email:</strong> {bill.userId.email}</p>
                  <p><strong>Amount:</strong> Rs. {bill.amount}</p>
                  <p><strong>Status:</strong> {bill.status}</p>
                  <div className="mt-2">
                    <input
                      type="number"
                      placeholder="Enter Amount"
                      value={amountInputs[bill.userId._id] || ""}
                      onChange={(e) =>
                        setAmountInputs({ ...amountInputs, [bill.userId._id]: e.target.value })
                      }
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button
                      onClick={() => updateUserGasBill(bill.userId._id)}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
                    >
                      Update Gas Bill
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

export default AdminGasbill;
