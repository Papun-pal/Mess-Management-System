import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import showToast from "../../components/Popup";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null, // Store the file object
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] }); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send data as multipart/form-data
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.avatar) {
      data.append("avatar", formData.avatar); // Append the file
    }

    try {
      // Send the data to the backend using Axios
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Response:", response.data);
      showToast("Sign up successful!", "success");
      // alert("Sign up successful!");
      navigate("/user-login");
    } catch (error) {
      console.error("Error:", error);
      // alert("Sign up failed. Please try again.");
      showToast(error.response?.data?.message || "Sign up failed. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            name="avatar"
            accept="image/*" // Accept only image files
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {formData.avatar && (
            <img
              src={URL.createObjectURL(formData.avatar)} // Preview the selected image
              alt="Avatar Preview"
              className="w-20 h-20 mx-auto rounded-full"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;