import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextRevealByWord } from "./ui/text-reveal";
import { Button3D } from "./ui/button-3d";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity: backgroundOpacity }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
          style={{ y: backgroundY }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <TextRevealByWord
        text="At BioClinPharm, we are pioneering the future of healthcare through innovative data science solutions. Our mission is to transform clinical research and improve patient outcomes through cutting-edge technology and expert analysis."
        className="mb-24"
      />
      
      <div className="container mx-auto px-4 mt-[-50vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/20 transition-colors duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To be the global leader in healthcare data science, driving innovation and excellence in clinical research through advanced analytics and technology.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-secondary/20 transition-colors duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-4">Our Values</h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                {[
                  { text: "Excellence in Research", color: "primary" },
                  { text: "Innovation in Technology", color: "secondary" },
                  { text: "Integrity in Practice", color: "accent" },
                  { text: "Patient-Centric Approach", color: "primary" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.span 
                      className={`w-2 h-2 bg-${item.color} rounded-full`}
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent mb-8">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "100+", text: "Clinical Trials Supported", color: "primary" },
              { number: "50K+", text: "Patients Data Analyzed", color: "secondary" },
              { number: "25+", text: "Global Partners", color: "accent" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-2xl bg-gradient-to-br from-${stat.color}/5 to-${stat.color}/10 
                           border border-${stat.color}/10 hover:border-${stat.color}/20 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 10px 30px -10px var(--${stat.color})` 
                }}
              >
                <motion.h4 
                  className={`text-5xl font-bold text-${stat.color} mb-2`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.2 + 0.2 
                  }}
                >
                  {stat.number}
                </motion.h4>
                <p className="text-gray-600 dark:text-gray-300">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <Button3D onClick={() => navigate("/about")} className="w-64">
            Know More About Us
          </Button3D>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
