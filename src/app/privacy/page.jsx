"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";

export const dynamic = "force-dynamic";
import Footer from "@/components/Footer.jsx/page";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Bell,
  Users,
  Scale,
  CheckCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const PrivacyPage = () => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Information We Collect",
      content: `We collect information that you provide directly to us, including:
        • Name and contact information
        • Communication preferences
        • Inquiries about our puppies
        • Application and screening information
        • Payment information when applicable
        
        We also automatically collect certain information about your device when you use our website.`,
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "How We Use Your Information",
      content: `We use the collected information to:
        • Process your inquiries and applications
        • Communicate with you about our puppies
        • Improve our services and website
        • Send updates about available puppies or important announcements
        • Ensure the safety and well-being of our puppies
        • Comply with legal obligations`,
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Information Sharing",
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties. We may share your information with:
        • Veterinary services when necessary
        • Legal authorities if required by law
        • Service providers who assist in our operations
        
        All third parties are required to maintain the confidentiality of your information.`,
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: "Data Security",
      content: `We implement appropriate security measures to protect your personal information, including:
        • Secure SSL encryption
        • Regular security assessments
        • Limited access to personal information
        • Secure data storage systems
        
        While we use commercially reasonable efforts to protect your data, no method of transmission over the Internet is 100% secure.`,
    },
    {
      icon: <Bell className="w-6 h-6 text-blue-600" />,
      title: "Your Rights",
      content: `You have the right to:
        • Access your personal information
        • Request corrections to your data
        • Opt-out of marketing communications
        • Request deletion of your information
        • Receive a copy of your data
        
        Contact us to exercise any of these rights.`,
    },
    {
      icon: <Scale className="w-6 h-6 text-blue-600" />,
      title: "Legal Compliance",
      content: `Our privacy practices comply with applicable laws and regulations. This includes:
        • State and federal privacy laws
        • Animal welfare regulations
        • Consumer protection laws
        • Data protection standards
        
        We regularly review and update our practices to ensure continued compliance.`,
    },
  ];

  const quickLinks = [
    { title: "Contact Us", url: "/contact" },
    { title: "Terms of Service", url: "/terms" },
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
            alt="Puppy privacy policy"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70" />
        </div>
        <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4">
          <div className="bg-blue-600/30 backdrop-blur-sm p-4 rounded-full border border-blue-400/30 mb-6">
            <Shield className="w-16 h-16 text-blue-100" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center font-playfair">
            Privacy Policy
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl font-sohne">
            How we protect and handle your information while you explore our
            puppy services
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
                <h3 className="font-semibold text-gray-900 mb-3 font-playfair">
                  Need Help?
                </h3>
                <p className="text-gray-600 text-sm mb-4 font-sohne">
                  If you have questions about our privacy practices or how we
                  handle your data, our team is ready to assist.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors font-sohne"
                >
                  Contact our privacy team
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-playfair">
                  Introduction
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed font-sohne">
                At our puppy breeding program, we take your privacy seriously.
                This Privacy Policy describes how we collect, use, and protect
                your personal information when you interact with our website or
                services related to our puppy breeding program. By using our
                services, you agree to the collection and use of information in
                accordance with this policy.
              </p>
              <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-sohne">
                    We are committed to transparency in our data practices and
                    to protecting your personal information with the highest
                    standards of security and confidentiality.
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

            {/* Additional Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-playfair">
                Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4 font-sohne">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
              <p className="text-gray-700 leading-relaxed font-sohne">
                Your continued use of our website and services after such
                modifications will constitute your acknowledgment of the
                modified Privacy Policy and your agreement to abide and be bound
                by the modified policy.
              </p>
            </div>

            {/* Consent Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-2xl shadow-xl p-8 mt-6">
              <h2 className="text-2xl font-semibold mb-4 font-playfair">
                Your Consent
              </h2>
              <p className="leading-relaxed mb-6 font-sohne">
                By using our website and services, you consent to our Privacy
                Policy and agree to its terms. If you do not agree with this
                policy, please do not use our website or services.
              </p>
              <div className="flex items-center">
                <Lock className="w-6 h-6 text-blue-200 mr-3" />
                <span className="text-blue-100 font-sohne">
                  Your privacy is our priority
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
            Privacy Questions?
          </h2>
          <p className="text-xl mb-8 text-blue-100 font-sohne">
            If you have any questions about our privacy policy or how we handle
            your data, please don't hesitate to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 font-sohne"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
