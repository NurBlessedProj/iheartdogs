import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Puppy from "@/models/Puppy";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    // Get all categories (breeds with counts)
    const categories = await Puppy.getCategories();

    // Get sample images for each breed and process prices
    const categoriesWithImages = await Promise.all(
      categories.map(async (category) => {
        try {
          // Get one puppy from this breed to use as sample image
          const samplePuppy = await Puppy.findOne({ breed: category.breed })
            .select("images")
            .lean();

          let sampleImage = null;
          if (
            samplePuppy &&
            samplePuppy.images &&
            samplePuppy.images.length > 0
          ) {
            // Get the first high-quality image
            const hdImage = samplePuppy.images.find(
              (img) => img.includes("_hd.") || img.includes("_large-resize.")
            );
            sampleImage = hdImage || samplePuppy.images[0];
          }

          // Process prices in JavaScript to avoid MongoDB parsing issues
          const prices = category.prices || [];
          const priceNumbers = prices.map((priceStr) => {
            const cleanPrice = priceStr.replace(/[$,]/g, "");
            return parseInt(cleanPrice) || 0;
          });

          const minPrice =
            priceNumbers.length > 0 ? Math.min(...priceNumbers) : 0;
          const maxPrice =
            priceNumbers.length > 0 ? Math.max(...priceNumbers) : 0;

          return {
            ...category,
            sampleImage,
            minPrice,
            maxPrice,
          };
        } catch (error) {
          console.error(
            `Error getting sample image for ${category.breed}:`,
            error
          );
          return {
            ...category,
            sampleImage: null,
            minPrice: 0,
            maxPrice: 0,
          };
        }
      })
    );
    // Get all filter options
    const [breeds, varieties, colors, locations] = await Promise.all([
      Puppy.getBreeds(),
      Puppy.getVarieties(),
      Puppy.getColors(),
      Puppy.getLocations(),
    ]);

    // Get price range - handle price parsing in JavaScript
    const allPuppies = await Puppy.find({}).select("price").lean();
    const prices = allPuppies.map((puppy) => {
      const priceStr = puppy.price.replace(/[$,]/g, "");
      return parseInt(priceStr) || 0;
    });

    const priceStats = [
      {
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
      },
    ];

    const responseData = {
      success: true,
      data: {
        categories: categoriesWithImages,
        filters: {
          breeds,
          varieties,
          colors,
          locations,
          genders: ["Male", "Female"],
        },
        priceRange: priceStats[0] || { minPrice: 0, maxPrice: 0 },
      },
    };

    console.log("Sending response:", JSON.stringify(responseData, null, 2));
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
