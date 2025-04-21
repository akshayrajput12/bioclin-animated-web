import { useEffect } from "react";
import { ScrollExpertiseSection } from "./ui/scroll-expertise-section";
import { disableSmoothScrollTemporarily, optimizeExpertiseImages } from "../utils/scroll-performance";

// Add size and quality parameters to Unsplash images for better performance
const expertiseItems = [
  {
    title: "Knowledge",
    content: "We are proud and passionate experts dedicated to the support of our clients' industry. Our relentless focus on quality, diligence, and integrity enables us to deliver actionable, objective insights.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=800&q=75"
  },
  {
    title: "Collaboration",
    content: "We work together. Connected as one. A united partnership with the same drive and determination to make a difference and change people's lives. We build trust in all our relationships.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=800&q=75"
  },
  {
    title: "Accountability",
    content: "We take ownership and fulfill our commitments. We stand behind the promises we make to every customer, partner, and colleague. We have immense pride in the quality of our work.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&w=800&q=75"
  },
  {
    title: "Innovation",
    content: "We constantly seek new and better ways to solve problems. Our innovative approach combines cutting-edge technology with deep industry expertise to deliver solutions that drive meaningful results.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&w=800&q=75"
  },
  {
    title: "Data Science",
    content: "Our data science capabilities transform complex information into actionable insights. We leverage advanced analytics, machine learning, and AI to uncover patterns and opportunities that drive business value.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&w=800&q=75"
  }
];

export function ExpertiseSection() {
  // Apply performance optimizations when component mounts
  useEffect(() => {
    // Optimize image loading
    optimizeExpertiseImages();

    // Disable smooth scrolling temporarily during initial load
    // to prevent performance issues
    disableSmoothScrollTemporarily(1500);

    // Re-enable performance optimizations on scroll
    const handleScroll = () => {
      if (window.scrollY > 300) {
        disableSmoothScrollTemporarily(500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollExpertiseSection
      items={expertiseItems}
      title="Our Expertise"
    />
  );
}