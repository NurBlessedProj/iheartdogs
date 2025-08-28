import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  try {
    console.log("🔍 Testing MongoDB connection...");

    const mongoURI = process.env.MONGO || process.env.MONGODB_URI;

    if (!mongoURI) {
      console.error("❌ No MongoDB connection string found!");
      console.log(
        "Please create a .env file with your MongoDB connection string:"
      );
      console.log(
        "MONGO=mongodb+srv://username:password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority"
      );
      return;
    }

    console.log("📡 Connection string found, attempting to connect...");

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      bufferCommands: false,
    });

    console.log("✅ Successfully connected to MongoDB!");

    // Test a simple query
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📚 Available collections:",
      collections.map((c) => c.name)
    );

    // Check if puppies collection exists
    const puppiesCollection = collections.find((c) => c.name === "puppies");
    if (puppiesCollection) {
      const count = await mongoose.connection.db
        .collection("puppies")
        .countDocuments();
      console.log(`🐕 Found ${count} puppies in the database`);
    } else {
      console.log(
        "⚠️  No puppies collection found. You may need to import data first."
      );
    }
  } catch (error) {
    console.error("❌ Connection failed:", error.message);

    if (error.message.includes("ETIMEOUT")) {
      console.log("\n💡 Possible solutions:");
      console.log("1. Check your internet connection");
      console.log("2. Verify your MongoDB Atlas cluster is running");
      console.log("3. Check if your IP is whitelisted in MongoDB Atlas");
      console.log("4. Verify your connection string is correct");
    } else if (error.message.includes("Authentication failed")) {
      console.log("\n💡 Authentication failed. Please check:");
      console.log("1. Username and password in connection string");
      console.log("2. Database user permissions in MongoDB Atlas");
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

testConnection();
