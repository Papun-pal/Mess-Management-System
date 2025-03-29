import express from "express";
import {
    getWeeklyFundDetails,
    updateUserFundAmount,
    setAllUsersFundAmount,
    deleteWeeklyFund,
    
} from "../controllers/weeklyFund.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ USERS & ADMIN: Get all users' weekly fund details
router.get("/weekly-fund/:month/:week", isAuthenticated, getWeeklyFundDetails);

// ✅ ADMIN: Update any user's weekly fund amount
router.put("/admin/weekly-fund/update/:month/:week", isAuthenticated, isAdmin, updateUserFundAmount);

router.post("/admin/weekly-fund/set/:month/:week", isAuthenticated, isAdmin, setAllUsersFundAmount);

router.delete("/admin/weekly-fund/delete/:month/:week", isAuthenticated, isAdmin, deleteWeeklyFund);

export default router;
