import 'dotenv/config'; 
import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URI || !DB_NAME) {
            throw new Error("MONGO_URI or DB_NAME is not defined in the environment variables.");
        }
        await mongoose.connect(`${process.env.MONGO_URI}${DB_NAME}`);
        console.log("MongoDB connected !!");
    } catch (error) {
        console.log("MONGOOSE connect error..",error);
    }
}
export default connectDb;