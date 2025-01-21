import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
          className="relative w-24 h-24 mb-4"
        >
          <img src={logo} alt="BioClinPharm Logo" className="w-full h-full object-contain" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(0deg, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--secondary-rgb), 0.2) 100%)",
                "linear-gradient(180deg, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--secondary-rgb), 0.2) 100%)",
                "linear-gradient(360deg, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--secondary-rgb), 0.2) 100%)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-2xl font-playfair font-bold text-gray-800 dark:text-white">
            BioClinPharm
          </h1>
          <p className="text-sm font-plusJakarta text-gray-600 dark:text-gray-400 mt-1">
            A Data Science Company
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;