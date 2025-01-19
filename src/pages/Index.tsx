import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { ExpertiseSection } from "../components/ExpertiseSection";

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
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <Hero />
          <ExpertiseSection />
        </motion.div>
      )}
    </>
  );
};

export default Index;