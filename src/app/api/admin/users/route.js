import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import NewUser from "@/models/NewUser";

// Simple admin authentication check
const isAdminAuthenticated = (request) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.substring(7);
  // For now, we'll use a simple token check
  // In production, you should implement proper JWT verification
  return token === "admin-authenticated";
};

export async function GET(request) {
  try {
    // Check admin authentication
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Fetch all users with passwords included
    const users = await NewUser.find({})
      .select("+password")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users: users,
      total: users.length,
    });
  } catch (error) {
    console.error("Admin users fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
