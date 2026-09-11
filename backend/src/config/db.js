import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    console.log("🔄 Connecting to MongoDB Atlas...");

    const connection = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        serverSelectionTimeoutMS: 10000,
      }
    );

    console.log(
      `✅ MongoDB connected: ${connection.connection.host}`
    );

    console.log(
      `📦 Database: ${connection.connection.name}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;