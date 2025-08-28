import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Puppy from "@/models/Puppy";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const breed = searchParams.get("breed");
    const gender = searchParams.get("gender");
    const location = searchParams.get("location");
    const variety = searchParams.get("variety");
    const color = searchParams.get("color");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build filter object
    const filter = {};

    if (breed) filter.breed = breed;
    if (gender) filter.gender = gender;
    if (location) filter.location = location;
    if (variety) filter.variety = variety;
    if (color) filter.color = color;

    // Price filtering
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = `$${minPrice}`;
      }
      if (maxPrice) {
        filter.price.$lte = `$${maxPrice}`;
      }
    }

    // Build sort object
    const sort = {};
    if (sortBy === "price") {
      // Custom sorting for price (convert string to number)
      sort.$expr = {
        $toInt: {
          $replaceAll: { input: "$price", find: "$", replacement: "" },
        },
      };
    } else {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get puppies with filters
    const puppies = await Puppy.find(filter)
      .sort(sortBy === "price" ? { price: 1 } : sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Puppy.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: puppies,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching puppies:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
