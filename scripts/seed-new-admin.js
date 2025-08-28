import dbConnect from "../src/utils/dbConnect.js";
import NewUser from "../src/models/NewUser.js";

async function seedNewAdmin() {
  try {
    console.log("🔗 Connecting to database...");
    await dbConnect();

    console.log("👤 Creating admin user for new collection...");

    // Check if admin already exists
    const existingAdmin = await NewUser.findOne({
      email: "admin@iheartdogs.com",
    });

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists in new collection");
      console.log("   Email: admin@iheartdogs.com");
      console.log("   Password: admin123");
      return;
    }

    // Create new admin user
    const adminUser = new NewUser({
      firstName: "Admin",
      lastName: "User",
      email: "admin@iheartdogs.com",
      password: "admin123",
      role: "admin",
      isEmailVerified: true,
      isActive: true,
      phone: "15550123",
      address: {
        street: "123 Admin Street",
        city: "Admin City",
        state: "CA",
        zipCode: "90210",
        country: "United States",
      },
      preferences: {
        notifications: {
          email: true,
          sms: false,
          marketing: true,
          push: true,
        },
        favoriteBreeds: ["Golden Retriever", "Labrador", "German Shepherd"],
        preferredContactMethod: "email",
        timezone: "America/Los_Angeles",
      },
      profile: {
        bio: "System Administrator for iHeartDogs platform",
        occupation: "System Administrator",
        interests: ["Dog Breeding", "Animal Welfare", "Technology"],
      },
      activity: {
        lastActive: new Date(),
        loginCount: 0,
        pageViews: 0,
        favoriteActions: ["admin_dashboard", "user_management"],
      },
      social: {
        followers: [],
        following: [],
        reviews: [],
      },
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully!");
    console.log("\n📋 Admin Login Credentials:");
    console.log("   Email: admin@iheartdogs.com");
    console.log("   Password: admin123");
    console.log("   Role: admin");
    console.log("\n🔗 You can now login to the admin panel at: /admin/login");
  } catch (error) {
    console.error("❌ Failed to create admin user:", error);
  } finally {
    process.exit(0);
  }
}

seedNewAdmin();
