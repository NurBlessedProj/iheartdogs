"use client";
import Banner from "@/components/Banner/Banner";

export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar/Navbar";
import React, { useState } from "react";
import Footer from "@/components/Footer.jsx/page";
import {
  Star,
  Quote,
  MessageCircle,
  Heart,
  ThumbsUp,
  MapPin,
  Calendar,
} from "lucide-react";
import Image from "next/image";

function TestimonialsPage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    review: "",
    rating: 5,
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Calculate pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const totalPages = Math.ceil(50 / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    setFormData((prevState) => ({
      ...prevState,
      rating: rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", formData);
    setFormData({
      name: "",
      location: "",
      review: "",
      rating: 5,
    });
    setSelectedRating(5);
    alert("Thank you for your review! We appreciate your feedback.");
  };

  const testimonials = [
    {
      name: "Emma & David Johnson",
      text: "Our puppy Max has brought so much energy and joy to our home. He's incredibly smart and picked up training commands in no time. His playful nature keeps us active and entertained every day!",
      location: "Ontario",
      date: "March 2025",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Michael Wilson",
      text: "Having owned dogs before, I can say that Daisy is exceptional. Her intelligence and loyalty are remarkable. She's the perfect companion for our active lifestyle and hiking adventures.",
      location: "Alberta",
      date: "January 2025",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Sarah & Thomas Clark",
      text: "Charlie is everything we wanted in a dog - energetic, affectionate, and incredibly smart. He's wonderful with our children and has become the heart of our family. The breeder was incredibly helpful throughout the entire process.",
      location: "British Columbia",
      date: "December 2024",
      image:
        "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Jennifer Martinez",
      text: "Our puppy Bella is the most loyal companion we could ask for. Despite her small size, she has a huge personality and is always ready for adventure. She's particularly great at agility training!",
      location: "Quebec",
      date: "October 2024",
      image:
        "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Robert & Olivia Thompson",
      text: "We were amazed by how quickly our puppy Rocky adapted to our family. His energy is boundless but he's also incredibly affectionate. The breeder provided excellent guidance on training and care.",
      location: "Manitoba",
      date: "November 2024",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Daniel Lee",
      text: "Lucy is the most intelligent dog I've ever owned. She learned all basic commands within weeks and is always eager to please. Her playful nature makes every day an adventure. Couldn't be happier with our puppy!",
      location: "Nova Scotia",
      date: "December 2024",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Amanda & James Rodriguez",
      text: "Our puppy Luna has been the perfect addition to our family. She's incredibly gentle with our children and has the sweetest temperament. The breeder's attention to socialization really shows!",
      location: "Saskatchewan",
      date: "February 2025",
      image:
        "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Christopher Brown",
      text: "Buddy is exactly what I was looking for in a companion. His energy level is perfect for my active lifestyle, and he's incredibly smart. The training tips from the breeder were invaluable.",
      location: "New Brunswick",
      date: "January 2025",
      image:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Lisa & Mark Anderson",
      text: "We couldn't be happier with our puppy Molly. She's brought so much joy and laughter to our home. Her personality is absolutely delightful and she gets along perfectly with our other pets.",
      location: "Prince Edward Island",
      date: "December 2024",
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "David Chen",
      text: "Having a puppy like Bailey has completely changed my daily routine for the better. He's incredibly loyal and has become my best friend. The breeder's guidance on care and training was exceptional.",
      location: "Newfoundland",
      date: "November 2024",
      image:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Rachel & Steven White",
      text: "Our puppy Finn is absolutely perfect! He's incredibly well-behaved and has adapted to our family so quickly. The breeder's commitment to quality really shows in his temperament and health.",
      location: "Northwest Territories",
      date: "October 2024",
      image:
        "https://images.unsplash.com/photo-1547407139-3c921a66005c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Kevin O'Connor",
      text: "I've never met a more intelligent and loving puppy than Scout. He learns new tricks in minutes and has the most gentle nature. The breeder's expertise in breeding healthy, well-tempered dogs is evident.",
      location: "Yukon",
      date: "September 2024",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Michelle & Ryan Taylor",
      text: "Our puppy Zoe has exceeded all our expectations. She's incredibly affectionate and has the perfect energy level for our family. The breeder's support throughout the process was outstanding.",
      location: "Nunavut",
      date: "August 2024",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Patrick Murphy",
      text: "Getting our puppy Murphy was the best decision we ever made. He's incredibly smart, loyal, and has brought so much happiness to our lives. The breeder's knowledge and care are exceptional.",
      location: "Ontario",
      date: "July 2024",
      image:
        "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Nicole & Brian Garcia",
      text: "Our puppy Rosie is absolutely adorable and has the sweetest personality. She's incredibly well-socialized and gets along with everyone. The breeder's dedication to quality is remarkable.",
      location: "Alberta",
      date: "June 2024",
      image:
        "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Thomas Wright",
      text: "Having a puppy like Duke has been an incredible experience. He's incredibly intelligent and has learned so much in such a short time. The breeder's training advice has been invaluable.",
      location: "British Columbia",
      date: "May 2024",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Jessica & Andrew Lewis",
      text: "Our puppy Sadie is the most loving and gentle companion we could ask for. She's incredibly patient with our children and has the most beautiful temperament. The breeder's expertise is outstanding.",
      location: "Quebec",
      date: "April 2024",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Matthew Hall",
      text: "Getting our puppy Tucker was the best decision for our family. He's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "Manitoba",
      date: "March 2024",
      image:
        "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Stephanie & Jason Allen",
      text: "Our puppy Penny has brought so much joy to our home. She's incredibly smart and has learned all her basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "Nova Scotia",
      date: "February 2024",
      image:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Robert King",
      text: "Having a puppy like Max has been an absolute joy. He's incredibly loyal and has become my constant companion. The breeder's knowledge and support throughout the process has been exceptional.",
      location: "Saskatchewan",
      date: "January 2024",
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Amanda & Daniel Scott",
      text: "Our puppy Bella is absolutely perfect! She's incredibly well-behaved and has adapted to our family so quickly. The breeder's expertise in breeding healthy, well-tempered dogs is remarkable.",
      location: "New Brunswick",
      date: "December 2023",
      image:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Michael Green",
      text: "Getting our puppy Charlie was the best decision we ever made. He's incredibly intelligent and has brought so much happiness to our lives. The breeder's dedication to quality is outstanding.",
      location: "Prince Edward Island",
      date: "November 2023",
      image:
        "https://images.unsplash.com/photo-1547407139-3c921a66005c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Sarah & Kevin Baker",
      text: "Our puppy Daisy is the most loving and gentle companion we could ask for. She's incredibly patient with our children and has the most beautiful temperament. The breeder's knowledge is exceptional.",
      location: "Newfoundland",
      date: "October 2023",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "David Adams",
      text: "Having a puppy like Rocky has been an incredible experience. He's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "Northwest Territories",
      date: "September 2023",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Lisa & Christopher Nelson",
      text: "Our puppy Lucy has brought so much joy to our home. She's incredibly smart and has learned all her basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "Yukon",
      date: "August 2023",
      image:
        "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Jennifer & Ryan Carter",
      text: "Getting our puppy Cooper was the best decision for our family. He's incredibly loyal and has become our constant companion. The breeder's expertise in breeding healthy dogs is remarkable.",
      location: "Nunavut",
      date: "July 2023",
      image:
        "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Mark Phillips",
      text: "Our puppy Bailey is absolutely perfect! She's incredibly well-behaved and has adapted to our family so quickly. The breeder's knowledge and support throughout the process has been exceptional.",
      location: "Ontario",
      date: "June 2023",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Emily & James Evans",
      text: "Having a puppy like Finn has been an absolute joy. He's incredibly intelligent and has brought so much happiness to our lives. The breeder's dedication to quality is outstanding.",
      location: "Alberta",
      date: "May 2023",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Andrew Turner",
      text: "Our puppy Scout is the most loving and gentle companion we could ask for. She's incredibly patient with our children and has the most beautiful temperament. The breeder's expertise is exceptional.",
      location: "British Columbia",
      date: "April 2023",
      image:
        "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Rebecca & Thomas Parker",
      text: "Getting our puppy Zoe has been an incredible experience. She's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "Quebec",
      date: "March 2023",
      image:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Steven Edwards",
      text: "Our puppy Murphy has brought so much joy to our home. He's incredibly smart and has learned all his basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "Manitoba",
      date: "February 2023",
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Melissa & Brian Collins",
      text: "Having a puppy like Rosie has been an absolute joy. She's incredibly loyal and has become our constant companion. The breeder's expertise in breeding healthy dogs is remarkable.",
      location: "Nova Scotia",
      date: "January 2023",
      image:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Kevin Stewart",
      text: "Our puppy Duke is absolutely perfect! He's incredibly well-behaved and has adapted to our family so quickly. The breeder's knowledge and support throughout the process has been exceptional.",
      location: "Saskatchewan",
      date: "December 2022",
      image:
        "https://images.unsplash.com/photo-1547407139-3c921a66005c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Nicole & Jason Morris",
      text: "Getting our puppy Sadie has been an incredible experience. She's incredibly intelligent and has brought so much happiness to our lives. The breeder's dedication to quality is outstanding.",
      location: "New Brunswick",
      date: "November 2022",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Daniel Rogers",
      text: "Our puppy Tucker is the most loving and gentle companion we could ask for. He's incredibly patient with our children and has the most beautiful temperament. The breeder's expertise is exceptional.",
      location: "Prince Edward Island",
      date: "October 2022",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Rachel & Mark Reed",
      text: "Having a puppy like Penny has been an absolute joy. She's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "Newfoundland",
      date: "September 2022",
      image:
        "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Patrick Cook",
      text: "Our puppy Luna has brought so much joy to our home. She's incredibly smart and has learned all her basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "Northwest Territories",
      date: "August 2022",
      image:
        "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Michelle & Ryan Morgan",
      text: "Getting our puppy Buddy has been an incredible experience. He's incredibly loyal and has become our constant companion. The breeder's expertise in breeding healthy dogs is remarkable.",
      location: "Yukon",
      date: "July 2022",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Thomas Bell",
      text: "Our puppy Molly is absolutely perfect! She's incredibly well-behaved and has adapted to our family so quickly. The breeder's knowledge and support throughout the process has been exceptional.",
      location: "Nunavut",
      date: "June 2022",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Jessica & Andrew Murphy",
      text: "Having a puppy like Finn has been an absolute joy. He's incredibly intelligent and has brought so much happiness to our lives. The breeder's dedication to quality is outstanding.",
      location: "Ontario",
      date: "May 2022",
      image:
        "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Matthew Bailey",
      text: "Our puppy Zoe is the most loving and gentle companion we could ask for. She's incredibly patient with our children and has the most beautiful temperament. The breeder's expertise is exceptional.",
      location: "Alberta",
      date: "April 2022",
      image:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Stephanie & Jason Cooper",
      text: "Getting our puppy Rosie has been an incredible experience. She's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "British Columbia",
      date: "March 2022",
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Robert Richardson",
      text: "Our puppy Duke has brought so much joy to our home. He's incredibly smart and has learned all his basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "Quebec",
      date: "February 2022",
      image:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Amanda & Daniel Cox",
      text: "Having a puppy like Sadie has been an absolute joy. She's incredibly loyal and has become our constant companion. The breeder's expertise in breeding healthy dogs is remarkable.",
      location: "Manitoba",
      date: "January 2022",
      image:
        "https://images.unsplash.com/photo-1547407139-3c921a66005c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Christopher Ward",
      text: "Our puppy Tucker is absolutely perfect! He's incredibly well-behaved and has adapted to our family so quickly. The breeder's knowledge and support throughout the process has been exceptional.",
      location: "Nova Scotia",
      date: "December 2021",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Sarah & Kevin Torres",
      text: "Getting our puppy Penny has been an incredible experience. She's incredibly intelligent and has brought so much happiness to our lives. The breeder's dedication to quality is outstanding.",
      location: "Saskatchewan",
      date: "November 2021",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "David Peterson",
      text: "Our puppy Luna is the most loving and gentle companion we could ask for. She's incredibly patient with our children and has the most beautiful temperament. The breeder's expertise is exceptional.",
      location: "New Brunswick",
      date: "October 2021",
      image:
        "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Lisa & Mark Gray",
      text: "Having a puppy like Buddy has been an absolute joy. He's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "Prince Edward Island",
      date: "September 2021",
      image:
        "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Jennifer & Ryan James",
      text: "Our puppy Molly has brought so much joy to our home. She's incredibly smart and has learned all her basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "Newfoundland",
      date: "August 2021",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Mark Watson",
      text: "Getting our puppy Finn has been an incredible experience. He's incredibly loyal and has become our constant companion. The breeder's expertise in breeding healthy dogs is remarkable.",
      location: "Northwest Territories",
      date: "July 2021",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Emily & James Brooks",
      text: "Our puppy Zoe is absolutely perfect! She's incredibly well-behaved and has adapted to our family so quickly. The breeder's knowledge and support throughout the process has been exceptional.",
      location: "Yukon",
      date: "June 2021",
      image:
        "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Andrew Kelly",
      text: "Having a puppy like Rosie has been an absolute joy. She's incredibly intelligent and has brought so much happiness to our lives. The breeder's dedication to quality is outstanding.",
      location: "Nunavut",
      date: "May 2021",
      image:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Rebecca & Thomas Sanders",
      text: "Our puppy Duke is the most loving and gentle companion we could ask for. He's incredibly patient with our children and has the most beautiful temperament. The breeder's expertise is exceptional.",
      location: "Ontario",
      date: "April 2021",
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Steven Price",
      text: "Getting our puppy Sadie has been an incredible experience. She's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "Alberta",
      date: "March 2021",
      image:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Melissa & Brian Bennett",
      text: "Our puppy Tucker has brought so much joy to our home. He's incredibly smart and has learned all his basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "British Columbia",
      date: "February 2021",
      image:
        "https://images.unsplash.com/photo-1547407139-3c921a66005c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Kevin Wood",
      text: "Having a puppy like Penny has been an absolute joy. She's incredibly loyal and has become our constant companion. The breeder's expertise in breeding healthy dogs is remarkable.",
      location: "Quebec",
      date: "January 2021",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Nicole & Jason Barnes",
      text: "Our puppy Luna is absolutely perfect! She's incredibly well-behaved and has adapted to our family so quickly. The breeder's knowledge and support throughout the process has been exceptional.",
      location: "Manitoba",
      date: "December 2020",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Daniel Ross",
      text: "Getting our puppy Buddy has been an incredible experience. He's incredibly intelligent and has brought so much happiness to our lives. The breeder's dedication to quality is outstanding.",
      location: "Nova Scotia",
      date: "November 2020",
      image:
        "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Rachel & Mark Henderson",
      text: "Our puppy Molly is the most loving and gentle companion we could ask for. She's incredibly patient with our children and has the most beautiful temperament. The breeder's expertise is exceptional.",
      location: "Saskatchewan",
      date: "October 2020",
      image:
        "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Patrick Coleman",
      text: "Having a puppy like Finn has been an absolute joy. He's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "New Brunswick",
      date: "September 2020",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Michelle & Ryan Jenkins",
      text: "Our puppy Zoe has brought so much joy to our home. She's incredibly smart and has learned all her basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "Prince Edward Island",
      date: "August 2020",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Thomas Perry",
      text: "Getting our puppy Rosie has been an incredible experience. She's incredibly loyal and has become our constant companion. The breeder's expertise in breeding healthy dogs is remarkable.",
      location: "Newfoundland",
      date: "July 2020",
      image:
        "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Jessica & Andrew Powell",
      text: "Our puppy Duke is absolutely perfect! He's incredibly well-behaved and has adapted to our family so quickly. The breeder's knowledge and support throughout the process has been exceptional.",
      location: "Northwest Territories",
      date: "June 2020",
      image:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Matthew Long",
      text: "Having a puppy like Sadie has been an absolute joy. She's incredibly intelligent and has brought so much happiness to our lives. The breeder's dedication to quality is outstanding.",
      location: "Yukon",
      date: "May 2020",
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Stephanie & Jason Patterson",
      text: "Our puppy Tucker is the most loving and gentle companion we could ask for. He's incredibly patient with our children and has the most beautiful temperament. The breeder's expertise is exceptional.",
      location: "Nunavut",
      date: "April 2020",
      image:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Robert Hughes",
      text: "Getting our puppy Penny has been an incredible experience. She's incredibly energetic and playful, but also very well-behaved. The breeder's commitment to quality is evident in every aspect.",
      location: "Ontario",
      date: "March 2020",
      image:
        "https://images.unsplash.com/photo-1547407139-3c921a66005c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
    {
      name: "Amanda & Daniel Flores",
      text: "Our puppy Luna has brought so much joy to our home. She's incredibly smart and has learned all her basic commands so quickly. The breeder's guidance on care and training has been excellent.",
      location: "Alberta",
      date: "February 2020",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 5,
    },
    {
      name: "Christopher Butler",
      text: "Having a puppy like Buddy has been an absolute joy. He's incredibly loyal and has become our constant companion. The breeder's expertise in breeding healthy dogs is remarkable.",
      location: "British Columbia",
      date: "January 2020",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      rating: 4,
    },
  ];

  // Get current page reviews
  const currentReviews = testimonials.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Puppy testimonials"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70" />
        </div>
        <div className="relative h-full w-full text-center flex flex-col justify-center items-center text-white px-4">
          <span className="text-blue-300 uppercase tracking-wider font-semibold mb-2 font-sohne">
            Customer Testimonials
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-playfair">
            Voices of Our Puppy Community
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl font-sohne">
            Discover why families choose our puppies as their beloved companions
            and lifelong friends
          </p>
          <div className="flex justify-center gap-1 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-blue-300 fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-blue-800 mb-2">100%</div>
            <div className="text-gray-600 font-sohne">Satisfaction Rate</div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-blue-800 mb-2">15+</div>
            <div className="text-gray-600 font-sohne">Years Experience</div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-blue-800 mb-2">500+</div>
            <div className="text-gray-600 font-sohne">Happy Families</div>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-medium font-sohne">
              CUSTOMER STORIES
            </span>
            <h2 className="text-4xl font-bold mt-2 text-gray-900 font-playfair">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="relative h-64 md:h-full w-full rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="Happy family with puppy"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <Quote className="w-12 h-12 text-blue-300 mb-6" />
                <p className="text-xl text-gray-700 leading-relaxed mb-8 italic font-sohne">
                  "Our puppy Cooper has completely transformed our lives. His
                  boundless energy keeps us active, and his intelligence
                  continues to amaze us every day. The breeder was incredibly
                  knowledgeable and supportive throughout the entire process,
                  from selection to bringing him home. Cooper is now an
                  irreplaceable member of our family, and we couldn't imagine
                  life without him!"
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <h3 className="font-semibold text-xl text-gray-900 font-playfair">
                      The Williams Family
                    </h3>
                    <div className="flex items-center text-gray-500 mt-1 font-sohne">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Vancouver, BC</span>
                    </div>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-blue-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentReviews.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 
                transition-all duration-300 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-blue-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 font-sohne">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="font-semibold text-gray-900 font-playfair">
                    {testimonial.name}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mt-1 font-sohne">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{testimonial.location}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mb-16">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } font-sohne`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } font-sohne`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } font-sohne`}
          >
            Next
          </button>
        </div>

        {/* Review Form Section */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <div className="text-center mb-8">
              <span className="text-blue-600 font-medium font-sohne">
                YOUR TURN
              </span>
              <h2 className="text-3xl font-bold mt-2 text-gray-900 font-playfair">
                Share Your Experience
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-4"></div>
              <p className="text-gray-600 font-sohne">
                We'd love to hear about your experience with your puppy!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1 font-sohne"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 font-sohne"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1 font-sohne"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 font-sohne"
                    placeholder="Province"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700 mb-1 font-sohne"
                >
                  Your Rating
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`w-8 h-8 cursor-pointer ${
                        hoveredRating >= rating || selectedRating >= rating
                          ? "text-blue-400 fill-current"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleRatingChange(rating)}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-sohne">
                    {selectedRating} out of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700 mb-1 font-sohne"
                >
                  Your Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 font-sohne"
                  placeholder="Share your experience with your puppy..."
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 
                            transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-sohne"
                >
                  Submit Your Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default TestimonialsPage;
