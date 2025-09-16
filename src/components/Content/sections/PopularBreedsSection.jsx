"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const PopularBreedsSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter images to get only unique high-quality versions
  const getFilteredImages = (images) => {
    if (!images || images.length === 0) return [];

    const filteredImages = [];
    const seenBaseUrls = new Set();

    images.forEach((imageUrl) => {
      // Extract the base URL (everything before the last underscore and extension)
      const urlParts = imageUrl.split("/");
      const filename = urlParts[urlParts.length - 1];
      const baseUrl = filename.split("_")[0]; // Get the photo ID (e.g., "503898717")

      if (seenBaseUrls.has(baseUrl)) return;

      // Prefer HD or large-resize versions
      if (imageUrl.includes("_hd.") || imageUrl.includes("_large-resize.")) {
        filteredImages.push(imageUrl);
        seenBaseUrls.add(baseUrl);
      }
    });

    // If no HD versions found, take the first unique image for each photo ID
    if (filteredImages.length === 0) {
      images.forEach((imageUrl) => {
        const urlParts = imageUrl.split("/");
        const filename = urlParts[urlParts.length - 1];
        const baseUrl = filename.split("_")[0];

        if (!seenBaseUrls.has(baseUrl)) {
          filteredImages.push(imageUrl);
          seenBaseUrls.add(baseUrl);
        }
      });
    }

    return filteredImages;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories from /api/categories...");
        const response = await fetch("/api/categories");
        const data = await response.json();
        console.log("Categories response:", data);

        if (data.success) {
          console.log("Setting categories:", data.data.categories);
          setCategories(data.data.categories);
        } else {
          console.error("Categories API returned error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-80 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="text-center mb-16">
        <span className="text-blue-600 font-medium uppercase tracking-wider text-sm">
          Popular Breeds
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Our Customers' Favorite Breeds
        </h2>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Discover the most beloved breeds that families choose for their
          perfect companions.
        </p>
      </div>

      {/* Breed Carousel */}
      <div className="relative">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No breeds found</p>
            <p className="text-gray-500">
              Please check if puppies have been imported to the database.
            </p>
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-12 scrollbar-hide gap-4 md:gap-6">
            {console.log("Rendering categories:", categories)}
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/available-puppies?breed=${encodeURIComponent(
                  category.breed
                )}`}
                className="flex-shrink-0 w-64 md:w-80 group cursor-pointer"
              >
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 mb-4">
                  <Image
                    src={
                      category.sampleImage ||
                      "/images/pexels-annpeach-12309285.jpg"
                    }
                    alt={category.breed}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.breed}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.breed}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-blue-600 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced CTA Button */}
      <div className="text-center mt-16">
        <Link
          href="/available-puppies"
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-10 py-4 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span>Browse all breeds</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default PopularBreedsSection;
