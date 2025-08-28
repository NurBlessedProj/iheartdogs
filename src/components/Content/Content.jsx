import React from "react";
import PopularBreedsSection from "./sections/PopularBreedsSection";
import MainContentSection from "./sections/MainContentSection";
import PuppyStandardsSection from "./sections/PuppyStandardsSection";
import GallerySection from "./sections/GallerySection";
import CareGuideSection from "./sections/CareGuideSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import QualityAssuranceSection from "./sections/QualityAssuranceSection";
import CTASection from "./sections/CTASection";

const Content = () => {
  return (
    <div className="w-full bg-gray-50">
      <PopularBreedsSection />
      <MainContentSection />
      <PuppyStandardsSection />
      <GallerySection />
      <CareGuideSection />
      <TestimonialsSection />
      <QualityAssuranceSection />
      <CTASection />
    </div>
  );
};

export default Content;
