import React, { useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import showToast from "../../components/Popup";

const AdminCurrentbill = () => {
  const { admin } = useAdminAuth();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [totalBill, setTotalBill] = useState("");
  const [billData, setBillData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [billInputs, setBillInputs] = useState({});

  const monthNames = [
    "",
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Set Total Bill
  const setTotalCurrentBill = async () => {
    if (!month || !year || !totalBill) {
      return showToast("Please fill all fields to set the total bill.", "info");
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/currentBills/admin/bills/set-total/${monthNames[month]}/${year}`;
      const payload = { totalBill: totalBill };

      await axios.patch(url, payload, {
        headers: { Authorization: `Bearer ${admin.accessToken}` },
      });

      showToast("Total bill set successfully!", "success");

      setMonth("");
      setYear("");
      setTotalBill("");
    } catch (error) {
      console.error("Error setting total bill:", error);
      showToast(error.response?.data?.message || "Failed to set total bill. Please try again.", "error");
    }
  };

  // Delete Bills
  const deleteBills = async () => {
    if (!month || !year) {
      return showToast("Please select a month and year to delete bills.", "info");
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/currentBills/admin/bills/delete/${monthNames[month]}/${year}`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${admin.accessToken}` },
      });

      showToast(`All bills for ${monthNames[month]} ${year} have been deleted successfully!`, "success");

      setMonth("");
      setYear("");
      setTotalBill("");
      setBillData([]);
    } catch (error) {
      console.error("Error deleting bills:", error);
      showToast(error.response?.data?.message || "Failed to delete bills. Please try again.", "error");
    }
  };

  // Fetch All User Bills
  const fetchUserBills = async () => {
    if (!month || !year) {
      return showToast("Please select a month and year.", "info");
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/currentBills/bills/${monthNames[month]}/${year}`,
        { headers: { Authorization: `Bearer ${admin.accessToken}` } }
      );
      setBillData(response.data.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user bills:", error);
      showToast(error.response?.data?.message || "Failed to fetch bills.", "error");
      setLoading(false);
    }
  };

  // Update User Bill
  const updateUserBill = async (userId) => {
    const amount = billInputs[userId];

    if (!userId || !amount) {
      return showToast("Please fill all fields to update the bill.", "info");
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/currentBills/admin/bills/update/${monthNames[month]}/${year}`,
        { userId, amount },
        { headers: { Authorization: `Bearer ${admin.accessToken}` } }
      );
      showToast("User bill updated successfully!", "success");

      // Clear that user's input field
      setBillInputs((prev) => ({ ...prev, [userId]: "" }));
      fetchUserBills(); // Refresh bill data
    } catch (error) {
      console.error("Error updating user bill:", error);
      const message =
        error.response?.data?.message?.includes("not found")
          ? "Bill not found for this month and year."
          : error.response?.data?.message || "Something went wrong.";
      showToast(message, "error");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-700 p-6">
      <div className="bg-gray-600 shadow-lg rounded-lg p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: Set Total Bill */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
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
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Set Total Bill</h2>
            <input
              type="number"
              placeholder="Enter Total Bill Amount"
              value={totalBill}
              onChange={(e) => setTotalBill(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={setTotalCurrentBill}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Set Total Bill
            </button>
            <button
              onClick={deleteBills}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 mt-2"
            >
              Delete Bills
            </button>
          </div>
        </div>

        {/* Column 2: Update User Bills */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Update User Bills</h2>
          <div className="space-y-4">
            <button
              onClick={fetchUserBills}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-500"
            >
              Fetch User Bills
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
                      value={billInputs[bill.userId._id] || ""}
                      onChange={(e) =>
                        setBillInputs({
                          ...billInputs,
                          [bill.userId._id]: e.target.value
                        })
                      }
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button
                      onClick={() => updateUserBill(bill.userId._id)}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
                    >
                      Update Bill
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

export default AdminCurrentbill;
