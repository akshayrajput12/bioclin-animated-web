"use client";

import { FC, useRef, useMemo } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextScrollRevealProps {
  text?: string; // Make text optional
  className?: string;
}

const TextScrollReveal: FC<TextScrollRevealProps> = ({
  text = "", // Provide default empty string
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Split text into words
  const words = useMemo(() => text.split(" ").filter(Boolean), [text]);

  // Highlight important words with emphasis on data
  const keyWords = useMemo(() => [
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
  ], []);

  // Words to make extra prominent
  const dataWords = useMemo(() => ['data', 'science', 'analysis'], []);

  // Pre-calculate word properties
  const wordProperties = useMemo(() => {
    return words.map((word, i) => {
      const start = i / Math.max(words.length, 1); // Avoid division by zero

      // Check if this is a key word to highlight
      const isKeyWord = keyWords.some(
        keyword => word.toLowerCase().includes(keyword.toLowerCase())
      );

      // Check if this is a data-related word to make extra prominent
      const isDataWord = dataWords.some(
        dataWord => word.toLowerCase().includes(dataWord.toLowerCase())
      );

      return { word, start, isKeyWord, isDataWord };
    });
  }, [words, keyWords, dataWords]);

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
        {wordProperties.map(({ word, isKeyWord, isDataWord, start }, i) => {
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
              style={{ scale }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: start * 0.2 // Stagger the animations based on word position
              }}
              whileHover={{ scale: isDataWord ? 1.15 : 1.05 }}
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
