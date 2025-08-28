"use client";
import Content from "@/components/Content/Content";
import Footer from "@/components/Footer.jsx/page";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Content />
      <Footer />
    </>
  );
}
