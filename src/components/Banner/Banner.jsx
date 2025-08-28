"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Banner({
  spanText,
  h2Text,
  diff,
  pText,
  img,
  button,
  location,
  height = "h-[500px]",
  overlay = true,
}) {
  const path = usePathname();

  return (
    <div className="relative w-full">
      <div className={`relative w-full ${height}`}>
        {/* Image Container */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={img}
            alt={h2Text || "Jack Russell Terrier"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-blue-700/20" />
          )}
        </div>

        {/* Content Container */}
        <div
          className={`relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <div className="flex flex-col justify-center h-full text-center md:text-left">
            {spanText && (
              <span className="text-lg md:text-xl text-white mb-2 font-medium">
                {spanText}
              </span>
            )}
            {h2Text && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
                {h2Text}
              </h2>
            )}
            {pText && (
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
                {pText}
              </p>
            )}
            {button && (
              <div className={`${diff ? "text-center md:text-left" : ""}`}>
                <Link
                  href={location}
                  className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg 
                    font-semibold hover:bg-blue-700 transition-colors duration-300 
                    shadow-lg hover:shadow-xl"
                >
                  {button}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
