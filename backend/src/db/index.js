import mongoose from "mongoose";
import { DB_NAME } from "../constansts.js";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB is Connected !");        
    } catch (error) {
        console.log("MongoDB is Not Connected !",error);
        process.exit(1);
    }
}

export default connectDB;