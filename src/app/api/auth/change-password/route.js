import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import PetUsers from "@/models/User";
import { requireAuth } from "@/utils/authMiddleware";

export const PUT = requireAuth(async (request) => {
  try {
    await dbConnect();

    const authResult = await requireAuth(() => {})(request);
    if (authResult.status === 401) {
      return authResult;
    }

    const user = authResult.user;
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Get user with password for comparison
    const userWithPassword = await PetUsers.findById(user._id).select(
      "+password"
    );

    // Verify current password
    const isCurrentPasswordValid = await userWithPassword.comparePassword(
      currentPassword
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Update password
    userWithPassword.password = newPassword;
    await userWithPassword.save();

    return NextResponse.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
