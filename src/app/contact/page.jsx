"use client";
import React, { useState } from "react";

export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer.jsx/page";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  HelpCircle,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    message: "",
    interest: "general", // Default value
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      message,
      interest,
    } = formData;
    const mailtoLink = `mailto:contact@iheartdogs.com?subject=Contact%20Form%20Submission%20-%20${interest}&body=Name:%20${firstName}%20${lastName}%0APhone%20Number:%20${phoneNumber}%0AEmail:%20${email}%0AAddress/State:%20${address}%0AInterest:%20${interest}%0AMessage/Comment:%20${message}`;
    window.location.href = mailtoLink;
    setFormSubmitted(true);
  };

  const handleWhatsAppClick = () => {
    // Remove any non-numeric characters and ensure it starts with the country code
    const phoneNumber = "12092661293"; // Format: countrycode + number without special characters
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const faqs = [
    {
      question: "How old are your puppies when they go to their new homes?",
      answer:
        "Our puppies typically go to their new homes at 8-10 weeks of age. By this time, they've been weaned, received initial vaccinations, and begun early socialization.",
    },
    {
      question: "Do you offer shipping for your puppies?",
      answer:
        "Yes, we can arrange shipping throughout the continental United States. We work with experienced pet transportation services to ensure a safe and comfortable journey for your puppy.",
    },
    {
      question: "What health guarantees do you offer?",
      answer:
        "We provide a comprehensive health guarantee that covers genetic conditions. All our puppies come with up-to-date vaccinations, deworming, and a health certificate from our veterinarian.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Puppy contact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70" />
        </div>
        <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4">
          <span className="text-blue-300 uppercase tracking-wider font-semibold mb-2 font-sohne">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center font-playfair">
            Contact Us
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl font-sohne">
            We're here to answer your questions and help you find your perfect
            puppy companion
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-start space-x-4 border border-gray-200">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 font-playfair">
                Email
              </h3>
              <p className="text-gray-600 font-sohne">contact@iheartdogs.com</p>
              <p className="text-sm text-gray-500 mt-2 font-sohne">
                We respond within 24-48 hours
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-start space-x-4 border border-gray-200">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 font-playfair">
                Phone
              </h3>
              <p className="text-gray-600 font-sohne">+1 (209) 266-1293</p>
              <p className="text-sm text-gray-500 mt-2 font-sohne">
                Available during business hours
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="mt-3 inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-start space-x-4 border border-gray-200">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 font-playfair">
                Business Hours
              </h3>
              <p className="text-gray-600 font-sohne">
                Monday - Friday: 9am - 6pm
              </p>
              <p className="text-gray-600 font-sohne">Saturday: 10am - 4pm</p>
              <p className="text-gray-600 font-sohne">Sunday: By appointment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <span className="text-blue-600 font-medium font-sohne">
                REACH OUT
              </span>
              <h2 className="text-3xl font-bold mt-2 text-gray-900 font-playfair">
                Send us a Message
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-4"></div>
              <p className="text-gray-600 font-sohne">
                Have questions about our puppies? We're here to help!
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6 font-sohne">
                  Your message has been sent successfully. We'll get back to you
                  shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      phoneNumber: "",
                      email: "",
                      address: "",
                      message: "",
                      interest: "general",
                    });
                  }}
                  className="px-6 py-3 bg-blue-100 text-blue-700 font-medium rounded-xl hover:bg-blue-200 transition-colors font-sohne"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2 font-sohne"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 font-sohne"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2 font-sohne"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 font-sohne"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2 font-sohne"
                      htmlFor="phoneNumber"
                    >
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 font-sohne"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2 font-sohne"
                      htmlFor="email"
                    >
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 font-sohne"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2 font-sohne"
                    htmlFor="address"
                  >
                    Address/State
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 font-sohne"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2 font-sohne"
                    htmlFor="interest"
                  >
                    I'm interested in:
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 font-sohne"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="puppy">Available Puppies</option>
                    <option value="waitlist">Joining the Waitlist</option>
                    <option value="health">Health Guarantees</option>
                    <option value="shipping">Shipping Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2 font-sohne"
                    htmlFor="message"
                  >
                    Message/Comment<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-none font-sohne"
                    onChange={handleChange}
                  />
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl
                      hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-300 font-sohne"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div>
            <div className="text-center mb-8">
              <span className="text-blue-600 font-medium font-sohne">
                COMMON QUESTIONS
              </span>
              <h2 className="text-3xl font-bold mt-2 text-gray-900 font-playfair">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-4"></div>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 font-playfair">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 font-sohne">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-playfair">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8 font-sohne">
            Subscribe to our newsletter for updates on available puppies,
            breeding news, and care tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sohne"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors font-sohne"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default ContactPage;
