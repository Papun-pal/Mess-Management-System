import GasBill from "../models/gas.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

// ✅ Get all users' bill details (Admin & Users)
const getBillDetails = asyncHandler(async (req, res) => {
    const { month, year } = req.params;

    const bill = await GasBill.findOne({ month, year }).populate("users.userId", "username email");

    if (!bill) {
        throw new ApiError(404, "Bill not found for the given month and year");
    }

    return res.status(200).json(
        new ApiResponse(200, bill, "Bill details fetched successfully")
    );
});

// ✅ User updates only their own amount
const updateUserAmount = asyncHandler(async (req, res) => {
    const { month, year } = req.params;
    const { amount } = req.body; // Accepting only the amount from the user
    const userId = req.user._id; // Assuming user is authenticated

    if (amount !== undefined && amount < 0) {
        throw new ApiError(400, "Amount must be a positive number");
    }

    // Find the bill for the given month & year
    const bill = await GasBill.findOne({ month, year });

    if (!bill) {
        throw new ApiError(404, "Bill not found for the given month and year");
    }

    // Find the user entry in the bill
    const userEntry = bill.users.find(user => user.userId.toString() === userId.toString());

    if (!userEntry) {
        throw new ApiError(404, "User not found in this bill");
    }

    // Fetch user's total amount and paid amount
    const totalAmount = userEntry.amount; // Total amount assigned to the user
    const paidAmount = amount || 0; // Amount already paid by the user

    const remainingAmount = totalAmount - paidAmount; // Calculate the remaining amount

    userEntry.amount = remainingAmount;

    // Automatically set status to "paid" if the remaining amount is 0
    if (remainingAmount === 0) {
        userEntry.status = "paid";
    } else {
        userEntry.status = "unpaid";
    }

    // Save the updated bill
    await bill.save();

    return res.status(200).json(
        new ApiResponse(200, userEntry, "Amount and status updated successfully")
    );
});

// ✅ ADMIN: Edit any user's bill (amount or status)
const updateAnyUserBill = asyncHandler(async (req, res) => {
    const { month, year } = req.params;
    const { userId, amount,  } = req.body; // Receiving userId from frontend

    // Find the bill for the given month & year
    const bill = await GasBill.findOne({ month, year });

    if (!bill) {
        throw new ApiError(404, "Bill not found for the given month and year");
    }

    // Find the user entry in the bill
    const userEntry = bill.users.find(user => user.userId.toString() === userId);

    if (!userEntry) {
        throw new ApiError(404, "User not found in this bill");
    }

    const totalAmount = userEntry.amount; // Total amount assigned to the user
    const paidAmount = amount|| 0; // Amount already paid by the user
    
    
    const remainingAmount = totalAmount - paidAmount; // Calculate the remaining amount
    
   
    userEntry.amount = remainingAmount;
    
    // Automatically set status to "paid" if the remaining amount is 0
    if (remainingAmount === 0) {
        userEntry.status = "paid";
    } else {
        userEntry.status = "unpaid";
    }
   
    // Save the updated bill
    await bill.save();

    return res.status(200).json(
        new ApiResponse(200, userEntry, "User bill updated successfully by admin")
    );
});

const deleteUserBill = asyncHandler(async (req, res) => {
    const { month, year } = req.params;

    // Find the bill for the given month and year
    const bill = await GasBill.findOne({ month, year });

    if (!bill) {
        throw new ApiError(404, "Bill not found for the given month and year");
    }

    // Delete the bill
    await GasBill.deleteOne({ month, year });

    return res.status(200).json(
        new ApiResponse(200, null, `All bills for ${month} ${year} have been deleted successfully`)
    );
});

// ✅ ADMIN: Set total bill and divide equally among users
const setTotalBill = asyncHandler(async (req, res) => {
    const { month, year } = req.params;
    const { totalBill } = req.body;

    // Validate total bill input
    if (!totalBill || totalBill <= 0) {
        throw new ApiError(400, "Total bill must be a positive number.");
    }

    // Step 1: Find all users who should be included in the bill
    const users = await User.find({}, "_id"); // Fetch all users
    const usersCount = users.length;

    if (usersCount === 0) {
        throw new ApiError(400, "No users found for the bill calculation.");
    }

    // Step 2: Calculate per-user share (rounded to 2 decimal places)
    const perUserAmount = parseFloat((totalBill / usersCount).toFixed(2));

    // Step 3: Find the bill document or create a new one if it doesn’t exist
    let bill = await GasBill.findOne({ month, year });

    if (!bill) {
        // Create a new bill for the month & year
        bill = new GasBill({
            month,
            year,
            totalbill: totalBill,
            users: users.map(user => ({
                userId: user._id,
                amount: perUserAmount,
                status: "unpaid" // Default status
            }))
        });
    } else {
        // Update the existing bill
        bill.totalbill = totalBill;
        bill.users = users.map(user => ({
            userId: user._id,
            amount: perUserAmount,
            status: "unpaid"
        }));
    }

    // Step 4: Save the bill
    await bill.save();

    return res.status(200).json(
        new ApiResponse(200, bill, `Total bill of ${totalBill} set and divided equally among ${usersCount} users.`)
    );
});

export { getBillDetails,deleteUserBill, updateUserAmount, updateAnyUserBill, setTotalBill };
