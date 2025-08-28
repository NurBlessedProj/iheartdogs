import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import NewUser from "@/models/NewUser";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { firstName, lastName, email, password, phone, address } = body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await NewUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = new NewUser({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      activity: {
        lastActive: new Date(),
        loginCount: 0,
        pageViews: 0,
        favoriteActions: [],
      },
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Update last login and activity
    user.lastLogin = new Date();
    user.activity.lastActive = new Date();
    user.activity.loginCount = 1;
    await user.save();

    // Return user data (without password) and token
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      preferences: user.preferences,
      profile: user.profile,
      purchaseHistory: user.purchaseHistory,
      wishlist: user.wishlist,
      savedSearches: user.savedSearches,
      activity: user.activity,
      social: user.social,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    };

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
