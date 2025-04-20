"use client";

import { FC, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextScrollRevealProps {
  text: string;
  className?: string;
}

const TextScrollReveal: FC<TextScrollRevealProps> = ({
  text,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = text.split(" ");

  // Highlight important words with emphasis on data
  const keyWords = [
    'BioClinPharm',
    'data',
    'science',
    'healthcare',
    'innovative',
    'pioneering',
    'future',
    'transform',
    'clinical',
    'research',
    'patient',
    'outcomes',
    'technology',
    'analysis'
  ];

  // Words to make extra prominent
  const dataWords = ['data', 'science', 'analysis'];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-screen flex items-center justify-center bg-transparent overflow-hidden p-0 m-0",
        className
      )}
    >
      <motion.div
        className="w-full h-full flex flex-wrap justify-center items-center p-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          // Check if this is a key word to highlight
          const isKeyWord = keyWords.some(
            keyword => word.toLowerCase().includes(keyword.toLowerCase())
          );

          // Check if this is a data-related word to make extra prominent
          const isDataWord = dataWords.some(
            dataWord => word.toLowerCase().includes(dataWord.toLowerCase())
          );

          // Create a transform based on scroll position
          const opacity = useTransform(
            scrollYProgress,
            [start, Math.min(start + 0.05, 0.8)],
            [0, 1]
          );

          const y = useTransform(
            scrollYProgress,
            [start, Math.min(start + 0.05, 0.8)],
            [20, 0]
          );

          // Scale effect for data words
          const scale = isDataWord ? 1.2 : 1;

          return (
            <motion.span
              key={i}
              className={cn(
                "mx-2 my-1 text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold",
                isDataWord
                  ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent scale-110 drop-shadow-lg"
                  : isKeyWord
                    ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    : "text-black dark:text-white"
              )}
              style={{ opacity, y, scale }}
              whileHover={{ scale: isDataWord ? 1.15 : 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
};

export { TextScrollReveal };
