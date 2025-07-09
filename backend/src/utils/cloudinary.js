import { v2 as cloudinary } from 'cloudinary';
import fs, { existsSync } from "fs";
import dotenv from "dotenv"
import ApiError from './ApiError.js';

dotenv.config({path:"../.env"});

// if (
//     !process.env.CLOUDINARY_CLOUD_NAME ||
//     !process.env.CLOUDINARY_API_KEY ||
//     !process.env.CLOUDINARY_API_SECRET
//   ) {
//     throw new Error("Cloudinary configuration is missing in .env");
// }

// Configuration
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
});  


const uploadOnCloudinary = async (localFilePath)=>{
    try {
               

        if(!localFilePath) return null;
    
        // upload an image
        const uploadedFile = await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'})
    
        // file has been uploaded successfully
        console.log('Uploaded File',uploadedFile.url);
        
        if(existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
            console.log("remove file from localpath");
        }
        return uploadedFile;

    } catch (error) {
        fs.unlinkSync(localFilePath)   // remove the locally saved file
        console.error(501,"Error while uploading a file !",error)
        return null;
    }    
}

const deleteFromCloudinary = async (publicId)=>{
    if(!publicId) return null;
    try {
        const deleteImage = await cloudinary.uploader.destroy(publicId)
        console.log('Cloudinary deleted image succesfully',deleteImage);        
        return deleteImage;
    } catch (error) {
        throw new ApiError(400,"Cloudinary file is not deleted",error)
    }
}

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}
