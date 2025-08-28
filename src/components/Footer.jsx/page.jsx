import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Heart,
  Shield,
  Award,
  PawPrint,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/pet_logo_t.png"
                alt="iheartdogs Logo"
                width={120}
                height={40}
                className="h-14 w-auto"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              We are dedicated to breeding and raising exceptional puppies with
              devotion and expertise. Our mission is to produce healthy,
              well-socialized companions while maintaining the highest standards
              of breeding and care practices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/available-puppies"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Available Puppies
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  href="/health"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Health Guarantee
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <Link
                  href="mailto:contact@iheartdogs.com"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  contact@iheartdogs.com
                </Link>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <Link
                  href="tel:+12092661293"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  +1 (209) 266-1293
                </Link>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-700 transition-colors">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <Link
                  href="https://wa.me/12092661293"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Newsletter</h2>
            <p className="text-gray-300">
              Subscribe to our newsletter for updates on available puppies,
              breeding announcements, and care tips.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-center md:text-left">
            Copyright © {currentYear} Premium Puppy Breeder. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
