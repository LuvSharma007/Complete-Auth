import { Router } from "express";
import {registerUser , loginUser , logoutUser, refreshAccessToken, updatePassword , getCurrentUser} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/Auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/change-password').post(verifyJWT,updatePassword)
router.route("/current-user").get(verifyJWT,getCurrentUser);




export default router;