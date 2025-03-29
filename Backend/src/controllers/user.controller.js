import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { deleteCloudinary } from "../utils/deleteCloudinary.js";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();  // Corrected the spelling to refreshToken

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };  // Corrected the spelling to refreshToken
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    if (email.indexOf("@") === -1) {
        throw new ApiError(400, "Invalid email, please enter a valid email");
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
        throw new ApiError(409, "User already exists");
    }

    let avatarUrl = req.files?.avatar?.[0]?.path; // Use uploaded avatar path if exists

    if (avatarUrl) {
        avatarUrl = await uploadOnCloudinary(avatarUrl); // Upload to Cloudinary if avatar is uploaded
    }

    const user = await User.create({
        username,
        email,
        password,
        avatar: avatarUrl?.url || undefined,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    );
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken });
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ❗ Set to false for localhost
        sameSite: "Lax",
        path: "/",
        maxAge: 10 * 24 * 60 * 60 * 1000,
    };

    return res.status(200)
        .cookie("accessToken", accessToken, { ...options, maxAge: 24 * 60 * 60 * 1000 }) // Corrected spelling
        .cookie("refreshToken", refreshToken, options) // Corrected spelling
        .json(new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken // Corrected spelling
        }, "User logged in successfully"));
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        path: "/",
    };

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
})

const refressAccessToken = asyncHandler(async (req, res) => {
    const incomingRefressToken = req.cookie.refreshToken || req.body.refreshToken
    if (!incomingRefressToken) {
        throw new ApiError(403, "Asess token invalid")
    }

    try {
        const decodedToken = jwt.verify(incomingRefressToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(403, "Invalid refress token")
        }

        if (incomingRefressToken !== user?.refreshToken) {
            throw new ApiError(403, "Invalid or expired refress token")
        }

        const option = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, nrefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", nrefreshToken, option)
            .json(
                new ApiResponse(200, { accessToken, refreshToken: nrefreshToken }, "Access token refreshed successfully")
            )

    } catch (error) {
        throw new ApiError(403, "Invalid refress token")
    }


})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body



    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, email } = req.body

    if (!username || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email: email
            }
        },
        { new: true }

    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar = asyncHandler(async (req, res) => {

    const cavater = req.user?.avatar.split("/").pop().split(".")[0];
    // console.log(cavater);

    const avatarLocalPath = req.file?.path
    // console.log(req.file);
    // console.log(req.file.path);


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }



    const avatar = await uploadOnCloudinary(avatarLocalPath)
    // console.log(avatar);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")

    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")
    //TODO: delete old image - assignment
    // console.log("Old avatar", cavater)
    await deleteCloudinary(cavater);


    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Avatar image updated successfully")
        )
})






export { registerUser, loginUser, logoutUser, refressAccessToken, changeCurrentPassword, updateAccountDetails, updateUserAvatar }
