import { NextResponse } from "next/server";
import { authMiddleware } from "@/utils/authMiddleware";

export async function GET(request) {
  try {
    const authResult = await authMiddleware(request);

    if (authResult.error) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    return NextResponse.json(authResult.user);
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
