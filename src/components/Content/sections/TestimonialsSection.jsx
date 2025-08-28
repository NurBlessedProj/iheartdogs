import React, { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  const testimonials = [
    {
      name: "Michael & Emma Roberts",
      text: "Our Golden Retriever, Max, is the perfect family dog! His gentle nature and love for our children make him an incredible companion. He's everything we hoped for and more.",
      location: "Denver, Colorado",
    },
    {
      name: "Sarah Thompson",
      text: "Having owned dogs for over 15 years, I can truly say our Goldendoodle, Luna, is the most intelligent and loving companion. She's hypoallergenic and perfect for our family.",
      location: "Portland, Oregon",
    },
    {
      name: "David & Lisa Wilson",
      text: "Our Labrador, Buddy, is an incredible family dog with amazing instincts. He's gentle with our children while maintaining that classic Lab energy and enthusiasm!",
      location: "Austin, Texas",
    },
    {
      name: "Jennifer O'Connor",
      text: "Our Poodle, Daisy, is the perfect companion. Whether we're at home or on adventures, she's always ready to join in and brings so much joy to our daily lives.",
      location: "Seattle, Washington",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalSlides = isMobile
    ? testimonials.length
    : Math.max(0, testimonials.length - 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="w-full bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-medium">TESTIMONIALS</span>
          <h2 className="text-4xl font-bold mt-2 text-gray-800">
            What Our Happy Families Say
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out w-full"
              style={{
                transform: `translateX(-${
                  currentSlide * (isMobile ? 100 : 33.33)
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                  style={{ minWidth: isMobile ? "100%" : "33.33%" }}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                    <Quote className="w-10 h-10 text-blue-200 mb-6" />
                    <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="font-semibold text-blue-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-blue-400 fill-blue-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 z-10 transition-all duration-200 hover:scale-105"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 z-10 transition-all duration-200 hover:scale-105"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
