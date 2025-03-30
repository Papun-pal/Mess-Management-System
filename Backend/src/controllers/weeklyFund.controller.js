import WeeklyFund from "../models/weeklyFund.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";


// ✅ USERS & ADMIN: Get all users' weekly fund details
const getWeeklyFundDetails = asyncHandler(async (req, res) => {
    const { month, week } = req.params;

    const fund = await WeeklyFund.findOne({ month, week }).populate("users.userId", "username email");

    if (!fund) {
        throw new ApiError(404, "No weekly fund record found for this month and week.");
    }

    return res.status(200).json(
        new ApiResponse(200, fund, "Weekly fund details fetched successfully.")
    );
});


// ✅ ADMIN: Update any user's paid amount
const updateUserFundAmount = asyncHandler(async (req, res) => {
    const { month, week } = req.params;
    const { userId, amount } = req.body; // Admin provides userId, amount, and status

    if (amount !== undefined && amount < 0) {
        throw new ApiError(400, "Amount must be a positive number.");
    }

 

    // Find the weekly fund entry or create if it doesn't exist
    let fund = await WeeklyFund.findOne({ month, week });

    if (!fund) {
        // If no fund entry exists, create one with all users having default amount 0
        const users = await User.find({}, "_id"); // Get all users

        fund = new WeeklyFund({
            month,
            week,
            users: users.map(user => ({
                userId: user._id,
                amount: 0, // ✅ Default amount
                status: "unpaid"
            }))
        });
    }

    // Find the user entry in the fund
    const userEntry = fund.users.find(user => user.userId.toString() === userId);

    if (!userEntry) {
        throw new ApiError(404, "User not found in this weekly fund.");
    }
    const totalAmount = userEntry.amount;
    const paidAmount = amount|| 0; 
    const remainingAmount = totalAmount - paidAmount;
    userEntry.amount = remainingAmount;
    
    if (remainingAmount === 0) {
        userEntry.status = "paid";
    } else {
        userEntry.status = "unpaid";
    }
    await fund.save();

    return res.status(200).json(
        new ApiResponse(200, userEntry, "User's weekly fund updated successfully.")
    );
});


// ✅ ADMIN: Set the same amount for all users
const setAllUsersFundAmount = asyncHandler(async (req, res) => {
    const { month, week } = req.params;
    const { amount } = req.body; // Admin provides the amount to set for all users

    if (!amount || amount <= 0) {
        throw new ApiError(400, "Amount must be a positive number.");
    }

    // Find the weekly fund entry or create if it doesn't exist
    let fund = await WeeklyFund.findOne({ month, week });

    if (!fund) {
        // If no fund entry exists, create one with all users having the same amount
        const users = await User.find({}, "_id"); // Get all users

        fund = new WeeklyFund({
            month,
            week,
            users: users.map(user => ({
                userId: user._id,
                amount: amount, // Set the same amount for all users
                status: "unpaid", // Default status
            })),
        });
    } else {
        // Update the amount for all users in the existing fund
        fund.users = fund.users.map(user => ({
            ...user.toObject(),
            amount: amount, // Set the same amount for all users
            status: "unpaid", // Reset status to unpaid
        }));
    }

    await fund.save();

    return res.status(200).json(
        new ApiResponse(200, fund, `All users' amounts have been set to Rs. ${amount} successfully.`)
    );
});

// ✅ ADMIN: Delete weekly fund for a specific month and week
const deleteWeeklyFund = asyncHandler(async (req, res) => {
    const { month, week } = req.params;

    // Find the weekly fund entry for the given month and week
    const fund = await WeeklyFund.findOne({ month, week });

    if (!fund) {
        throw new ApiError(404, "No weekly fund record found for this month and week.");
    }

    // Delete the weekly fund entry
    await WeeklyFund.deleteOne({ month, week });

    return res.status(200).json(
        new ApiResponse(200, null, `Weekly fund for ${month} (Week ${week}) has been deleted successfully.`)
    );
});



export { getWeeklyFundDetails, updateUserFundAmount, deleteWeeklyFund, setAllUsersFundAmount };
