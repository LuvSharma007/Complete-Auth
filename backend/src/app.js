import express from "express";
import CookieParser from "cookie-parser";
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(CookieParser())


// routes import

import userRouter from "./routes/user.routes.js"
import userProfileRouter from "./routes/userProfile.routes.js";


// routes declaration

app.use("/api/v1/users",userRouter)
app.use("/api/v1/userProfile",userProfileRouter)




export default app;