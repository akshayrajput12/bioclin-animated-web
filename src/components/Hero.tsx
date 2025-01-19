import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen pt-20 flex items-center bg-gradient-to-b from-white to-accent/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
            Welcome to BioClinPharm
          </h1>
          <h2 className="text-2xl md:text-3xl text-primary mb-8">
            Excellence in Clinical Trials and Research
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            By combining world-class expertise and technical innovation, with the
            highest standards of regulatory and quality assurance, we stand
            shoulder to shoulder with our clients as a seamless and reliable
            extension of their team.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-secondary transition-colors duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;