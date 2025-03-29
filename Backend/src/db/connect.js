import 'dotenv/config'; 
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected !!");
    } catch (error) {
        console.log("MONGOOSE connect error..",error);
    }
}
export default connectDb;