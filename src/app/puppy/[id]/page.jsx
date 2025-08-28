"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Star,
  Play,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  PawPrint,
  Video,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer.jsx/page";

const PuppyDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [puppy, setPuppy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef(null);

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

  const filteredImages = puppy ? getFilteredImages(puppy.images) : [];

  useEffect(() => {
    const fetchPuppy = async () => {
      try {
        const response = await fetch(`/api/puppies/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setPuppy(data.data);
        }
      } catch (error) {
        console.error("Error fetching puppy:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPuppy();
    }
  }, [params.id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev === puppy.videos.length - 1 ? 0 : prev + 1
    );
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev === 0 ? puppy.videos.length - 1 : prev - 1
    );
  };

  const handleGetPuppy = () => {
    if (puppy) {
      // Store the selected puppy in localStorage for the orders page
      const selectedPuppy = {
        id: puppy._id,
        name: puppy.name,
        breed: puppy.breed,
        age: puppy.age,
        gender: puppy.gender,
        price: puppy.price,
        image: puppy.images && puppy.images.length > 0 ? puppy.images[0] : "",
        sex: puppy.gender, // For compatibility with orders page
      };
      localStorage.setItem("selectedPuppy", JSON.stringify(selectedPuppy));

      // Redirect to orders page
      router.push("/orders");
    }
  };

  if (loading) {
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
            Loading puppy details...
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

  if (!puppy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <PawPrint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4 font-playfair">
            Puppy not found
          </h2>
          <p className="text-gray-600 font-sohne">
            The puppy you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0">
          <Image
            src={filteredImages[0] || puppy.images[0]}
            alt={`${puppy.name} hero background`}
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => window.history.back()}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-6xl font-bold font-playfair">{puppy.name}</h1>
          </div>
          <div className="flex items-center gap-6 text-xl text-gray-200 font-sohne">
            <span>{puppy.breed}</span>
            <span>•</span>
            <span>{puppy.age} old</span>
            <span>•</span>
            <span>{puppy.gender}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column - Images, Videos and Basic Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Gallery */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <div className="relative h-[500px]">
                <Image
                  src={
                    filteredImages[currentImageIndex] ||
                    puppy.images[currentImageIndex]
                  }
                  alt={`${puppy.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />

                {/* Navigation Arrows */}
                {filteredImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}

                {/* Video Badge */}
                {puppy.videos && puppy.videos.length > 0 && puppy.videos[0] && (
                  <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Video Available
                  </div>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-6 left-6 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {filteredImages.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {filteredImages.length > 1 && (
                <div className="p-6 bg-white">
                  <div className="flex gap-3 overflow-x-auto">
                    {filteredImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? "border-gray-800"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${puppy.name} thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Video Section */}
            {puppy.videos && puppy.videos.length > 0 && puppy.videos[0] && (
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <div className="p-8 border-b border-gray-200 bg-white">
                  <h2 className="text-3xl font-bold text-gray-900 font-playfair flex items-center gap-3">
                    <Video className="w-8 h-8 text-gray-700" />
                    Videos of {puppy.name}
                  </h2>
                </div>

                <div className="relative">
                  <div className="relative h-[400px]">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={puppy.videos[currentVideoIndex]?.thumbnail}
                      controls
                    >
                      <source
                        src={
                          puppy.videos[currentVideoIndex]?.playableUrls
                            ?.directMp4
                        }
                        type="video/mp4"
                      />
                      <source
                        src={puppy.videos[currentVideoIndex]?.playableUrls?.hls}
                        type="application/x-mpegURL"
                      />
                      Your browser does not support the video tag.
                    </video>

                    {/* Video Navigation */}
                    {puppy.videos.length > 1 && (
                      <>
                        <button
                          onClick={prevVideo}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-all duration-300"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextVideo}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-all duration-300"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Video Thumbnails */}
                  {puppy.videos.length > 1 && (
                    <div className="p-6 bg-white">
                      <div className="flex gap-3 overflow-x-auto">
                        {puppy.videos.map((video, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentVideoIndex(index)}
                            className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                              index === currentVideoIndex
                                ? "border-gray-800"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <Image
                              src={
                                video.thumbnail ||
                                "/images/video-placeholder.jpg"
                              }
                              alt={`Video ${index + 1}`}
                              width={96}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-playfair">
                About {puppy.name}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg">{puppy.description}</p>
              </div>
            </div>

            {/* Parents Information */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-playfair">
                Parent Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mom */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                      {puppy.parents.mom.image ? (
                        <Image
                          src={puppy.parents.mom.image}
                          alt="Mother"
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Mother
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">
                        {puppy.parents.mom.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Breed:</span>
                      <span className="font-medium">
                        {puppy.parents.mom.breed}
                      </span>
                    </div>
                    {puppy.parents.mom.weight && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">
                          {puppy.parents.mom.weight}
                        </span>
                      </div>
                    )}
                    {puppy.parents.mom.color && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">
                          {puppy.parents.mom.color}
                        </span>
                      </div>
                    )}
                    {puppy.parents.mom.registration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registration:</span>
                        <span className="font-medium">
                          {puppy.parents.mom.registration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dad */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                      {puppy.parents.dad.image ? (
                        <Image
                          src={puppy.parents.dad.image}
                          alt="Father"
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Father
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">
                        {puppy.parents.dad.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Breed:</span>
                      <span className="font-medium">
                        {puppy.parents.dad.breed}
                      </span>
                    </div>
                    {puppy.parents.dad.weight && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">
                          {puppy.parents.dad.weight}
                        </span>
                      </div>
                    )}
                    {puppy.parents.dad.color && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">
                          {puppy.parents.dad.color}
                        </span>
                      </div>
                    )}
                    {puppy.parents.dad.registration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registration:</span>
                        <span className="font-medium">
                          {puppy.parents.dad.registration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price and Actions */}
          <div className="space-y-8">
            {/* Price and Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {puppy.price}
                </div>
                <p className="text-gray-600">Adoption Fee</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleGetPuppy}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Get {puppy.name}
                </button>
              </div>
            </div>

            {/* Puppy Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">
                Puppy Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Breed</span>
                  <span className="font-medium">{puppy.breed}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Age</span>
                  <span className="font-medium">{puppy.age}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Gender</span>
                  <span className="font-medium">{puppy.gender}</span>
                </div>
                {puppy.weight && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">{puppy.weight}</span>
                  </div>
                )}
                {puppy.color && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Color</span>
                    <span className="font-medium">{puppy.color}</span>
                  </div>
                )}
                {puppy.variety && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Variety</span>
                    <span className="font-medium">{puppy.variety}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Health & Care */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">
                Health & Care
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Health checked by veterinarian
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Up-to-date vaccinations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Dewormed and flea treated
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Health guarantee included
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a
                      href="tel:+12092661293"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      +1 (209) 266-1293
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <a
                      href="https://wa.me/12092661293"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      Send Message
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a
                      href="mailto:contact@iheartdogs.com"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      contact@iheartdogs.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PuppyDetails;
