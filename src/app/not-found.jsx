"use client";
import React from "react";

export const dynamic = "force-dynamic";
import { Home, Search, ArrowLeft, MapPin, HelpCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Main Error Section */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-amber-100 rounded-full animate-pulse opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <Paw className="w-16 h-16 text-amber-600" /> */}
            </div>
          </div>
          <h1 className="text-9xl font-bold text-amber-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Looks like this page has gone for a walk with the Jack Russells!
            Don't worry, you can find your way back home.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors duration-300 w-full sm:w-auto shadow-sm"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/available-puppies"
            className="flex items-center justify-center gap-2 bg-white border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-full hover:bg-amber-50 transition-colors duration-300 w-full sm:w-auto"
          >
            {/* <Paw className="w-5 h-5" /> */}
            <span>View Our Puppies</span>
          </Link>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 flex items-center justify-center gap-2 text-gray-600 hover:text-amber-600 transition-colors duration-300 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>

        {/* Helpful Links */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            You might find these helpful:
          </h3>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/available-puppies"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors duration-300"
            >
              {/* <Paw className="w-4 h-4" /> */}
              <span>Available Puppies</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors duration-300"
            >
              <HelpCircle className="w-4 h-4" />
              <span>About Us</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors duration-300"
            >
              <MapPin className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
            <Link
              href="/faq"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors duration-300"
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-gray-500 text-sm mt-12">
          Jack Russell Home • Bringing joy to families since 2010
        </p>
      </div>

      {/* Add a custom animation for the paw print */}
      <style jsx global>{`
        @keyframes ping-slow {
          0% {
            transform: scale(0.8);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.2;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
