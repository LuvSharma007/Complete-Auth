import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken"


const generateAccessAndRefereshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ValidateBeforeSave:false})

        return {accessToken , refreshToken}

    } catch (error) {
        throw new ApiError(500,"Somthing went wrong while generating Refresh & Access token")
    }
}


const registerUser = asyncHandler(async(req,res)=>{
    // get the user data from frontend
    // validate the field
    // check if email or username is unique
    // create user
    // return res


    const { username , email , fullname , password } = req.body;
    
    if(
        [fullname , email , username , password].some((field)=>{
            field?.trim() === ""
        })
    ){
        throw new ApiError(400,"All fields are required");
    }

    const existedUser = await User.findOne({
        $or:[{username} , {email}]
    });

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists ");
    }

    const user = await User.create({
        fullname,
        username,
        email,
        password,
    })

    const createdUser = await User.findOne(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registration !")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully !")
    )

})


const loginUser = asyncHandler(async(req,res)=>{
    // get user data from frontend
    // validate user if exists or not
    // validate password
    // gererate access and refresh token
    // send cookie 

    const { email , username , password } = req.body;

    if(!(username || password)){
        throw new ApiError(400,"Username or password is reuqired")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,"user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password,);

    if(!isPasswordValid){
        throw new ApiError(400,"Invalid user credentials")
    }

    const { accessToken , refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res)=>{
    // agar hume koi user logout karna hai tho , matlab vo login hoga
    // so , req Access token from cookies
    // decode token with its secret key
    // find user 
    // req main user bhej do

    await User.findByIdAndUpdate(
        req.user._id,
        {
        $set:{
            refreshToken:undefined
        },
    },{
        new:true    // update the document of the user
    }
)
    

    const options = {      
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .clearCookie("accessToken",options)   // why use options in clearing cookie , we have to matched the configration when we create the cookies  while login 
    .clearCookie("refreshToken",options)  // otherwise the cookie won't get deleted
    .json(new ApiResponse(200,"User logged out successfully"))


})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    // get access and refresg token from cookies
    // validate if token exists
    // decode the token 


    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(400,"unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)  
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(400,"Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(400,"Refresh token has been expired")
        }
    
        const { accessToken , newRefreshToken } = await generateAccessAndRefereshTokens(user._id)
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        return res.status(200)
        .cookie("accessToken",accessToken , options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken , refreshToken : newRefreshToken},
                "Access Token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,"Invalid refresh Token")
    }

})

const updatePassword = asyncHandler(async(req,res)=>{
    // get data from req.body
    // find user 
    // check oldpassword matched or not
    // change the password

    const {username , email , oldPassword , newPassword } = req.body;

    const user = await User.findOne({
        $or:[{email},{username}]
    })

    if(!user){
        throw new ApiError(400,"username or email is incorrect")
    }

    const isPasswordMatched = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordMatched){
        throw new ApiError(400,"old password is incorrect")
    }
    // console.log("oldPassword",isPasswordMatched);
    
    
    
    user.password = newPassword
    await user.save();
    // console.log("newPassword",newPassword);

    return res.status(200).json(
        new ApiResponse(200,"Password changed successfully")
    )
})




export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updatePassword
};
