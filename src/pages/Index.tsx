import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/ui/loader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import ServicesSection from "../components/ServicesSection";
import { ExpertiseSection } from "../components/ExpertiseSection";
import Footer from "../components/Footer";
import { ScrollSection } from "@/components/ui/scroll-section";
import { staggerAnimationVariants, staggerItemVariants } from "@/components/hooks/use-scroll-animation";
import { BioclinScrollDemo } from "../components/BioclinScrollDemo";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
          >
            <Navbar />
            
            {/* Hero Section */}
            <Hero />

            {/* Scroll Demo Section */}
            <BioclinScrollDemo />

            {/* Expertise Section with stagger animation */}
            <ScrollSection 
              threshold={0.2}
              variants={staggerAnimationVariants}
              className="py-24"
            >
              <ExpertiseSection />
            </ScrollSection>

            {/* Services Section */}
            <ServicesSection />

            {/* About Us Section */}
            <ScrollSection
              threshold={0.2}
              variants={staggerAnimationVariants}
              className="py-24"
            >
              <AboutUs />
            </ScrollSection>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;