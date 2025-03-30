import Product from "../models/product.model.js";
import {asyncHandler }from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { ApiError} from "../utils/ApiError.js";

// ✅ GET: Fetch all products (Users & Admin)
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    return res.status(200).json(new ApiResponse(200, products, "Product list fetched successfully"));
});

// ✅ POST: Add a new product (Admin only)
const addProduct = asyncHandler(async (req, res) => {
    const { productName, productPrice } = req.body;

    if (!productName || productPrice == null) {
        throw new ApiError(400, "Product name and price are required");
    }

    const newProduct = await Product.create({ productName, productPrice });

    return res.status(201).json(new ApiResponse(201, newProduct, "Product added successfully"));
});

// ✅ DELETE: Remove a product (Admin only)
const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(new ApiResponse(200, product, "Product deleted successfully"));
});

// ✅ Export all functions at the bottom
export { getProducts, addProduct,  deleteProduct };
 