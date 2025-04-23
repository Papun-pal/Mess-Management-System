import React from "react";
import { Link } from "react-router-dom";
import { DollarSign, Flame, Calendar, List, ShoppingCart } from "lucide-react";

const UserHomePage = () => {
  return (
    <div className="min-h-[74vh] bg-gray-600 flex flex-col items-center justify-center p-6">
      <div className="bg-gray-500 shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome, User!
        </h1>
        <p className="text-gray-300 text-center mb-8">
          View your mess details below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Bill */}
          <Link
            to="/current-bill"
            className="flex flex-col items-center bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            <DollarSign size={32} className="mb-4" />
            <span className="font-semibold">Current Bill</span>
          </Link>

          {/* Gas Bill */}
          <Link
            to="/gas-bill"
            className="flex flex-col items-center bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            <Flame size={32} className="mb-4" />
            <span className="font-semibold">Gas Bill</span>
          </Link>

          {/* Weekly Fund */}
          <Link
            to="/weekly-fund"
            className="flex flex-col items-center bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            <Calendar size={32} className="mb-4" />
            <span className="font-semibold">Weekly Fund</span>
          </Link>

          {/* Meal List */}
          <Link
            to="/meal-list"
            className="flex flex-col items-center bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            <List size={32} className="mb-4" />
            <span className="font-semibold">Meal List</span>
          </Link>

          {/* Product List */}
          <Link
            to="/product-list"
            className="flex flex-col items-center bg-red-500 text-white p-6 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            <ShoppingCart size={32} className="mb-4" />
            <span className="font-semibold">Product List</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
