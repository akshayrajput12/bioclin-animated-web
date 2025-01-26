import { Home, User, Briefcase, FileText } from 'lucide-react';
import { NavBar } from "./tubelight-navbar";
import { useScreenSize } from "../hooks/use-screen-size";
import { PixelTrail } from "./pixel-trail";
import { motion } from 'framer-motion';
import React from "react";
import { FeaturesSectionWithHoverEffects } from "./feature-section-with-hover-effects";

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText }
  ];

  return <NavBar items={navItems} />;
}

export const PixelTrailDemo: React.FC = () => {
  const screenSize = useScreenSize();

  return (
    <div className="relative w-full h-full min-h-[500px] bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-900/80 dark:to-gray-800/80 text-black dark:text-white flex flex-col font-playfair rounded-xl overflow-hidden backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
      
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 48 : 80}
          fadeDuration={0}
          delay={1200}
          pixelClassName="rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 dark:from-primary/40 dark:to-secondary/40 backdrop-blur-sm"
        />
      </div>

      <div className="justify-center items-center flex flex-col w-full h-full z-10 pointer-events-none space-y-2 md:space-y-8">
        <motion.h2 
          className="text-3xl cursor-pointer sm:text-5xl md:text-7xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          whileInView={{ scale: [0.9, 1.1, 1] }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Data-Driven ✦ Excellence
        </motion.h2>
        <motion.p 
          className="text-xs md:text-2xl font-plusJakarta text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Where science meets innovation.
        </motion.p>
      </div>

      <motion.p 
        className="absolute text-xs md:text-base bottom-4 right-4 pointer-events-none font-plusJakarta text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        Advancing healthcare through technology.
      </motion.p>
    </div>
  );
};

function FeaturesSectionWithHoverEffectsDemo() {
  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full">
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}

export { FeaturesSectionWithHoverEffectsDemo };
