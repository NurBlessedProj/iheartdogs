import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import PetUsers from "@/models/User";
import { requireAuth } from "@/utils/authMiddleware";

export const DELETE = requireAuth(async (request, { params }) => {
  try {
    await dbConnect();

    const authResult = await requireAuth(() => {})(request);
    if (authResult.status === 401) {
      return authResult;
    }

    const user = authResult.user;
    const { puppyId } = params;

    if (!puppyId) {
      return NextResponse.json(
        { success: false, message: "Puppy ID is required" },
        { status: 400 }
      );
    }

    // Remove from wishlist
    const updatedUser = await PetUsers.findByIdAndUpdate(
      user._id,
      { $pull: { wishlist: { puppyId: puppyId } } },
      { new: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Removed from wishlist successfully",
    });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
