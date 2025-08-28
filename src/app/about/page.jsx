"use client";
import Navbar from "@/components/Navbar/Navbar";

export const dynamic = "force-dynamic";
import React from "react";
import Footer from "@/components/Footer.jsx/page";
import {
  Heart,
  Shield,
  Award,
  Users,
  CheckCircle,
  Clock,
  ChevronDown,
  Zap,
  Brain,
  Medal,
  Smile,
  MapPin,
  Calendar,
  Lightbulb,
  Target,
} from "lucide-react";
import Image from "next/image";

function AboutPage() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  };

  const features = [
    {
      icon: <Heart className="w-10 h-10 text-blue-600" />,
      title: "Passionate Care",
      description:
        "Every puppy in our program receives dedicated attention and love from experienced handlers.",
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Health Guaranteed",
      description:
        "Comprehensive health screenings and genetic testing for all our puppies.",
    },
    {
      icon: <Medal className="w-10 h-10 text-blue-600" />,
      title: "Champion Bloodlines",
      description:
        "Our breeding program maintains the highest standards of heritage and breed excellence.",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Family Support",
      description:
        "Lifetime guidance and support for all families who adopt our puppies.",
    },
  ];

  const timeline = [
    {
      year: "2009",
      title: "Our Beginning",
      description:
        "Founded our puppy breeding program with a focus on temperament and health.",
    },
    {
      year: "2012",
      title: "Expanded Services",
      description:
        "Introduced comprehensive training programs and expanded our breeding facilities.",
    },
    {
      year: "2015",
      title: "National Recognition",
      description:
        "Received recognition for our breeding standards and healthy puppy lines.",
    },
    {
      year: "2020",
      title: "Global Reach",
      description:
        "Began serving families internationally, bringing joy to homes across the world.",
    },
    {
      year: "Today",
      title: "Continued Excellence",
      description:
        "Continuing our mission to breed the healthiest, most well-tempered puppies.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Custom Banner */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Puppy breeding program"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70" />
        </div>

        {/* Banner Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-white px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Line */}
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-8 animate-pulse" />

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-playfair">
              About Our Passion
            </h1>

            {/* Subtitle with gradient text */}
            <div className="mb-8">
              <span className="text-xl md:text-2xl font-light text-blue-200 font-sohne">
                Breeding Exceptional Puppies Since 2009
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-300">15+</div>
                <div className="text-sm uppercase tracking-wider mt-1 font-sohne">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-300">500+</div>
                <div className="text-sm uppercase tracking-wider mt-1 font-sohne">
                  Happy Families
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-300">100%</div>
                <div className="text-sm uppercase tracking-wider mt-1 font-sohne">
                  Satisfaction
                </div>
              </div>
            </div>

            {/* Scroll Down Button */}
            <button
              onClick={scrollToContent}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center 
                text-white/80 hover:text-white transition-colors duration-300"
            >
              <span className="text-sm uppercase tracking-wider mb-2 font-sohne">
                Discover Our Story
              </span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-50 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-900/50 to-transparent" />
      </div>

      {/* Rest of the content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-medium font-sohne">
            WHO WE ARE
          </span>
          <h2 className="text-4xl font-bold mt-2 text-gray-900 font-playfair">
            Our Breeding Philosophy
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-8"></div>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-lg font-sohne">
            At the heart of our breeding program is a deep love for puppies. We
            are dedicated to producing puppies with exceptional temperament,
            intelligence, and health. Our puppies are bred to be versatile
            companions – equally at home as family pets, sporting partners, or
            show dogs. We prioritize genetic health, proper socialization, and
            maintaining the true character of these remarkable breeds.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 group"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-playfair">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-sohne">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Our Story Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Puppy breeding program"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <span className="text-blue-600 font-medium font-sohne">
                OUR STORY
              </span>
              <h2 className="text-3xl font-bold mt-2 mb-6 text-gray-900 font-playfair">
                A Legacy of Excellence
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg font-sohne">
                Our journey began in 2009 with a passion for puppies and a
                vision to breed dogs that exemplify the best qualities of these
                remarkable breeds. What started as a small family operation has
                grown into a respected breeding program known for producing
                puppies with exceptional temperament, intelligence, and health.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg font-sohne">
                Over the years, we've refined our breeding practices, expanded
                our knowledge, and built relationships with veterinarians,
                trainers, and other experts to ensure we're providing the best
                possible start for our puppies. Our commitment to excellence has
                never wavered, and we continue to dedicate ourselves to
                preserving and enhancing the breeds we work with.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-blue-50 px-6 py-3 rounded-full flex items-center">
                  <Zap className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-800 font-medium font-sohne">
                    High Energy
                  </span>
                </div>
                <div className="bg-blue-50 px-6 py-3 rounded-full flex items-center">
                  <Brain className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-800 font-medium font-sohne">
                    Intelligent
                  </span>
                </div>
                <div className="bg-blue-50 px-6 py-3 rounded-full flex items-center">
                  <Smile className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-800 font-medium font-sohne">
                    Friendly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-medium font-sohne">
              OUR JOURNEY
            </span>
            <h2 className="text-4xl font-bold mt-2 text-gray-900 font-playfair">
              Our Breeding Timeline
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className={`flex items-center justify-${
                      index % 2 === 0 ? "start" : "end"
                    } md:justify-${
                      index % 2 === 0 ? "end" : "start"
                    } md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-blue-600 font-semibold font-sohne">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-sohne">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Circle marker */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
              <div className="flex items-center mb-6">
                <Target className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900 font-playfair">
                  Our Commitment
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-sohne">
                    Expert guidance throughout your puppy journey, from
                    selection to lifelong care
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-sohne">
                    Comprehensive health testing and genetic screening for all
                    our puppies
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-sohne">
                    Early socialization and environmental enrichment for
                    well-adjusted puppies
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-sohne">
                    Ongoing support and resources for training, nutrition, and
                    healthcare needs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-8 rounded-xl shadow-xl">
              <div className="flex items-center mb-6">
                <Lightbulb className="w-6 h-6 text-blue-300 mr-3" />
                <h2 className="text-3xl font-bold font-playfair">
                  Why Choose Us?
                </h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-blue-300" />
                  <span className="font-sohne">
                    15+ years of specialized breeding experience
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-blue-300" />
                  <span className="font-sohne">
                    500+ happy families served worldwide
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-blue-300" />
                  <span className="font-sohne">
                    Lifetime support and guidance guarantee
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-blue-300" />
                  <span className="font-sohne">
                    Recognition for breeding excellence
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-xl border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-playfair">
                Our Process
              </h2>
              <div className="space-y-8">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
                    Initial Consultation
                  </h3>
                  <p className="text-gray-600 font-sohne">
                    We begin with a thorough discussion of your lifestyle,
                    expectations, and what you're looking for in a puppy
                    companion. This helps us understand your needs and ensures a
                    good match.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
                    Perfect Match
                  </h3>
                  <p className="text-gray-600 font-sohne">
                    Our experienced team helps match you with the ideal puppy
                    based on temperament, energy level, and your specific needs.
                    We consider factors like activity level, family composition,
                    and living situation.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
                    Preparation
                  </h3>
                  <p className="text-gray-600 font-sohne">
                    Before your puppy comes home, we provide comprehensive
                    guidance on preparing your home, purchasing supplies, and
                    setting up for success. This includes training tips and
                    socialization strategies.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
                    Ongoing Support
                  </h3>
                  <p className="text-gray-600 font-sohne">
                    We provide continuous guidance and support throughout your
                    journey with your puppy, ensuring a successful transition
                    and happy life together. Our door is always open for
                    questions and advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Ready to Start Your Puppy Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100 font-sohne">
            Let us help you find your perfect energetic, loyal companion
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold 
            hover:bg-blue-50 transition-colors duration-300 shadow-lg font-sohne"
          >
            Contact Us Today
          </a>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default AboutPage;
