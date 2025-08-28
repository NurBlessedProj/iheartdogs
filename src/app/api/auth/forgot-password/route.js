import { NextResponse } from "next/server";
import PetUsers from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import crypto from "crypto";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await PetUsers.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "If an account with that email exists, a reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpiry;
    await user.save();

    // In a real application, you would send an email here
    // For now, we'll just return the token (for development purposes)
    return NextResponse.json({
      message: "Password reset link sent to your email",
      resetToken: resetToken, // Remove this in production
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 