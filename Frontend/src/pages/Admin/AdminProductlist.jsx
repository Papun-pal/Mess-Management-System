import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import showToast from "../../components/Popup";
import { FaTrash } from "react-icons/fa";

function AdminProductlist() {
  const { admin } = useAdminAuth();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [totalBill, setTotalBill] = useState(0);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const token = admin?.accessToken;
      if (!token) {
        showToast("Please log in to view product data.", "info");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/productList/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const products = response.data.data || [];
      setProductData(products);
      const total = products.reduce((sum, product) => sum + product.productPrice, 0);
      setTotalBill(total);
    } catch (error) {
      console.error("Error fetching product data:", error);
      showToast(error.response?.data?.message || "Failed to fetch product data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !productPrice) {
      return showToast("Please fill in both product name and price.", "info");
    }

    try {
      const token = admin?.accessToken;
      if (!token) {
        showToast("Please log in to add a product.", "info");
        return;
      }

      const payload = { productName, productPrice: parseFloat(productPrice) };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/productList/admin/addProducts`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast(response.data.message || "Product added successfully!", "success");
      fetchProductData();
      setProductName("");
      setProductPrice("");
    } catch (error) {
      console.error("Error adding product:", error);
      showToast(error.response?.data?.message || "Failed to add product. Please try again.", "error");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
  
    try {
      setDeletingId(productId);
      const token = admin?.accessToken;
      
      await axios.delete(`${import.meta.env.VITE_API_URL}/productList/admin/deleteProduct`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { productId }, // Send productId in the request body
      });
  
      showToast("Product deleted successfully", "success");
      fetchProductData();
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast(error.response?.data?.message || "Failed to delete product. Please try again.", "error");
    } finally {
      setDeletingId(null);
    }
  };
  

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 px-4 py-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Admin Product Management</h2>

        {/* Add Product Section */}
        <div className="bg-[#1E1E2E] p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full p-2 rounded bg-[#2E2E3E] border border-[#3E3E4E] focus:border-[#8F93F6] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Product Price</label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter product price"
                className="w-full p-2 rounded bg-[#2E2E3E] border border-[#3E3E4E] focus:border-[#8F93F6] focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleAddProduct}
            className="w-full bg-green-600 hover:bg-[#7A7FD8] text-white py-2 px-4 rounded transition-colors"
          >
            Add Product
          </button>
        </div>

        {/* Summary Section */}
        <div className="bg-[#1E1E2E] p-4 rounded-lg shadow-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading products...</p>
          </div>
        ) : (
          <div className="bg-[#1E1E2E] rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2D2D3A]">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Product Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Product Price</th>
                    <th className="py-3 px-4 text-right text-sm font-semibold">Date & Time</th>
                    <th className="py-3 px-4 text-right text-sm font-semibold">Actions</th>
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
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            disabled={deletingId === product._id}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                            title="Delete product"
                          >
                            {deletingId === product._id ? (
                              <span className="text-sm">Deleting...</span>
                            ) : (
                              <FaTrash className="inline" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-6 text-center">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProductlist;



