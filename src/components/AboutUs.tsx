import React from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { TextRevealByWord } from "./ui/text-reveal";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, Shield, Heart, Zap } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative py-24"
      style={{ scale }}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Animated Background */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity: backgroundOpacity }}
      >
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(var(--primary-rgb),0.15),transparent_50%)]"
          style={{
            "--mouse-x": useMotionTemplate`${mouseX.get() * 100}%`,
            "--mouse-y": useMotionTemplate`${mouseY.get() * 100}%`,
          } as any}
        />
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
        className="mb-32 max-w-4xl mx-auto text-center text-xl leading-relaxed"
      />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
              }}
            />
            <motion.div className="relative">
              <motion.div
                className="w-12 h-12 mb-6 rounded-lg bg-primary/10 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Star className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be the global leader in healthcare data science, driving innovation and excellence in clinical research through advanced analytics and technology.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-secondary/20 transition-all duration-500"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="w-12 h-12 mb-6 rounded-lg bg-secondary/10 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-6 h-6 text-secondary" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-6">
                Our Values
              </h3>
              <ul className="space-y-6">
                {[
                  { text: "Excellence in Research", color: "primary", icon: Star },
                  { text: "Innovation in Technology", color: "secondary", icon: Zap },
                  { text: "Integrity in Practice", color: "accent", icon: Shield },
                  { text: "Patient-Centric Approach", color: "primary", icon: Heart },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-4 group/item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className={`w-8 h-8 rounded-lg bg-${item.color}/10 flex items-center justify-center
                                group-hover/item:bg-${item.color}/20 transition-colors duration-300`}
                    >
                      <item.icon className={`w-4 h-4 text-${item.color}`} />
                    </motion.div>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{item.text}</span>
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
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent mb-12">
            Our Global Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "100+", text: "Clinical Trials Supported", color: "primary" },
              { number: "50K+", text: "Patients Data Analyzed", color: "secondary" },
              { number: "25+", text: "Global Partners", color: "accent" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`group p-8 rounded-2xl bg-gradient-to-br from-${stat.color}/5 via-transparent to-${stat.color}/10 
                           border border-${stat.color}/10 hover:border-${stat.color}/20 transition-all duration-500
                           hover:shadow-lg hover:shadow-${stat.color}/20`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.h4 
                  className={`text-6xl font-bold text-${stat.color} mb-4 group-hover:scale-110 transition-transform duration-500`}
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
                <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.text}</p>
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
          <motion.button
            onClick={() => navigate("/about")}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl
                     text-white font-semibold overflow-hidden transition-all duration-300
                     hover:shadow-lg hover:shadow-primary/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Our Story
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
