import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { configureProfile } from "../controllers/userProfile.controllers.js";
import verifyJWT from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/Configure-profile").post(
    verifyJWT,    
    upload.fields([
        {
            name:"profileImage",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    configureProfile
)

export default router;