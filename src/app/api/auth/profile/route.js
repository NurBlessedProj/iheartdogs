import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import NewUser from "@/models/NewUser";
import { requireAuth } from "@/utils/authMiddleware";

export const GET = requireAuth(async (request) => {
  try {
    await dbConnect();

    const authResult = await requireAuth(() => {})(request);
    if (authResult.status === 401) {
      return authResult;
    }

    const user = authResult.user;

    return NextResponse.json({
      success: true,
      user: {
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
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const PUT = requireAuth(async (request) => {
  try {
    await dbConnect();

    const authResult = await requireAuth(() => {})(request);
    if (authResult.status === 401) {
      return authResult;
    }

    const user = authResult.user;
    const body = await request.json();

    // Update allowed fields
    const allowedUpdates = [
      "firstName",
      "lastName",
      "phone",
      "address",
      "preferences",
    ];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    const updatedUser = await NewUser.findByIdAndUpdate(
      user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
