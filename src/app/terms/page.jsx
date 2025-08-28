"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";

export const dynamic = "force-dynamic";
import Footer from "@/components/Footer.jsx/page";
import {
  ScrollText,
  FileCheck,
  AlertCircle,
  Scale,
  Shield,
  DollarSign,
  Clock,
  CheckCircle,
  Calendar,
  ArrowRight,
  HelpCircle,
  Printer,
} from "lucide-react";
import Image from "next/image";

const TermsPage = () => {
  const sections = [
    {
      icon: <FileCheck className="w-6 h-6 text-blue-600" />,
      title: "Acceptance of Terms",
      content: `By accessing and using our website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.

      These terms may be modified at any time, and continued use of our services constitutes acceptance of any modifications.`,
    },
    {
      icon: <Scale className="w-6 h-6 text-blue-600" />,
      title: "Purchase and Adoption Terms",
      content: `1. Puppy Reservations:
      • A non-refundable deposit is required to reserve a puppy
      • Deposits are applied to the final purchase price
      • Reservation priority is based on deposit receipt date

      2. Health Guarantees:
      • All puppies come with a comprehensive health guarantee
      • Initial veterinary examination must be completed within 72 hours
      • Genetic health guarantees as specified in individual contracts

      3. Payment Terms:
      • Full payment must be received before puppy pickup
      • Accepted payment methods will be specified
      • Payment plans must be agreed upon in writing`,
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-blue-600" />,
      title: "Responsibilities and Obligations",
      content: `Buyer Responsibilities:
      • Provide appropriate care and living conditions for your puppy
      • Maintain regular veterinary care and vaccinations
      • Follow provided care instructions for proper nutrition and exercise
      • Notify us of any health issues within guarantee period

      Our Responsibilities:
      • Provide healthy, well-socialized puppies
      • Deliver complete health records and vaccination history
      • Offer ongoing support and guidance for the life of your dog
      • Honor all contractual guarantees as specified`,
    },
    {
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      title: "Refund and Return Policy",
      content: `1. Deposit Refunds:
      • Deposits are generally non-refundable
      • Exceptions may be made in specific circumstances
      • Transfer to future litters may be possible

      2. Health-Related Returns:
      • Must be documented by licensed veterinarian
      • Time limits apply as specified in contract
      • Replacement or refund options as per agreement

      3. General Returns:
      • Each case evaluated individually
      • Transportation costs are buyer's responsibility
      • Original health certificates required`,
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Website Usage",
      content: `1. Intellectual Property:
      • All content is protected by copyright
      • Photos and descriptions are our property
      • No reproduction without permission

      2. User Conduct:
      • No harmful or malicious activity
      • Accurate information must be provided
      • Respect for other users and our staff

      3. Privacy:
      • User data protected per Privacy Policy
      • Cookies and tracking detailed separately
      • Communication preferences respected`,
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Timeline and Communication",
      content: `1. Response Times:
      • Inquiries answered within 48 hours
      • Updates provided weekly for reserved puppies
      • Emergency contact: +1 (209) 266-1293 for urgent issues

      2. Pickup and Delivery:
      • Scheduling must be confirmed in advance
      • Specific time windows will be provided
      • Delays must be communicated promptly

      3. Follow-up Communication:
      • Regular updates requested for puppy progress
      • Annual health check documentation
      • Newsletter subscription optional`,
    },
  ];

  const quickLinks = [
    { title: "Contact Us", url: "/contact" },
    { title: "Privacy Policy", url: "/privacy" },
    { title: "FAQ", url: "/faq" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Puppy terms and conditions"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70" />
        </div>
        <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4">
          <div className="bg-blue-600/30 backdrop-blur-sm p-4 rounded-full border border-blue-400/30 mb-6">
            <ScrollText className="w-16 h-16 text-blue-100" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center font-playfair">
            Terms & Conditions
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl font-sohne">
            Please read these terms carefully before proceeding
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900 font-playfair">
                    Last Updated
                  </h3>
                </div>
                <p className="text-gray-700 font-sohne">December 11, 2024</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-sohne"
                    onClick={(e) => {
                      e.preventDefault();
                      window.print();
                    }}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print these terms
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4 font-playfair">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-sohne"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        <span>{link.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-200 mt-8">
                <div className="flex items-start">
                  <HelpCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 font-playfair">
                      Have Questions?
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 font-sohne">
                      Our team is available to clarify any terms or conditions
                      regarding our puppies.
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors font-sohne"
                    >
                      Contact us
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <ScrollText className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-playfair">
                  Introduction
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed font-sohne">
                These Terms and Conditions govern your use of our website and
                services provided by our puppy breeding program. By accessing
                our website or utilizing our services, you agree to comply with
                and be bound by these terms. Please read them carefully before
                proceeding with any purchase or adoption process related to our
                puppies.
              </p>
              <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-sohne">
                    By continuing to use our website or services, you
                    acknowledge that you have read, understood, and agree to be
                    bound by all terms and conditions outlined in this document.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 font-playfair">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line font-sohne">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Notice */}
            <div className="bg-gray-50 rounded-2xl p-8 text-gray-600 mt-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-playfair">
                Legal Notice
              </h3>
              <p className="mb-4 font-sohne">
                This document was last updated on December 11, 2024. We reserve
                the right to modify these terms at any time without prior
                notice. Changes will be effective immediately upon posting on
                our website.
              </p>
              <p className="font-sohne">
                For questions about these terms, please contact us through our
                designated channels. Our puppy breeding program reserves all
                rights not expressly granted in these Terms and Conditions.
              </p>
            </div>

            {/* Acceptance Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-2xl shadow-xl p-8 mt-6">
              <h2 className="text-2xl font-semibold mb-4 font-playfair">
                Your Acceptance
              </h2>
              <p className="leading-relaxed mb-6 font-sohne">
                By using our website, services, or proceeding with a puppy
                purchase or reservation, you acknowledge that you have read,
                understood, and agree to be bound by these Terms and Conditions.
              </p>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-200 mr-3" />
                <span className="text-blue-100 font-sohne">
                  Thank you for choosing our puppy breeding program
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            Questions About Our Terms?
          </h2>
          <p className="text-xl mb-8 text-blue-100 font-sohne">
            If you have any questions about our terms and conditions, our team
            is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 font-sohne"
            >
              Contact Us
            </a>
            <a
              href="/faq"
              className="inline-block bg-transparent border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-300 font-sohne"
            >
              View FAQs
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
