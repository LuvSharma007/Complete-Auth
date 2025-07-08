import User from "../models/user.models.js";
import UserProfile from "../models/userProfile.models.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary , deleteFromCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js"



const configureProfile = asyncHandler(async (req, res) => {
    // get data from req.body
    // get user from req.user
    // check for images 
    // upload them on cloudinary
    // configure profile
    // return all data

    const { name, bio, location, website } = req.body;

    const userId = req.user?.id;  // getting because we send res while veriftJWT

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(400, "User not found")
    }

    const existedUser = await UserProfile.findOne({ user: user._id })
    if (existedUser) {
        return res.status(404).json(new ApiResponse(400, null, "Cannot configure more than once !"))
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

    const userProfile = await UserProfile.create({
        user: user._id,
        name: name || user.username,
        profileImage: {
            url: profileImage.url, // in future set default profile picture like whatsApp
            publicId: profileImage.public_id
        },
        coverImage: {
            url: coverImage.url || "",
            publicId: coverImage.public_id
        },
        bio,
        location,
        website
    })

    if (!userProfile) {
        throw new ApiError(400, "Something went wrong while configuring your profile ")
    }

    return res.status(201).json(
        new ApiResponse(200, userProfile, "profile configured successfully")
    )
})

const updateProfile = asyncHandler(async(req,res)=>{
    // get data from req.body
    // get user from cookie
    // delete previous images
    // update with new images
    // update the profile

    const {name , bio , location , website} = req.body;
    
    const userId = req.user?.id;  // getting because we send res while veriftJWT
    const userProfile = await UserProfile.findOne({user:userId});
    
    if(!userProfile){
        return res.status(404).json(new ApiResponse(404,null,"user not found"))
    }

    console.log(userProfile.profileImage.publicId);
    console.log(userProfile.coverImage.publicId);
    
    
    if(userProfile.profileImage?.publicId){
        await deleteFromCloudinary(userProfile.profileImage.publicId);
    }

    if(userProfile.coverImage?.publicId){
        await deleteFromCloudinary(userProfile.coverImage.publicId);
    }

    const profileImageLocalPath = req.files?.profileImage?.[0]?.path
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path

    let profileImage , coverImage;
    
    if(profileImageLocalPath){
        profileImage = await uploadOnCloudinary(profileImageLocalPath);
    }

    if(coverImageLocalPath){
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    userProfile.name = name || userProfile.name
    userProfile.bio = bio || userProfile.bio
    userProfile.location = location || userProfile.location
    userProfile.website = website || userProfile.website

    if(profileImage){
        userProfile.profileImage = {
            url:profileImage.url,
            publicId:profileImage.public_id
        }
    }

    if(coverImage){
        userProfile.coverImage = {
            url:coverImage.url,
            publicId:coverImage.public_id
        }
    }

    await userProfile.save();

    return res.status(201).json(
        new ApiResponse(200,userProfile,"Profile Updated successfully")
    )
})


const getProfile = asyncHandler(async(req,res)=>{
    // get userid from cookies
    // find user 
    // return userProfile

    const userId = req.user?._id
    
    const userProfile = await UserProfile.findOne({user:userId})
    if(!userProfile){
        throw new ApiError(404,"user profile not found");
    }
    return res.status(200).json(
        new ApiResponse(200,userProfile,"user profile retrieve successfully")
    )
})


export {
    configureProfile,
    updateProfile,
    getProfile
}