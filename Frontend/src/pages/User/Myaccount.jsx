import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import showToast from "../../components/Popup";

const MyAccount = () => {
    const { user, setUser } = useAuth();
    const [activeTab, setActiveTab] = useState("avatar"); // State to track the active tab
    const [avatar, setAvatar] = useState(null);
    const [password, setPassword] = useState({ oldPassword: "", newPassword: "" });
    const [accountDetails, setAccountDetails] = useState({ username: user?.username, email: user?.email });

    // Update Avatar
    const updateAvatar = async () => {
        if (!avatar) return showToast("Please select an image to upload.", "info");
        const formData = new FormData();
        formData.append("avatar", avatar);
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/update-avatar`, formData, {
                headers: { Authorization: `Bearer ${user.accessToken}` },
            });
            setUser({ ...user, avatar: response.data.avatar });
           showToast("Avatar updated successfully!", "success");
        } catch (error) {
            console.error("Error updating avatar:", error);
            showToast(error.response?.data?.message || "Failed to update avatar. Please try again.", "error");
        }
    };

    // Change Password
    const changePassword = async () => {
        if (!password.oldPassword || !password.newPassword) return showToast("Please enter both old and new passwords.", "info");
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/change-password`, password, {
                headers: { Authorization: `Bearer ${user.accessToken}` },
            });
            showToast("Password changed successfully!", "success");
            setPassword({ oldPassword: "", newPassword: "" });
        } catch (error) {
            console.error("Error changing password:", error);
            showToast(error.response?.data?.message || "Failed to change password. Please try again.", "error");
        }
    };

    // Update Account Details
    const updateAccountDetails = async () => {
        if (!accountDetails.username || !accountDetails.email) return showToast("Please enter all fields.", "info");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/update-account-details`, accountDetails, {
                headers: { Authorization: `Bearer ${user.accessToken}` },
            });
            setUser({ ...user, ...response.data });
            showToast("Account details updated successfully!", "success");
        } catch (error) {
            console.error("Error updating account details:", error);
            showToast(error.response?.data?.message || "Failed to update account details. Please try again.", "error");
        }
    };

    return (
        <div className="min-h-[74vh] flex flex-col lg:flex-row bg-gray-500">
            {/* Left Sidebar */}
            <div className="w-full lg:w-1/4 bg-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">My Account</h2>
                <ul className="space-y-4">
                    <li
                        className={`cursor-pointer p-2 rounded ${activeTab === "avatar" ? "bg-blue-800" : "hover:bg-blue-700"
                            }`}
                        onClick={() => setActiveTab("avatar")}
                    >
                        Update Avatar
                    </li>
                    <li
                        className={`cursor-pointer p-2 rounded ${activeTab === "password" ? "bg-blue-800" : "hover:bg-blue-700"
                            }`}
                        onClick={() => setActiveTab("password")}
                    >
                        Change Password
                    </li>
                    <li
                        className={`cursor-pointer p-2 rounded ${activeTab === "details" ? "bg-blue-800" : "hover:bg-blue-700"
                            }`}
                        onClick={() => setActiveTab("details")}
                    >
                        Update Account Details
                    </li>
                </ul>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-3/4 flex flex-col bg-slate-400 items-center justify-start p-6">
                {/* User Info Section */}
                <div className="w-full max-w-md text-center mb-6">
                    <img
                        src={user?.avatar || "https://via.placeholder.com/150"}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-600"
                    />
                    <h3 className="text-xl font-bold text-blue-600">{user?.username || "User Name"}</h3>
                </div>

                {/* Dynamic Content Based on Active Tab */}
                {activeTab === "avatar" && (
                    <div className="w-full max-w-md bg-gray-500 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-blue-400">Update Avatar</h3>
                        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} className="block w-full mt-2 p-2 border rounded" />
                        <button
                            onClick={updateAvatar}
                            className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full"
                        >
                            Upload
                        </button>
                    </div>
                )}

                {activeTab === "password" && (
                    <div className="w-full max-w-md bg-gray-400 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-blue-600">Change Password</h3>
                        <input
                            type="password"
                            placeholder="Old Password"
                            value={password.oldPassword}
                            onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                            className="block w-full mt-2 p-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password.newPassword}
                            onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                            className="block w-full mt-2 p-2 border rounded"
                        />
                        <button
                            onClick={changePassword}
                            className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full"
                        >
                            Change Password
                        </button>
                    </div>
                )}

                {activeTab === "details" && (
                    <div className="w-full max-w-md bg-gray-400 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-blue-600">Update Account Details</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            value={accountDetails.username}
                            onChange={(e) => setAccountDetails({ ...accountDetails, username: e.target.value })}
                            className="block w-full mt-2 p-2 border rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={accountDetails.email}
                            onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
                            className="block w-full mt-2 p-2 border rounded"
                        />
                        <button
                            onClick={updateAccountDetails}
                            className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full"
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAccount;