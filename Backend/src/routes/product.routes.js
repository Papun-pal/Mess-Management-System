import express from "express";
import { getProducts, addProduct,  deleteProduct } from "../controllers/product.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Get all products (Users & Admin)
router.get("/getProducts", isAuthenticated, getProducts);

// ✅ Add a new product (Admin only)
router.post("/admin/addProducts", isAuthenticated, isAdmin, addProduct);

// ✅ Delete a product (Admin only)
router.delete("/admin/deleteProduct", isAuthenticated, isAdmin, deleteProduct);

export default router;
