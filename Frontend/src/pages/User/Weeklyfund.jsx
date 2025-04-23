import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import showToast from "../../components/Popup";

function Weeklyfund() {
    const { user } = useAuth(); // Get logged-in user info
    const [month, setMonth] = useState("");
    const [week, setWeek] = useState("");
    const [fundData, setFundData] = useState(null);
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

    // Fetch weekly fund details
    const fetchFundDetails = async () => {
        if (!month || !week) return showToast("Please select a month and week.", "info");
        setLoading(true);

        if (!user.accessToken) {
            return showToast("Unauthorized: Please log in again.", "error");
        }

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/weeklyFund/weekly-fund/${monthNames[month]}/${week}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
            );

            setFundData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching weekly fund details:", error);
            if (error.response?.status === 401) {
                showToast("Unauthorized: Please log in again.", "error");
            } else {
                showToast("Failed to fetch weekly fund details. Please try again.", "error");
            }
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[74vh] flex flex-col items-center bg-gray-700 p-6">
            <h2 className="text-2xl font-bold text-[#EAEAEA] mb-4">Weekly Fund</h2>

            {/* Month & Week Selection */}
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
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="p-2 border rounded bg-[#1E1E2E] text-[#EAEAEA] border-[#8F93F6]"
                >
                    <option value="">Select Week</option>
                    {Array.from({ length: 4 }, (_, i) => i + 1).map((week) => (
                        <option key={week} value={week}>
                            Week {week}
                        </option>
                    ))}
                </select>
                <button
                    onClick={fetchFundDetails}
                    className="bg-[#FCA311] text-[#121212] px-4 py-2 rounded hover:bg-[#E89F0D]"
                >
                    Fetch Fund
                </button>
            </div>

            {/* Show Fund Data */}
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : fundData ? (
                <div className="bg-gray-600 p-6 shadow rounded w-full max-w-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                        Weekly Fund Details for {monthNames[month]}, Week {week}
                    </h3>
                    <table className="w-full text-white">
                        <thead>
                            <tr className="border-b border-[#8F93F6]">
                                <th className="text-left py-2">Name & Email</th>
                                <th className="text-left py-2">Amount</th>
                                <th className="text-left py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fundData.users.map((user) => (
                                <tr key={user.userId._id} className="border-b border-[#8F93F6]">
                                    <td className="py-2">
                                        <p>{user.userId.username}</p>
                                        <p className="text-sm text-[#8F93F6]">{user.userId.email}</p>
                                    </td>
                                    <td className="py-2">Rs. {user.amount}</td>
                                    <td className="py-2">{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-[#EAEAEA]">No fund data available. Please fetch a fund.</p>
            )}
        </div>
    );
}

export default Weeklyfund;