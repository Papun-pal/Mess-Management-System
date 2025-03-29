import { Router } from "express";
import { registerAdmin,loginAdmin,logoutAdmin} from "../controllers/admin.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerAdmin);

router.route("/login").post(loginAdmin);

// //secure route
router.route("/logout").post( logoutAdmin);
// router.route("/refresh-token").post(refreshAccessToken);
// router.route("/change-password").post(verifyJWT, changeCurrentPassword);
// router.route("/update-account-details").post(verifyJWT, updateAccountDetails);
// router.route("/update-avatar").put(verifyJWT, upload.single("avatar"), updateAdminAvatar);

export default router;
