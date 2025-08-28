"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer.jsx/page";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {
  Upload,
  ArrowLeft,
  PlusCircle,
  Camera,
  X,
  CheckCircle,
  Info,
} from "lucide-react";

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    breed: "Jack Russell Terrier",
    sex: "",
    age: "",
    status: "",
    description: "",
    image: "",
  });
  const navigation = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [formStep, setFormStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const notyf = new Notyf({
      position: { x: "right", y: "top" },
      duration: 3000,
    });

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        notyf.success("Puppy added successfully!");
        navigation.push("/pd-page/allpd");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      notyf.error("Error creating post. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage("");
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const nextStep = () => {
    setFormStep(2);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setFormStep(1);
  };

  const coatTypes = [
    "Smooth",
    "Broken",
    "Rough",
    "White & Tan",
    "Tricolor",
    "Black & White",
    "Brown & White",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <button
              onClick={() => navigation.push("/pd-page/allpd")}
              className="flex items-center text-amber-600 hover:text-amber-700 transition-colors mb-2"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to All Puppies
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Add New Puppy</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center ${
                formStep >= 1 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formStep >= 1
                    ? "bg-amber-100 text-amber-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium hidden sm:inline">
                Basic Info
              </span>
            </div>
            <div
              className={`w-8 h-1 ${
                formStep >= 2 ? "bg-amber-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                formStep >= 2 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formStep >= 2
                    ? "bg-amber-100 text-amber-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium hidden sm:inline">
                Details & Photo
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formStep === 1 ? (
              <>
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <PlusCircle className="w-5 h-5 text-amber-500 mr-2" />
                    Basic Puppy Information
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Enter the essential details about the new Jack Russell
                    Terrier puppy
                  </p>
                </div>

                {/* Form Grid - Step 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 px-4 py-3"
                      required
                      placeholder="Puppy's name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Gender<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 px-4 py-3"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Age<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g., 8 weeks"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 px-4 py-3"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Status<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 px-4 py-3"
                      required
                    >
                      <option value="">Select status</option>
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      !formData.name ||
                      !formData.sex ||
                      !formData.age ||
                      !formData.status
                    }
                    className="w-full sm:w-auto px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Details & Photo
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Camera className="w-5 h-5 text-amber-500 mr-2" />
                    Puppy Details & Photo
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Add more details and upload a photo of the Jack Russell
                    Terrier puppy
                  </p>
                </div>

                {/* Form Grid - Step 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Coat Type/Color<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 px-4 py-3"
                      required
                    >
                      <option value="Jack Russell Terrier">
                        Jack Russell Terrier (Standard)
                      </option>
                      {coatTypes.map((type) => (
                        <option
                          key={type}
                          value={`Jack Russell Terrier - ${type}`}
                        >
                          Jack Russell Terrier - {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Price<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="block w-full pl-8 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 px-4 py-3"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the puppy's temperament, characteristics, and any special traits..."
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 px-4 py-3"
                    required
                  />
                </div>

                {/* Image Upload Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Puppy Photo<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-amber-300 transition-colors">
                    <div className="space-y-2 text-center">
                      {previewImage ? (
                        <div className="relative w-64 h-64 mx-auto">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            fill
                            className="rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={clearImage}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="bg-amber-50 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto">
                          <Upload className="h-10 w-10 text-amber-500" />
                        </div>
                      )}
                      <div className="flex flex-col text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-amber-50 rounded-lg py-2 px-4 font-medium text-amber-700 hover:bg-amber-100 transition-colors mx-auto">
                          <span>
                            {previewImage ? "Change photo" : "Upload a photo"}
                          </span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                            required={!previewImage}
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips Box */}
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 flex items-start">
                  <Info className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Photo Tips:</p>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      <li>
                        Use a clear, well-lit photo that shows the puppy clearly
                      </li>
                      <li>Include the full body in the frame if possible</li>
                      <li>
                        Natural light works best for showcasing coat colors
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between pt-6 gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 rounded-full text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !formData.image ||
                      !formData.description ||
                      !formData.price
                    }
                    className="px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Add Puppy
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </main>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-gray-700 font-medium">Adding puppy...</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Page;
