import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";


const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // console.log( req.cookies);
       
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
 
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request, token not found")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        throw new ApiError(401, "Unauthorized! No token provided.");
    }
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded._id);
        let user = await User.findById(decoded._id).select("-password");
        if (!user) {
            user = await Admin.findById(decoded._id).select("-password");
        }

        if (!user) {
            throw new ApiError(401, "Unauthorized! User not found.");
        }

        req.user = user; // ✅ Correct assignment

        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized! Invalid token.");
    }
});

// ✅ Middleware to check if authenticated user is an admin
const isAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        throw new ApiError(403, "Access denied! User not authenticated.");
    }

    const admin = await Admin.findById(req.user._id);
    // console.log(admin);
    

    if (!admin) {
        throw new ApiError(403, "Access denied! Admin privileges required.");
    }

    next();
});


export {verifyJWT, isAuthenticated, isAdmin}