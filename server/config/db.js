const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo-app";
  console.log(`Connecting to MongoDB at: ${uri}`);
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("CRITICAL: MongoDB connection failed!");
    console.error("Make sure your MongoDB server is running on port 27017.");
    console.error(error.message);
    // Removed process.exit(1) to allow the Express server to start for debugging
  }
};

module.exports = connectDB;
