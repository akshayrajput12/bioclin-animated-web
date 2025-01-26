import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { BioclinGravity } from "../components/BioclinGravity";
import { ServiceDetails } from "../components/ServiceDetails";

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <Navbar />
      <div className="pt-20">
        <BioclinGravity />
        
        <ServiceDetails />
      </div>
      <Footer />
    </motion.div>
  );
};

export default Services;