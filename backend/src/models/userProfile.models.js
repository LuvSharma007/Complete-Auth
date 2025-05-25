import mongoose from "mongoose"

const UserProfileSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profileImage:{ 
        url:{type:String},
        publicId:{type:String}
    },
    coverImage:{      
        url:{type:String},
        publicId:{type:String}
    },
    bio:{
        type:String
    },
    location:{
        type:String
    },
    website:{
        type:String
    }
},{timestamps:true})

const UserProfile = mongoose.model('UserProfile',UserProfileSchema)
export default UserProfile;
