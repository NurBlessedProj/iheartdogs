import React, { useState } from "react";
import { Shield, Brain, Award, ChevronRight } from "lucide-react";

const PuppyStandardsSection = () => {
  const [expandedCards, setExpandedCards] = useState({});

  const lifespan = [
    { label: "Exercise Needs", value: 90 },
    { label: "Intelligence", value: 85 },
    { label: "Trainability", value: 80 },
    { label: "Family Friendly", value: 75 },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-lg mb-6">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
              Quality Standards
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Puppy
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {" "}
              Standards
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We maintain the highest standards for all our puppies, ensuring they
            meet exceptional quality benchmarks. Every puppy undergoes rigorous
            health checks, temperament assessments, and receives comprehensive
            care before joining your family.
          </p>
        </div>

        {/* Standards Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Health Guarantee
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              All puppies come with comprehensive health guarantees, including
              vaccinations, deworming, and veterinary health certificates.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Temperament Tested
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Each puppy undergoes thorough temperament testing to ensure they
              have the perfect personality for family life.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Pedigree Verified
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Purebred puppies come with verified pedigrees and registration
              papers from recognized kennel clubs.
            </p>
          </div>
        </div>

        {/* Detailed Standards */}
        <div className="grid md:grid-cols-2 gap-8">
          {lifespan.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.label === "Exercise Needs" &&
                      "High energy levels requiring daily physical activity and mental stimulation"}
                    {item.label === "Intelligence" &&
                      "Exceptional problem-solving abilities and quick learning capacity"}
                    {item.label === "Trainability" &&
                      "Excellent response to positive reinforcement and consistent training methods"}
                    {item.label === "Family Friendly" &&
                      "Perfect temperament for families with children and other pets"}
                  </p>
                </div>
                <div className="text-right ml-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">
                      {item.value}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    Standard
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="text-blue-600 font-semibold">
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-2000 ease-out shadow-sm"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>Minimum: 70%</span>
                  <span>Target: 100%</span>
                </div>
              </div>

              {/* Additional Details - Expandable per card */}
              <div
                className={`mt-6 pt-6 border-t border-gray-100 transition-all duration-500 ${
                  expandedCards[index]
                    ? "max-h-96 opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-semibold text-gray-900 text-sm">
                        Health Check
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      Veterinary certified
                    </span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-semibold text-gray-900 text-sm">
                        Vaccinations
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      Age-appropriate
                    </span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-semibold text-gray-900 text-sm">
                        Socialization
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      Early exposure
                    </span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-semibold text-gray-900 text-sm">
                        Documentation
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      Complete records
                    </span>
                  </div>
                </div>
              </div>

              {/* Show More/Less Button for each card */}
              <div className="mt-6 flex justify-start">
                <button
                  onClick={() =>
                    setExpandedCards((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 group"
                >
                  <span className="border-b border-blue-600 group-hover:border-blue-700 transition-colors">
                    {expandedCards[index] ? "Show Less" : "Show More"}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                      expandedCards[index] ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Assurance Statement */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Quality Assurance Commitment
            </h3>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              We are committed to maintaining the highest standards in puppy
              breeding and care. Every puppy in our program is carefully
              selected, thoroughly health-checked, and lovingly raised to ensure
              they become the perfect companion for your family.
            </p>
            <div className="mt-6 flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-blue-200 text-sm">Health Guaranteed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">30-Day</div>
                <div className="text-blue-200 text-sm">Health Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PuppyStandardsSection;
