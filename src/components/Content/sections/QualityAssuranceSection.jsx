import React from "react";
import { PawPrint, Brain } from "lucide-react";

const QualityAssuranceSection = () => {
  return (
    <section className="bg-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-300 font-medium uppercase tracking-wider">
            Our Standards
          </span>
          <h2 className="text-4xl font-bold mt-2">Quality Assurance</h2>
          <div className="w-24 h-1 bg-blue-300 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-blue-700 p-2 rounded-full mr-4">
                <PawPrint className="w-6 h-6 text-blue-300" />
              </span>
              Health & Care
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center">
                <span className="w-4 h-4 bg-blue-400 rounded-full mr-3"></span>
                <div>
                  <span className="font-medium block">Vaccinations:</span>
                  <span className="text-blue-100">
                    All puppies receive age-appropriate vaccinations
                  </span>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-blue-400 rounded-full mr-3"></span>
                <div>
                  <span className="font-medium block">Health Check:</span>
                  <span className="text-blue-100">
                    Veterinary examination before adoption
                  </span>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-blue-400 rounded-full mr-3"></span>
                <div>
                  <span className="font-medium block">Socialization:</span>
                  <span className="text-blue-100">
                    Early socialization with people and other animals
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-blue-700 p-2 rounded-full mr-4">
                <Brain className="w-6 h-6 text-blue-300" />
              </span>
              Breeding Standards
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center">
                <span className="w-4 h-4 bg-blue-400 rounded-full mr-3"></span>
                <div>
                  <span className="font-medium block">Pedigree:</span>
                  <span className="text-blue-100">
                    Purebred puppies from registered parents
                  </span>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-blue-400 rounded-full mr-3"></span>
                <div>
                  <span className="font-medium block">Temperament:</span>
                  <span className="text-blue-100">
                    Careful selection for excellent family-friendly temperaments
                  </span>
                </div>
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-blue-400 rounded-full mr-3"></span>
                <div>
                  <span className="font-medium block">Environment:</span>
                  <span className="text-blue-100">
                    Raised in clean, loving home environments
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityAssuranceSection;
