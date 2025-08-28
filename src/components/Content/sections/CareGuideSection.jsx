import React from "react";
import { Activity, Bone, Clock, ChevronRight } from "lucide-react";

const CareGuideSection = () => {
  const careGuides = [
    {
      icon: <Activity className="w-6 h-6 text-orange-600" />,
      title: "Daily Exercise",
      description:
        "Requires vigorous daily exercise to channel their abundant energy",
    },
    {
      icon: <Bone className="w-6 h-6 text-amber-600" />,
      title: "Grooming",
      description:
        "Low-maintenance coat needs weekly brushing to remove loose hair",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Training",
      description:
        "Consistent, positive training with mental stimulation is essential",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
            Caring for Your Puppy
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Essential Care
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {" "}
            Guide
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to provide the best care for your new puppy with our
          comprehensive guide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {careGuides.map((guide, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl border border-gray-100 group"
          >
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">{guide.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {guide.title}
              </h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {guide.description}
            </p>
            <div className="pt-6 border-t border-gray-100">
              <a
                href="/health"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group-hover:translate-x-2 transition-all duration-300"
              >
                <span>Learn more</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <a
          href="/care-guide"
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-4 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span>Download Complete Care Guide</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </a>
      </div>
    </section>
  );
};

export default CareGuideSection;
