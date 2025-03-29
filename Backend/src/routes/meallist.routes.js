import express from "express";
import { getMeals, addMeal, updateMeal, deleteMealsByDay } from "../controllers/mealList.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ USERS & ADMIN: View meal list
router.get("/meals", isAuthenticated, getMeals);

// ✅ ADMIN: Add a meal
router.post("/admin/meals", isAuthenticated, isAdmin, addMeal);

// ✅ ADMIN: Update a meal (data from req.body)
router.put("/admin/meals/update", isAuthenticated, isAdmin, updateMeal);

// ✅ ADMIN: Delete a meal (data from req.body)
router.delete("/admin/meals/delete", isAuthenticated, isAdmin, deleteMealsByDay);


export default router;
