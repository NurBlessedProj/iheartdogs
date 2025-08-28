import React from "react";

const CTASection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Ready to Welcome a Puppy Into Your Home?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Our puppies are raised with love and care to ensure they become
          perfect companions for your family.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/available-puppies"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            View Available Puppies
          </a>
          <a
            href="/contact"
            className="inline-block bg-gray-100 text-gray-800 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
