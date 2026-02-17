import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Import Components
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import HealthCheckPreview from "../components/Home/HealthCheckPreview";
import ExpertCategories from "../components/Home/ExpertCategories";
import FeaturedExperts from "../components/Home/FeaturedExperts";
import CenterFeatures from "../components/Home/CenterFeatures";
import FeaturedCenters from "../components/Home/FeaturedCenters";
import DashboardPreview from "../components/Home/DashboardPreview";
import CTASection from "../components/Home/CTASection";

const Home = () => {
  // Page load animation
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Features />
      <HealthCheckPreview />
      <ExpertCategories />
      <FeaturedExperts />
      <CenterFeatures />
      <FeaturedCenters />
      <DashboardPreview />
      <CTASection />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
