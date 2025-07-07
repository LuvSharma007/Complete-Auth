import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { configureProfile , updateProfile , getProfile} from "../controllers/userProfile.controllers.js";
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

router.route("/update-profile").post(
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
    updateProfile
)

router.route("/get-profile").get(verifyJWT,getProfile)

export default router;