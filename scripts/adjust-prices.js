import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the Puppy model
import Puppy from "../src/models/Puppy.js";

// Load environment variables
dotenv.config();

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGO ||
  "mongodb+srv://blessednur67:QUAN@mydbcluster.motngks.mongodb.net/";

// Function to generate a random price between min and max
function generateRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to format price as string with dollar sign
function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

async function adjustPrices() {
  try {
    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB successfully!");

    // Get all puppies from the database
    console.log("📊 Fetching all puppies from database...");
    const puppies = await Puppy.find({});
    console.log(`📈 Found ${puppies.length} puppies in database`);

    if (puppies.length === 0) {
      console.log("❌ No puppies found in database");
      return;
    }

    // Analyze current prices
    console.log("\n📊 Analyzing current prices...");
    const currentPrices = puppies.map((puppy) => {
      const priceStr = puppy.price || "$0";
      const priceNum = parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
      return priceNum;
    });

    const minCurrentPrice = Math.min(...currentPrices);
    const maxCurrentPrice = Math.max(...currentPrices);
    const avgCurrentPrice = Math.round(
      currentPrices.reduce((a, b) => a + b, 0) / currentPrices.length
    );

    console.log(
      `💰 Current price range: $${minCurrentPrice} - $${maxCurrentPrice}`
    );
    console.log(`💰 Average current price: $${avgCurrentPrice}`);

    // Set target price range
    const targetMinPrice = 800;
    const targetMaxPrice = 1200;

    console.log(
      `\n🎯 Target price range: $${targetMinPrice} - $${targetMaxPrice}`
    );

    // Update prices for each puppy
    console.log("\n🔄 Updating prices...");
    let updatedCount = 0;
    let skippedCount = 0;

    for (const puppy of puppies) {
      // Generate new price within target range
      const newPrice = generateRandomPrice(targetMinPrice, targetMaxPrice);
      const formattedPrice = formatPrice(newPrice);

      // Update the puppy's price
      await Puppy.updateOne({ _id: puppy._id }, { price: formattedPrice });

      updatedCount++;

      // Log progress every 10 puppies
      if (updatedCount % 10 === 0) {
        console.log(`   Updated ${updatedCount}/${puppies.length} puppies...`);
      }
    }

    console.log(`\n✅ Successfully updated ${updatedCount} puppies`);
    console.log(`⏭️  Skipped ${skippedCount} puppies`);

    // Verify the changes
    console.log("\n🔍 Verifying price changes...");
    const updatedPuppies = await Puppy.find({});
    const newPrices = updatedPuppies.map((puppy) => {
      const priceStr = puppy.price || "$0";
      const priceNum = parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
      return priceNum;
    });

    const newMinPrice = Math.min(...newPrices);
    const newMaxPrice = Math.max(...newPrices);
    const newAvgPrice = Math.round(
      newPrices.reduce((a, b) => a + b, 0) / newPrices.length
    );

    console.log(`💰 New price range: $${newMinPrice} - $${newMaxPrice}`);
    console.log(`💰 New average price: $${newAvgPrice}`);

    // Show some sample updated puppies
    console.log("\n📋 Sample updated puppies:");
    const samplePuppies = await Puppy.find({})
      .limit(5)
      .select("name breed price");
    samplePuppies.forEach((puppy, index) => {
      console.log(
        `   ${index + 1}. ${puppy.name} (${puppy.breed}) - ${puppy.price}`
      );
    });

    // Price distribution analysis
    console.log("\n📊 Price distribution:");
    const priceRanges = [
      { min: 800, max: 900, label: "$800-$900" },
      { min: 901, max: 1000, label: "$901-$1000" },
      { min: 1001, max: 1100, label: "$1001-$1100" },
      { min: 1101, max: 1200, label: "$1101-$1200" },
    ];

    for (const range of priceRanges) {
      const count = newPrices.filter(
        (price) => price >= range.min && price <= range.max
      ).length;
      const percentage = ((count / newPrices.length) * 100).toFixed(1);
      console.log(`   ${range.label}: ${count} puppies (${percentage}%)`);
    }

    console.log("\n🎉 Price adjustment completed successfully!");
  } catch (error) {
    console.error("❌ Price adjustment failed:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
    process.exit(0);
  }
}

// Run the price adjustment
console.log("🚀 Starting price adjustment script...");
adjustPrices();
