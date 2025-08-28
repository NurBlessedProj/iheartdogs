"use client";

import React, { useState, useEffect, useCallback } from "react";

export const dynamic = "force-dynamic";
import Image from "next/image";
import moment from "moment";
import {
  Heart,
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  MapPin,
  Calendar,
  Users,
  PawPrint,
  Clock,
  Eye,
  Video,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer.jsx/page";

const AvailablePuppies = () => {
  const [puppies, setPuppies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

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

  // Fetch categories and filters
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");
        const response = await fetch("/api/categories");
        const data = await response.json();
        console.log("Categories response:", data);
        if (data.success) {
          setCategories(data.data.categories);
          setPriceRange({
            min: data.data.priceRange.minPrice,
            max: data.data.priceRange.maxPrice,
          });
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch puppies with filters
  const fetchPuppies = useCallback(
    async (page = 1, newFilters = filters) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "12",
          ...newFilters,
        });

        console.log("Fetching puppies with params:", params.toString());
        const response = await fetch(`/api/puppies?${params}`);
        const data = await response.json();
        console.log("Puppies response:", data);

        if (data.success) {
          setPuppies(data.data);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching puppies:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // Handle URL parameters for initial filters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const breedFilter = urlParams.get("breed");

    if (breedFilter) {
      console.log("Setting initial breed filter from URL:", breedFilter);
      const initialFilters = { breed: breedFilter };
      setFilters(initialFilters);
      fetchPuppies(1, initialFilters);
    } else {
      fetchPuppies();
    }
  }, [fetchPuppies]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);
    fetchPuppies(1, newFilters);
  };

  const handlePriceChange = (min, max) => {
    const newFilters = { ...filters };
    if (min > 0) newFilters.minPrice = min;
    if (max < 10000) newFilters.maxPrice = max;
    setFilters(newFilters);
    fetchPuppies(1, newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    fetchPuppies(1, {});
    // Clear URL parameters
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", "/available-puppies");
    }
  };

  const handlePageChange = (page) => {
    fetchPuppies(page, filters);
  };

  if (loading && puppies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-bounce">
              <PawPrint className="w-24 h-24 text-blue-600 mx-auto" />
            </div>
            <div className="absolute inset-0 animate-ping">
              <PawPrint className="w-24 h-24 text-blue-400 mx-auto" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-sohne font-light text-lg">
            Loading puppies...
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Puppies background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4 font-playfair">
            Available Puppies
          </h1>
          <p className="text-xl text-blue-100 font-sohne font-light">
            Find your perfect companion from our carefully selected puppies
          </p>
          {filters.breed && (
            <div className="mt-4 flex items-center gap-3">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-sohne">
                Filtered by: {filters.breed}
              </span>
              <button
                onClick={clearFilters}
                className="text-blue-200 hover:text-white text-sm font-sohne underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
            Browse by Breed
          </h2>
          <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.breed}
                onClick={() => handleFilterChange("breed", category.breed)}
                className={`flex-shrink-0 p-4 rounded-xl text-center transition-all duration-300 font-sohne min-w-[140px] ${
                  filters.breed === category.breed
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                }`}
              >
                <div className="font-semibold">{category.breed}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-semibold text-gray-900 font-sohne">
                Filters
              </span>
            </div>
            {showFilters ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showFilters && (
            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sohne">
                    Gender
                  </label>
                  <select
                    value={filters.gender || ""}
                    onChange={(e) =>
                      handleFilterChange("gender", e.target.value || null)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sohne"
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sohne">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ""}
                      onChange={(e) =>
                        handlePriceChange(
                          parseInt(e.target.value),
                          filters.maxPrice
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sohne"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ""}
                      onChange={(e) =>
                        handlePriceChange(
                          filters.minPrice,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sohne"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-sohne"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Puppies Grid */}
        {puppies.length === 0 && !loading ? (
          <div className="text-center py-16 bg-white rounded-md shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-playfair">
              No puppies found
            </h3>
            <p className="text-gray-600 mb-4 font-sohne font-light">
              {pagination.total === 0
                ? "No puppies have been imported yet. Please run the import script first."
                : "No puppies match your current filters. Try adjusting your search criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 mb-8">
            {puppies.map((puppy) => (
              <div
                key={puppy._id}
                className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getFilteredImages(puppy.images)[0] || puppy.images[0]}
                    alt={puppy.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />

                  {puppy.videos &&
                    puppy.videos.length > 0 &&
                    puppy.videos[0] && (
                      <div className="absolute top-2 left-2">
                        <div className="p-2 bg-blue-600 text-white rounded-lg shadow-lg">
                          <Video className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 font-playfair">
                      {puppy.name}
                    </h3>
                    <span className="text-lg font-bold text-blue-600 font-sohne">
                      {puppy.price}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 font-sohne font-medium">
                    {puppy.breed}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 font-sohne font-light">
                      <Calendar className="w-4 h-4 mr-2" />
                      {puppy.age} old
                    </div>

                    {puppy.weight && (
                      <div className="flex items-center text-sm text-gray-500 font-sohne font-light">
                        <Users className="w-4 h-4 mr-2" />
                        {puppy.weight}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/puppy/${puppy._id}`)
                      }
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-sohne font-medium"
                    >
                      Get {puppy.name}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-sohne font-medium"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-600 font-sohne font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNext}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-sohne font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AvailablePuppies;
