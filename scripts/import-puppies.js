import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the Puppy model
import Puppy from "../src/models/Puppy.js";

// MongoDB connection string - replace with your actual connection string
const MONGODB_URI =
  "mongodb+srv://blessednur67:QUAN@mydbcluster.motngks.mongodb.net/";

async function importPuppies() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully!");

    // Read the JSON file
    const jsonPath = path.join(
      __dirname,
      "../multi_page_puppies_2025-08-02T14-36-33-472Z.json"
    );
    console.log("Reading JSON file...");
    const jsonData = fs.readFileSync(jsonPath, "utf8");
    const puppies = JSON.parse(jsonData);
    console.log(`Found ${puppies.length} puppies in JSON file`);

    // Clear existing data
    console.log("Clearing existing data...");
    await Puppy.deleteMany({});
    console.log("Existing data cleared");

    // Insert new data
    console.log("Inserting puppies into database...");
    const result = await Puppy.insertMany(puppies);
    console.log(`Successfully imported ${result.length} puppies!`);

    // Get some statistics
    const totalCount = await Puppy.countDocuments();
    const breeds = await Puppy.distinct("breed");
    const locations = await Puppy.distinct("location");

    console.log("\n=== Import Statistics ===");
    console.log(`Total puppies: ${totalCount}`);
    console.log(`Unique breeds: ${breeds.length}`);
    console.log(`Unique locations: ${locations.length}`);
    console.log("\nBreeds found:");
    breeds.forEach((breed) => {
      console.log(`- ${breed}`);
    });

    console.log("\nLocations found:");
    locations.forEach((location) => {
      console.log(`- ${location}`);
    });

    console.log("\n✅ Import completed successfully!");
  } catch (error) {
    console.error("❌ Import failed:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  }
}

// Run the import
importPuppies();
