import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const registerAdmin = asyncHandler(async (req, res) => {
    const { adminname, email, password } = req.body;

    if ([adminname, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    if (email.indexOf("@") === -1) {
        throw new ApiError(400, "Invalid email, please enter a valid email");
    }

    const findAdmin = await Admin.findOne({ email });

    if (findAdmin) {
        throw new ApiError(409, "Admin already exists");
    }

    const newAdmin = await Admin.create({
        adminname,
        email,
        password,
    });

    const createdAdmin = await Admin.findById(newAdmin._id).select("-password");

    if (!createdAdmin) {
        throw new ApiError(500, "Something went wrong while creating admin");
    }

    return res.status(201).json(
        new ApiResponse(201, createdAdmin, "Admin created successfully")
    );
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new ApiError(400, "Admin not found");
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id);
      await Admin.findByIdAndUpdate(admin._id, { refreshToken });
    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true, // ❗ Set to false for localhost
        sameSite: "None",
        path: "/",
        maxAge: 10 * 24 * 60 * 60 * 1000,
    };

    return res.status(200)
        .cookie("accessToken", accessToken, { ...options, maxAge: 24 * 60 * 60 * 1000 })
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            admin: loggedInAdmin,
            accessToken,
            refreshToken
        }, "Admin logged in successfully"));
});

const logoutAdmin = asyncHandler(async (req, res) => {
    return res.status(200)
        .clearCookie("accessToken", { httpOnly: true, secure: true })
        .clearCookie("refreshToken", { httpOnly: true, secure: true })
        .json(new ApiResponse(200, null, "Admin logged out successfully"));
});








export { registerAdmin,loginAdmin,logoutAdmin };
