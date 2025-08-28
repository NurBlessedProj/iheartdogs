import mongoose from "mongoose";
import dbConnect from "../src/utils/dbConnect.js";

// User Schema (matching your PetUsers model)
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    isActive: { type: Boolean, default: true },
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Puppy" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Puppy" }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

const PetUsers =
  mongoose.models.PetUsers || mongoose.model("PetUsers", userSchema);

// Test users to seed
const testUsers = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@iheartdogs.com",
    password: "admin123",
    phone: "+12092661293",
    address: {
      street: "Admin Address",
      city: "Admin City",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    role: "admin",
    isActive: true,
    lastLogin: new Date(),
  },
];

// Seed function
const seedUsers = async () => {
  try {
    console.log("Starting to seed test users...");

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await PetUsers.deleteMany({});
    // console.log('Cleared existing users');

    // Check if users already exist
    const existingUsers = await PetUsers.find({});
    if (existingUsers.length > 0) {
      console.log(`Found ${existingUsers.length} existing users in database`);
      console.log("Existing users:");
      existingUsers.forEach((user) => {
        console.log(
          `- ${user.firstName} ${user.lastName} (${user.email}) - Role: ${user.role} - Active: ${user.isActive}`
        );
      });
    }

    // Insert new test users
    const insertedUsers = await PetUsers.insertMany(testUsers);
    console.log(`Successfully seeded ${insertedUsers.length} test users:`);

    insertedUsers.forEach((user) => {
      console.log(`✅ ${user.firstName} ${user.lastName} (${user.email})`);
      console.log(
        `   Role: ${user.role} | Active: ${user.isActive} | Phone: ${user.phone}`
      );
    });

    console.log("\n🎉 Test users seeded successfully!");
    console.log("\nYou can now test the admin dashboard with:");
    console.log("Email: admin@iheartdogs.com");
    console.log("Password: admin123");
    console.log("\nOr login as any of the test users above.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Run the seed function
dbConnect().then(() => {
  seedUsers();
});
