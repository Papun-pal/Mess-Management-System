import {Router}from "express";
import { loginUser, logoutUser, registerUser,refressAccessToken,changeCurrentPassword,updateAccountDetails,updateUserAvatar} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxcount:1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

//secure route
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refressAccessToken);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
router.route("/update-account-details").post(verifyJWT,updateAccountDetails);
router.route("/update-avatar").put(verifyJWT,upload.single("avatar"),updateUserAvatar);



export default router;