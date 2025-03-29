import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="text-center py-20 bg-blue-600 text-white">
        <h1 className="text-5xl font-bold">Effortless Mess Management</h1>
        <p className="mt-4 text-lg">
          Simplify your mess operations with meal tracking, expense management, and more.
        </p>
        <a
          href="/signup"
          className="mt-6 inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200"
        >
          Get Started
        </a>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Meal Tracking</h3>
            <p className="text-gray-600 mt-2">Easily manage your daily meal records.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Expense Management</h3>
            <p className="text-gray-600 mt-2">Monitor weekly and monthly mess expenses.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Bill Payments</h3>
            <p className="text-gray-600 mt-2">Keep track of electricity, gas, and other bills.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">User Roles</h3>
            <p className="text-gray-600 mt-2">Separate admin and user roles for better control.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Reports</h3>
            <p className="text-gray-600 mt-2">Generate detailed reports for better insights.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Notifications</h3>
            <p className="text-gray-600 mt-2">Get reminders for pending tasks and bills.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold mb-8">About Our System</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Our Mess Management System is designed to streamline the operations of messes, hostels, and shared accommodations. 
          With features like meal tracking, expense management, and bill payments, it ensures transparency and efficiency in managing daily operations.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "This system has made managing our hostel mess so much easier. Highly recommended!"
            </p>
            <h4 className="mt-4 font-semibold">- John Doe</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "I love how I can track my meals and expenses in one place. Great tool!"
            </p>
            <h4 className="mt-4 font-semibold">- Jane Smith</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "The admin features are fantastic. Managing users and reports is a breeze."
            </p>
            <h4 className="mt-4 font-semibold">- Admin User</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl font-bold">Join Now & Simplify Mess Management</h2>
        <a
          href="/signup"
          className="mt-4 inline-block px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200"
        >
          Sign Up Today
        </a>
      </section>
    </div>
  );
};

export default LandingPage;