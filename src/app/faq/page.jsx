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
      question: "What are Jack Russell Terriers known for?",
      answer:
        "Jack Russell Terriers are known for their high energy, intelligence, and bold personality. Originally bred for fox hunting, they're tenacious, athletic, and have a strong prey drive. These spirited dogs are extremely intelligent, which makes them highly trainable but also means they need mental stimulation. They're known for their distinctive appearance with a predominantly white coat, and their lively, fearless temperament makes them excellent companions for active individuals and families.",
      category: "breed",
    },
    {
      question: "How big do Jack Russell Terriers get?",
      answer:
        "Jack Russell Terriers are small dogs, typically standing 10-15 inches (25-38 cm) tall at the shoulder. They generally weigh between 13-17 pounds (6-8 kg). Despite their small size, they are very sturdy and athletic dogs with a compact, muscular build that allows them to be incredibly agile and fast.",
      category: "breed",
    },
    {
      question: "What is the life expectancy of a Jack Russell Terrier?",
      answer:
        "Jack Russell Terriers typically have a long lifespan compared to many other breeds. With proper care, nutrition, and regular veterinary check-ups, they usually live 13-16 years, though many can live even longer. Their robust health and relatively few breed-specific genetic issues contribute to their longevity.",
      category: "health",
    },
    {
      question: "Do Jack Russell Terriers require a lot of grooming?",
      answer:
        "Jack Russell Terriers have a relatively low-maintenance coat that comes in three varieties: smooth, broken, or rough. All types shed moderately year-round with heavier seasonal shedding. Weekly brushing is typically sufficient for smooth coats, while broken and rough coats may need brushing 2-3 times per week and occasional hand-stripping to remove dead hair. Regular nail trimming, ear cleaning, and dental care are also important parts of their grooming routine.",
      category: "health",
    },
    {
      question: "Are Jack Russell Terriers good with children?",
      answer:
        "Jack Russell Terriers can be good with children, especially when raised with them, but supervision is always recommended. Their high energy and sometimes boisterous nature means they're better suited to families with older children who understand how to interact appropriately with dogs. Jack Russells are sturdy despite their size, but they can be impatient and may not tolerate rough handling. Early socialization and training are essential for a Jack Russell in a family with children.",
      category: "training",
    },
    {
      question: "How much exercise do Jack Russell Terriers need?",
      answer:
        "Jack Russell Terriers are extremely energetic and require significant daily exercise—at least 1-2 hours per day. This should include walks, play sessions, and mentally stimulating activities. Without adequate exercise, they can become destructive or develop behavioral problems. They excel at dog sports like agility, flyball, and earthdog trials. Remember that a tired Jack Russell is a well-behaved Jack Russell!",
      category: "training",
    },
    {
      question: "What health issues are common in Jack Russell Terriers?",
      answer:
        "While Jack Russell Terriers are generally healthy, they can be prone to certain conditions including patellar luxation (slipped kneecaps), eye disorders like lens luxation and cataracts, deafness (especially in predominantly white dogs), and Legg-Calvé-Perthes disease. Some may also develop dental issues or allergies. Regular veterinary check-ups and dental care can help catch and address these issues early.",
      category: "health",
    },
    {
      question:
        "What is the best living environment for a Jack Russell Terrier?",
      answer:
        "Jack Russell Terriers adapt well to various living situations, but they thrive in homes with secure fenced yards where they can run and play safely. They can live in apartments if given sufficient exercise and mental stimulation. Due to their strong prey drive and tendency to dig or escape, secure fencing is essential. They're not well-suited to being left alone for long periods, as they can become bored and destructive. An active household that can provide plenty of exercise and companionship is ideal.",
      category: "breed",
    },
    {
      question: "Are Jack Russell Terriers easy to train?",
      answer:
        "Jack Russell Terriers are highly intelligent and can learn quickly, but they can also be independent and stubborn. Training should be consistent, positive, and engaging to keep their attention. Short, fun training sessions work best due to their sometimes limited attention span. They respond well to positive reinforcement techniques and enjoy having 'jobs' to do. Early socialization and training are essential to channel their energy and intelligence positively.",
      category: "training",
    },
    {
      question: "How do I select a Jack Russell Terrier puppy?",
      answer:
        "When selecting a Jack Russell puppy, look for one that is alert, curious, and neither overly shy nor aggressive. Ensure the puppy comes from health-tested parents and a reputable breeder who prioritizes temperament and health over appearance. Meet the puppy's parents if possible to get an idea of adult temperament. Consider whether a smooth, broken, or rough coat best suits your lifestyle, and whether you prefer a more active or slightly calmer puppy within the litter.",
      category: "puppies",
    },
    {
      question: "What should I feed my Jack Russell Terrier?",
      answer:
        "Jack Russell Terriers thrive on high-quality dog food appropriate for their age, size, and activity level. Due to their high energy, they often benefit from formulas designed for active dogs. Portion control is important as they can gain weight easily despite their activity. Adult Jack Russells typically need 1-1.5 cups of dry food daily, divided into two meals. Always ensure fresh water is available, and consult your veterinarian for specific dietary recommendations based on your dog's individual needs.",
      category: "health",
    },
    {
      question: "Do Jack Russell Terriers bark a lot?",
      answer:
        "Yes, Jack Russell Terriers tend to be vocal dogs. They were bred to bark when they located prey during hunts, and this trait remains strong in the breed. They're alert and will bark to announce visitors or unusual activities. Early training can help manage excessive barking, but potential owners should be prepared for a dog that will likely be more vocal than many other breeds.",
      category: "training",
    },
    {
      question: "How do I prepare my home for a Jack Russell Terrier puppy?",
      answer:
        "Preparing your home for a Jack Russell puppy involves thorough puppy-proofing due to their curious and mischievous nature. Secure or remove small items they might chew or swallow, protect electrical cords, and use baby gates to restrict access to certain areas if needed. Check your yard fencing for gaps or weak spots, as Jack Russells are escape artists. Prepare a quiet area with a crate or bed, and gather supplies including food and water bowls, appropriate toys for chewing, a collar and leash, and grooming tools. Having plenty of appropriate chew toys is essential to redirect their natural chewing instincts.",
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
              "url('https://www.akc.org/wp-content/uploads/2017/11/Jack-Russell-Terrier-head-portrait-outdoors.jpg')",
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
            Everything you need to know about Jack Russell Terriers
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
            We're here to help! Contact us for more information about our Jack
            Russell Terriers.
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
