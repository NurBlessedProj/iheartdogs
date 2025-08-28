import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Puppy from "@/models/Puppy";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const puppy = await Puppy.findById(id).lean();

    if (!puppy) {
      return NextResponse.json(
        { success: false, error: "Puppy not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: puppy,
    });
  } catch (error) {
    console.error("Error fetching puppy:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
