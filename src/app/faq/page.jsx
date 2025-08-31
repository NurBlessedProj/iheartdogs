"use client";
import React, { useState } from "react";

export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer.jsx/page";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Filter,
} from "lucide-react";
import Image from "next/image";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "breed", name: "Breed Information" },
    { id: "health", name: "Health & Care" },
    { id: "training", name: "Training & Behavior" },
    { id: "puppies", name: "Puppies & Adoption" },
  ];

  const faqs = [
    {
      question: "What should I know about different dog breeds?",
      answer:
        "Each dog breed has unique characteristics, energy levels, and care requirements. Some breeds are known for their high energy and need lots of exercise, while others are more laid-back. Consider factors like size, temperament, grooming needs, and activity level when choosing a breed. Our team can help match you with the perfect breed based on your lifestyle and preferences. All our puppies come from reputable breeders who prioritize health and temperament.",
      category: "breed",
    },
    {
      question: "What size should I expect for different breeds?",
      answer:
        "Dog sizes vary greatly by breed. Small breeds typically weigh under 25 pounds, medium breeds range from 25-60 pounds, and large breeds can weigh 60+ pounds. Consider your living space, lifestyle, and ability to handle different sizes when choosing. Our team can provide specific size information for each breed we offer and help you find the right size for your home and family.",
      category: "breed",
    },
    {
      question: "What is the typical life expectancy of dogs?",
      answer:
        "Life expectancy varies by breed and size. Generally, smaller breeds tend to live longer (12-16 years) than larger breeds (8-12 years). With proper care, nutrition, and regular veterinary check-ups, most dogs can live healthy, happy lives. Mixed breeds often have fewer genetic health issues and may live longer. We provide health guarantees and can discuss expected lifespan for specific breeds we offer.",
      category: "health",
    },
    {
      question: "How much grooming do different breeds require?",
      answer:
        "Grooming needs vary significantly by breed. Short-haired breeds typically need weekly brushing, while long-haired breeds may require daily brushing and professional grooming. Some breeds are low-shedding, others shed seasonally or year-round. Regular nail trimming, ear cleaning, and dental care are important for all dogs. We can provide specific grooming information for each breed we offer and connect you with local groomers if needed.",
      category: "health",
    },
    {
      question: "Are dogs generally good with children?",
      answer:
        "Many dogs can be excellent with children when properly socialized and trained. However, temperament varies by breed and individual dog. Some breeds are naturally more patient and gentle with children, while others may be too energetic or protective. Supervision is always recommended when children and dogs interact. We can help match you with breeds known for being family-friendly and provide guidance on introducing your new puppy to children safely.",
      category: "training",
    },
    {
      question: "How much exercise do different breeds need?",
      answer:
        "Exercise requirements vary greatly by breed. High-energy breeds may need 1-2 hours of exercise daily, while lower-energy breeds might be satisfied with 30-60 minutes. Exercise should include walks, play sessions, and mentally stimulating activities. Without adequate exercise, dogs can become destructive or develop behavioral problems. We can provide specific exercise recommendations for each breed we offer and help you choose a dog that matches your activity level.",
      category: "training",
    },
    {
      question: "What health issues should I be aware of?",
      answer:
        "Different breeds may be prone to specific health conditions. Common issues across breeds include hip dysplasia, eye problems, dental issues, and allergies. Mixed breeds often have fewer genetic health issues due to genetic diversity. All our puppies come with health guarantees and are from health-tested parents. We provide detailed health information for each breed and can connect you with veterinarians for ongoing care.",
      category: "health",
    },
    {
      question: "What living environment is best for different breeds?",
      answer:
        "Living environment needs vary by breed. Some breeds adapt well to apartments with sufficient exercise, while others need large yards. Consider factors like size, energy level, and noise tolerance when choosing a breed for your living situation. We can help match you with breeds suitable for your home type and lifestyle. All dogs need secure fencing, mental stimulation, and shouldn't be left alone for extended periods.",
      category: "breed",
    },
    {
      question: "How trainable are different dog breeds?",
      answer:
        "Trainability varies by breed and individual dog. Some breeds are naturally eager to please and learn quickly, while others may be more independent. Intelligence doesn't always equal easy training - some smart breeds can be stubborn. Training should be consistent, positive, and engaging. Short, fun training sessions work best for most dogs. We can provide training guidance and connect you with local trainers to help with your new puppy.",
      category: "training",
    },
    {
      question: "How do I select the right puppy?",
      answer:
        "When selecting a puppy, look for one that is alert, curious, and neither overly shy nor aggressive. Ensure the puppy comes from health-tested parents and a reputable breeder who prioritizes temperament and health over appearance. Meet the puppy's parents if possible to get an idea of adult temperament. Consider your lifestyle, activity level, and living situation when choosing. We can help match you with the perfect puppy based on your preferences and needs.",
      category: "puppies",
    },
    {
      question: "What should I feed my puppy?",
      answer:
        "Puppies thrive on high-quality dog food appropriate for their age, size, and activity level. Active breeds may benefit from formulas designed for active dogs. Portion control is important to prevent obesity. Feeding amounts vary by breed and individual needs - typically 1-3 cups daily for adults, divided into two meals. Always ensure fresh water is available. We provide feeding guidelines for each breed and can connect you with veterinarians for specific dietary recommendations.",
      category: "health",
    },
    {
      question: "Do dogs bark a lot?",
      answer:
        "Barking tendencies vary by breed and individual dog. Some breeds are naturally more vocal and alert, while others are quieter. Dogs may bark to communicate, alert to visitors, or express needs. Early training can help manage excessive barking, but potential owners should consider their living situation and noise tolerance when choosing a breed. We can help match you with breeds that match your preferences for vocalization.",
      category: "training",
    },
    {
      question: "How do I prepare my home for a new puppy?",
      answer:
        "Preparing your home for a new puppy involves thorough puppy-proofing. Secure or remove small items they might chew or swallow, protect electrical cords, and use baby gates to restrict access to certain areas if needed. Check your yard fencing for gaps or weak spots. Prepare a quiet area with a crate or bed, and gather supplies including food and water bowls, appropriate toys for chewing, a collar and leash, and grooming tools. Having plenty of appropriate chew toys is essential to redirect their natural chewing instincts.",
      category: "puppies",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-700/70" />
        </div>
        <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4">
          <span className="text-amber-300 uppercase tracking-wider font-semibold mb-2">
            Knowledge Center
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-center text-amber-100 max-w-3xl">
            Everything you need to know about our premium puppies
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-md py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-amber-50 transition-colors"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center">
                    <HelpCircle
                      className={`w-5 h-5 mr-3 ${
                        openIndex === index
                          ? "text-amber-500"
                          : "text-amber-400"
                      }`}
                    />
                    <span className="font-semibold text-lg text-gray-800">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      openIndex === index ? "bg-amber-100" : "bg-gray-100"
                    }`}
                  >
                    {openIndex === index ? (
                      <ChevronUp
                        className={`w-5 h-5 ${
                          openIndex === index
                            ? "text-amber-500"
                            : "text-gray-500"
                        }`}
                      />
                    ) : (
                      <ChevronDown
                        className={`w-5 h-5 ${
                          openIndex === index
                            ? "text-amber-500"
                            : "text-gray-500"
                        }`}
                      />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-[800px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-5 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs uppercase tracking-wider text-amber-600 font-medium">
                        {categories.find((cat) => cat.id === faq.category)
                          ?.name || faq.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No results found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any questions matching your search. Try different
              keywords or browse all categories.
            </p>
            <button
              className="mt-6 px-6 py-2 bg-amber-100 text-amber-700 font-medium rounded-full hover:bg-amber-200 transition-colors"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            We're here to help! Contact us for more information about our
            premium puppies and adoption process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors duration-300"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Us
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center bg-transparent text-white border border-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors duration-300"
            >
              Learn About Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;
