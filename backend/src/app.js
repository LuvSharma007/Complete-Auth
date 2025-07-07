import express from "express";
import CookieParser from "cookie-parser";
import cors from "cors"
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(CookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// routes import

import userRouter from "./routes/user.routes.js"
import userProfileRouter from "./routes/userProfile.routes.js";


// routes declaration

app.use("/api/v1/users",userRouter)
app.use("/api/v1/userProfile",userProfileRouter)

// app.use((err, req, res, next) => {
//   console.error("Express Error:", err); // Optional: log to server console

//   const statusCode = err.statusCode || 500;
//   res.status(statusCode).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });



export default app;