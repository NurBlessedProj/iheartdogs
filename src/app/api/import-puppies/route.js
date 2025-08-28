import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Puppy from "@/models/Puppy";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    await dbConnect();

    // Read the JSON file
    const jsonPath = path.join(
      process.cwd(),
      "multi_page_puppies_2025-08-02T14-36-33-472Z.json"
    );
    const jsonData = fs.readFileSync(jsonPath, "utf8");
    const puppies = JSON.parse(jsonData);

    // Clear existing data
    await Puppy.deleteMany({});

    // Insert new data
    const result = await Puppy.insertMany(puppies);

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${result.length} puppies`,
      count: result.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const count = await Puppy.countDocuments();

    return NextResponse.json({
      success: true,
      count,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
