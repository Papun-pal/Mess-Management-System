import MealList from "../models/meallist.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ USERS: Get all meals (Users & Admin view)
const getMeals = asyncHandler(async (req, res) => {
    const meals = await MealList.find(); // Fetch all meals
    return res.status(200).json(new ApiResponse(200, meals, "Meal list fetched successfully"));
});

// ✅ ADMIN: Add a new meal
const addMeal = asyncHandler(async (req, res) => {
    const { day, mealType, mealName } = req.body;

    if (!day || !mealType || !mealName) {
        console.error("Validation Error: Missing fields");
        throw new ApiError(400, "All fields (day, mealType, mealName) are required.");
    }

    const existingMeal = await MealList.findOne({ day, mealType });
    if (existingMeal) {
        // console.error("Validation Error: Meal already exists");
        throw new ApiError(400, "Meal already exists for the given day and meal type.");
    }

    const newMeal = new MealList({ day, mealType, mealName });
    await newMeal.save();

    return res.status(201).json(new ApiResponse(201, newMeal, "Meal added successfully"));
});

// ✅ ADMIN: Update a meal based on day and mealType
const updateMeal = asyncHandler(async (req, res) => {
    const { day, mealType, mealName } = req.body;

    if (!day || !mealType || !mealName) {
        throw new ApiError(400, "All fields (day, mealType, mealName) are required.");
    }

    // Find and update the meal
    const updatedMeal = await MealList.findOneAndUpdate(
        { day, mealType },
        { mealName },
        { new: true } // Return the updated document
    );

    if (!updatedMeal) {
        throw new ApiError(404, "Meal not found for the given day and meal type.");
    }

    return res.status(200).json(new ApiResponse(200, updatedMeal, "Meal updated successfully"));
});

// ✅ ADMIN: Delete a meal based on day and mealType
const deleteMealsByDay = asyncHandler(async (req, res) => {
    const { day, mealType } = req.body;

    if (!day || !mealType) {
        throw new ApiError(400, "Day and mealType are required.");
    }

    // Find and delete the meal
    const deletedMeal = await MealList.findOneAndDelete({ day, mealType });

    if (!deletedMeal) {
        throw new ApiError(404, "Meal not found for the given day and meal type.");
    }

    return res.status(200).json(new ApiResponse(200, deletedMeal, "Meal deleted successfully"));
});

export { getMeals, addMeal, updateMeal, deleteMealsByDay };
