import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import showToast from "../../components/Popup";

function Productlist() {
  const { user } = useAuth();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBill, setTotalBill] = useState(0);

  const fetchAllProducts = async () => {
    try {
      const token = user?.accessToken;
      if (!token) {
        showToast("Please log in to view product data.", "info");
        setError("Authentication required");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/productList/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 0 // Return all products
        }
      });

      const products = response.data.data || [];
      setProductData(products);

      const total = products.reduce((sum, product) => sum + product.productPrice, 0);
      setTotalBill(total);
    } catch (err) {
      console.error("Error fetching product data:", err);
      setError(err.response?.data?.message || "Failed to fetch product data");
      showToast(error || "Failed to fetch product data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-white text-lg">Loading all products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-white text-center p-4 max-w-md">
          <p className="text-lg mb-2">Error loading products</p>
          <p className="text-sm mb-4">{error}</p>
          <button 
            onClick={fetchAllProducts}
            className="mt-4 px-4 py-2 bg-[#8F93F6] text-white rounded hover:bg-[#7A7FD8] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-700 px-4 py-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">All Products</h2>

        {/* Summary Section */}
        <div className="bg-[#1E1E2E] p-4 rounded-lg mb-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold text-[#8F93F6]">{productData.length}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Total Spend</h3>
            <p className="text-2xl font-bold text-[#8F93F6]">Rs. {totalBill.toLocaleString()}</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#1E1E2E] rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2D2D3A]">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Product Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Product Price</th>
                  <th className="py-3 px-4 text-right text-sm font-semibold">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {productData.length > 0 ? (
                  productData.map((product) => (
                    <tr key={product._id} className="border-b border-[#2D2D3A] hover:bg-[#252532] transition-colors">
                      <td className="py-3 px-4 text-left max-w-xs truncate">
                        <div className="text-sm sm:text-base">{product.productName}</div>
                      </td>
                      <td className="py-3 px-4 text-left whitespace-nowrap">
                        <div className="text-sm sm:text-base">Rs. {product.productPrice.toLocaleString()}</div>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="text-xs sm:text-sm">
                          {new Date(product.createdAt).toLocaleString("en-IN", {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-6 text-center">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Productlist;