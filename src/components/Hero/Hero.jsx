"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

function Hero() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchValue.trim()) {
      const query = encodeURIComponent(searchValue.trim());
      router.push(`/available-puppies?search=${query}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4 z-10">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center drop-shadow-lg">
          Where puppy love begins
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-center mb-8 text-blue-100 drop-shadow-md">
          Your trusted puppy adoption service
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by breed or puppy name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 bg-blue-700 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/available-puppies"
          className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          Browse all puppies
        </Link>
      </div>
    </div>
  );
}

export default Hero;
