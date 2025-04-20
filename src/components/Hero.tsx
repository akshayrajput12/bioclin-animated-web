import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { renderCanvas } from "./ui/canvas";
import { MarqueeAnimation } from "./ui/marquee-effect";
import { Link } from "react-router-dom";
import { ParticleButton } from "./ui/particle-button";
import { LinkPreview } from "./ui/link-preview";
import { MotionWrapper } from "./ui/motion-wrapper";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax effect
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Wait for canvas to be properly mounted
      requestAnimationFrame(() => {
        try {
          renderCanvas(canvas);
        } catch (error) {
          console.error('Error initializing canvas:', error);
        }
      });
    }

    // Cleanup function
    return () => {
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.running = false;
        }
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen pt-20 flex items-center relative overflow-hidden font-poppins"
      onMouseMove={handleMouseMove}
      style={{ scale }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 mx-auto z-[1] opacity-30"
      ></canvas>
      
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
        style={{ 
          y,
          opacity,
          backgroundPosition: useMotionTemplate`${mouseX.get() * 100}% ${mouseY.get() * 100}%`
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <MotionWrapper type="entrance" className="mb-6">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                BioClinPharm
              </motion.span>
            </h1>
          </MotionWrapper>

          <MotionWrapper type="scroll" className="mb-8">
            <h2 className="font-plusJakarta text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
              Excellence in Clinical Trials and Research
            </h2>
          </MotionWrapper>

          <motion.p
            className="font-plusJakarta text-xl mb-12 text-gray-700 dark:text-gray-300 leading-relaxed"
            variants={wordVariants}
          >
            By combining world-class expertise and technical innovation with the highest standards
            of regulatory and quality assurance, we stand shoulder to shoulder with our clients
            as a seamless and reliable extension of their team.
          </motion.p>

          <MotionWrapper
            className="flex justify-center gap-6"
            whileHover={{ scale: 1 }}
          >
            <ParticleButton
              className="glass-effect hover-lift"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              Learn More
            </ParticleButton>
            
            <Link to="/contact">
              <motion.button
                className="bg-secondary/90 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-secondary transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </MotionWrapper>
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <MarqueeAnimation
            direction="left"
            baseVelocity={-3}
            className="bg-primary/20 text-primary py-2 backdrop-blur-sm"
          >
            Excellence in Clinical Research
          </MarqueeAnimation>
          <MarqueeAnimation
            direction="right"
            baseVelocity={-3}
            className="bg-secondary/20 text-secondary py-2 backdrop-blur-sm"
          >
            Innovation in Healthcare
          </MarqueeAnimation>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;