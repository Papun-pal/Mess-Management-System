import express from "express";
import {
    getBillDetails,
    updateUserAmount,
    updateAnyUserBill,
    setTotalBill,
    deleteUserBill
} from "../controllers/current.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Get all users' bill details (Admin & Users)
router.get("/bills/:month/:year", isAuthenticated, getBillDetails);



// ✅ User updates only their own amount
router.put("/bills/update/:month/:year", isAuthenticated, updateUserAmount);

// ✅ Admin updates any user's bill (amount or status)
router.put("/admin/bills/update/:month/:year", isAuthenticated, isAdmin, updateAnyUserBill);

// ✅ Admin sets total bill and divides it among users
router.patch("/admin/bills/set-total/:month/:year", isAuthenticated, isAdmin, setTotalBill);

// ✅ Admin deletes all user bills for a specific month and year
router.delete("/admin/bills/delete/:month/:year", isAuthenticated, isAdmin, deleteUserBill);
export default router;
