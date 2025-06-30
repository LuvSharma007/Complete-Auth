import User from "../models/user.models.js";
import UserProfile from "../models/userProfile.models.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js"



const configureProfile = asyncHandler(async(req,res)=>{
    // get data from req.body
    // get user from req.user
    // check for images 
    // upload them on cloudinary
    // configure profile
    // return all data

    const { name ,bio , location , website }  = req.body;

    const userId =  req.user?.id;  // getting because we send res while veriftJWT

    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(400,"User not found")
    }

    const ProfileImageLocalPath = req.files?.profileImage[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    const profileImage = await uploadOnCloudinary(ProfileImageLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // console.log(`ProfileImageURL:${profileImage.url} , ProfileImagePublicId:${profileImage.public_id}`)
    // console.log(`CoverImageURL:${coverImage.url} , CoverImagePublicId:${coverImage.public_id}`);


    // if(!profileImage){
    //     // set default image
    // }

    const userProfile  = await UserProfile.create({
        user: user._id,
        name: name || user.username,
        profileImage:{
            url:profileImage.url, // in future set default profile picture like whatsApp
            publicId:profileImage.public_id
        },
        coverImage:{
            url:coverImage.url || "" ,
            publicId:coverImage.public_id
        },
        bio,
        location,
        website
    })

    if(!userProfile){
        throw new ApiError(400,"Something went wrong while configuring your profile ")
    }

    return res.status(201).json(
        new ApiResponse(200,userProfile,"profile configured successfully")
    )

})

export {
    configureProfile
}