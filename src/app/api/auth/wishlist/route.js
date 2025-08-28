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
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    console.error("Get wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const POST = requireAuth(async (request) => {
  try {
    await dbConnect();

    const authResult = await requireAuth(() => {})(request);
    if (authResult.status === 401) {
      return authResult;
    }

    const user = authResult.user;
    const body = await request.json();
    const { puppyId } = body;

    if (!puppyId) {
      return NextResponse.json(
        { success: false, message: "Puppy ID is required" },
        { status: 400 }
      );
    }

    // Check if already in wishlist
    const existingItem = user.wishlist.find(
      (item) => item.puppyId.toString() === puppyId
    );

    if (existingItem) {
      return NextResponse.json(
        { success: false, message: "Puppy is already in your wishlist" },
        { status: 400 }
      );
    }

    const newWishlistItem = {
      puppyId: puppyId,
      addedAt: new Date(),
    };

    const updatedUser = await NewUser.findByIdAndUpdate(
      user._id,
      { $push: { wishlist: newWishlistItem } },
      { new: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Added to wishlist successfully",
      wishlistItem: newWishlistItem,
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
