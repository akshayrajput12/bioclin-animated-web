import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { renderCanvas } from "./ui/canvas";
import { MarqueeAnimation } from "./ui/marquee-effect";
import { Link } from "react-router-dom";
import { ParticleButton } from "./ui/particle-button";
import { LinkPreview } from "./ui/link-preview";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <section className="min-h-screen pt-20 flex items-center relative overflow-hidden font-poppins">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 mx-auto z-[1] opacity-30"
      ></canvas>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to{" "}
            <LinkPreview
              url="/about"
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-secondary/90 hover:to-primary/90 transition-all duration-500 inline-block"
              width={150}
              height={90}
              imageSrc="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop"
            >
              BioClinPharm
            </LinkPreview>
          </h1>
          <h2 className="font-plusJakarta text-2xl md:text-4xl mb-8 text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
            <LinkPreview
              url="/services"
              className="text-primary/90 hover:text-secondary/90 transition-all duration-500 inline-block"
              width={120}
              height={70}
              imageSrc="https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=800&auto=format&fit=crop"
            >
              Excellence
            </LinkPreview>{" "}
            in Clinical Trials and{" "}
            <LinkPreview
              url="/research"
              className="text-secondary/90 hover:text-primary/90 transition-all duration-500 inline-block"
              width={120}
              height={70}
              imageSrc="https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=800&auto=format&fit=crop"
            >
              Research
            </LinkPreview>
          </h2>
          <p className="font-plusJakarta text-xl mb-12 text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            By combining{" "}
            <LinkPreview
              url="/expertise"
              className="bg-clip-text text-transparent bg-gradient-to-b from-primary/90 to-secondary/90 hover:from-secondary/90 hover:to-primary/90 transition-all duration-500 font-semibold inline-block"
              width={120}
              height={70}
              imageSrc="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop"
            >
              world-class expertise
            </LinkPreview>{" "}
            and{" "}
            <LinkPreview
              url="/innovation"
              className="bg-clip-text text-transparent bg-gradient-to-b from-secondary/90 to-primary/90 hover:from-primary/90 hover:to-secondary/90 transition-all duration-500 font-semibold inline-block"
              width={120}
              height={70}
              imageSrc="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop"
            >
              technical innovation
            </LinkPreview>
            , with the highest standards of{" "}
            <LinkPreview
              url="/quality"
              className="bg-clip-text text-transparent bg-gradient-to-b from-primary/90 to-secondary/90 hover:from-secondary/90 hover:to-primary/90 transition-all duration-500 font-semibold inline-block"
              width={120}
              height={70}
              imageSrc="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop"
            >
              regulatory and quality assurance
            </LinkPreview>
            , we stand shoulder to shoulder with our clients as a seamless and reliable extension of their team.
          </p>
          <ParticleButton
            size="lg"
            className="bg-primary/90 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary transition-colors duration-300 backdrop-blur-sm"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }}
          >
            Learn More
          </ParticleButton>
        </motion.div>

        <div className="mt-20">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;