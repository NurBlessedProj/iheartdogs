"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ChevronRight } from "lucide-react";

const GallerySection = () => {
  const [puppies, setPuppies] = useState([]);
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
    const fetchPuppies = async () => {
      try {
        const response = await fetch("/api/puppies?limit=8");
        const data = await response.json();
        if (data.success) {
          setPuppies(data.data);
        }
      } catch (error) {
        console.error("Error fetching puppies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPuppies();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-white via-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
                Our Gallery
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Puppies in
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                Action
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See our adorable puppies playing, learning, and growing in their
              loving environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-80 bg-gray-200 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
              Our Gallery
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Puppies in
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {" "}
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See our adorable puppies playing, learning, and growing in their
            loving environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {puppies.map((puppy, index) => {
            const filteredImages = getFilteredImages(puppy.images);
            const imageUrl = filteredImages[0] || puppy.images[0];

            return (
              <div
                key={puppy._id}
                className="relative h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={imageUrl}
                  alt={`${puppy.name} - ${puppy.breed}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-blue-200 text-sm font-medium">
                      {puppy.breed}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{puppy.name}</h3>
                  <p className="text-gray-200 text-sm">
                    {puppy.age} • {puppy.gender}
                  </p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <a
            href="/available-puppies"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-4 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>View All Puppies</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
