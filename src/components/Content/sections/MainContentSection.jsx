import React from "react";
import Image from "next/image";
import { ChevronRight, PawPrint, Shield, Heart, Star } from "lucide-react";

const MainContentSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
              Breed Highlights
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Discover Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {" "}
              Companion
            </span>
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              Our carefully selected breeds embody the perfect combination of
              intelligence, energy, and companionship. Each puppy is chosen for
              their exceptional temperament, health, and potential to become
              wonderful family members.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From energetic working breeds to gentle family companions, we
              offer a diverse selection of puppies that have been raised with
              love and care. Our breeding program focuses on producing healthy,
              well-socialized puppies that will bring joy and companionship to
              your home for years to come.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Health Guaranteed
                </h4>
                <p className="text-gray-600 text-xs">All puppies vaccinated</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Loving Care
                </h4>
                <p className="text-gray-600 text-xs">Raised with love</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Premium Quality
                </h4>
                <p className="text-gray-600 text-xs">Exceptional standards</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <PawPrint className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Family Ready
                </h4>
                <p className="text-gray-600 text-xs">Perfect companions</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/about"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 underline decoration-2 underline-offset-4"
            >
              <span>Learn more about our breeding program</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/available-puppies"
              className="inline-flex items-center border-2 border-blue-600 text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <span>View Available Puppies</span>
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Happy Puppy"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Health Guaranteed</p>
                <p className="text-sm text-gray-600">All puppies vaccinated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContentSection;
