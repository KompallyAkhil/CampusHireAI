import mongoose from "mongoose";

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGODB_URL}/${process.env.NEXT_PUBLIC_DB_NAME}`);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};