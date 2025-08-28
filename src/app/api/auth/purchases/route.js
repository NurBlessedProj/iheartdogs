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
      purchases: user.purchaseHistory || [],
    });
  } catch (error) {
    console.error("Get purchases error:", error);
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

    const newPurchase = {
      puppyId: body.puppyId,
      puppyName: body.puppyName,
      breed: body.breed,
      price: body.price,
      status: "pending",
      shippingAddress: body.shippingAddress,
      paymentMethod: body.paymentMethod,
      paymentStatus: "pending",
      notes: body.notes,
    };

    const updatedUser = await NewUser.findByIdAndUpdate(
      user._id,
      { $push: { purchaseHistory: newPurchase } },
      { new: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Purchase added successfully",
      purchase: newPurchase,
    });
  } catch (error) {
    console.error("Add purchase error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
