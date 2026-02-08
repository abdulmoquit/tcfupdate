import { lazy, Suspense } from "react";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollToTop from "@/components/ScrollToTop";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

// Lazy load below-the-fold sections for better performance
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProgramsSection = lazy(() => import("@/components/ProgramsSection"));
const TrainersSection = lazy(() => import("@/components/TrainersSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BranchesPreview = lazy(() => import("@/components/BranchesPreview"));
const CTABanner = lazy(() => import("@/components/CTABanner"));
const Footer = lazy(() => import("@/components/Footer"));

// Lightweight loading placeholder
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  // Enable smooth scrolling for all anchor links
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
        <ProgramsSection />
        <TrainersSection />
        <PricingSection />
        <TestimonialsSection />
        <BranchesPreview />
        <CTABanner />
        <Footer />
      </Suspense>
      <ScrollToTop />
    </div>
  );
};

export default Index;



