import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Welcome to Mess Management System</h1>
        <p className="mt-2 text-lg">Manage your meals, expenses, and bills efficiently</p>
        <Link
          to="/Signup" // Navigate to the Sign Up page
          className="mt-4 inline-block px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200"
        >
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">Meal Management</h3>
            <p className="text-gray-600 mt-2">Easily track and update your daily meals.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">Expense Tracking</h3>
            <p className="text-gray-600 mt-2">Monitor your weekly and monthly mess expenses.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">Bill Management</h3>
            <p className="text-gray-600 mt-2">Keep records of gas, electricity, and other bills.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl font-bold">Start Managing Your Mess Efficiently</h2>
        <Link
          to="/Signup" // Navigate to the Sign Up page
          className="mt-4 inline-block px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
