import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import NewUser from "@/models/NewUser";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin user by email
    const adminUser = await NewUser.findOne({ email }).select("+password");

    if (!adminUser) {
      return NextResponse.json(
        { message: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (adminUser.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied - Admin privileges required" },
        { status: 403 }
      );
    }

    // Check if user is active
    if (!adminUser.isActive) {
      return NextResponse.json(
        { message: "Account is deactivated" },
        { status: 403 }
      );
    }

    // Verify password (direct comparison since no hashing)
    if (adminUser.password !== password) {
      return NextResponse.json(
        { message: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // Update last login and activity
    await NewUser.findByIdAndUpdate(adminUser._id, {
      lastLogin: new Date(),
      "activity.lastActive": new Date(),
      $inc: { "activity.loginCount": 1 },
    });

    return NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: {
        _id: adminUser._id,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
