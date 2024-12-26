import mongoose from "mongoose";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

const URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection failed", error);
  }
}

export default connectDB;
