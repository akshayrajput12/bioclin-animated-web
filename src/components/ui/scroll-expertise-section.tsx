import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ExpertiseItem {
  title: string;
  content: string;
  image: string;
}

interface ScrollExpertiseSectionProps {
  items: ExpertiseItem[];
  title?: string;
  className?: string;
}

export function ScrollExpertiseSection({
  items,
  title = "Our Expertise",
  className,
}: ScrollExpertiseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemRefs, setItemRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);

  // Initialize refs for each item
  useEffect(() => {
    setItemRefs(items.map(() => React.createRef<HTMLDivElement>()));
  }, [items]);

  // Track scroll position to determine active item using IntersectionObserver
  useEffect(() => {
    if (!itemRefs.length) return;

    const observers = [];

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5], // Trigger when 50% of the element is visible
    };

    // Create an observer for each item
    itemRefs.forEach((ref, index) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // When the element is intersecting (visible)
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveIndex(index);
          }
        });
      }, observerOptions);

      observer.observe(ref.current);
      observers.push(observer);
    });

    // Cleanup observers on unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [itemRefs]);

  return (
    <div
      ref={containerRef}
      className={cn("py-16 md:py-24 min-h-screen expertise-section", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {title}
        </motion.h2>

        {/* Scroll indicator - simplified animation */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-primary"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Sticky Image Column - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-24 lg:self-start h-[300px] md:h-[400px] lg:h-[500px] sticky-image">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all",
                    index === activeIndex
                      ? "opacity-100 z-10 scale-100 duration-500"
                      : index < activeIndex
                        ? "opacity-0 z-0 scale-95 translate-y-full duration-300"
                        : "opacity-0 z-0 scale-105 -translate-y-full duration-300"
                  )}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover expertise-image"
                    loading="lazy"
                    decoding="async"
                    style={{ transformOrigin: 'center center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                  </div>
                </div>
              ))}

              {/* Image overlay - simplified */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 pointer-events-none"></div>

              {/* Progress indicator */}
              <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
                {items.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      index === activeIndex
                        ? "bg-primary w-8 shadow-lg shadow-primary/50"
                        : "bg-white/50 w-2 hover:bg-white/80 hover:w-3 cursor-pointer"
                    )}
                    onClick={() => {
                      // Scroll to the corresponding item when indicator is clicked
                      if (itemRefs[index]?.current) {
                        itemRefs[index].current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable Content Column */}
          <div className="w-full lg:w-1/2 space-y-[40vh] lg:space-y-[60vh] py-8">
            {/* Mobile image preview - only visible on mobile */}
            <div className="lg:hidden sticky top-24 mb-8 z-10">
              <div className="relative w-full h-[250px] rounded-xl overflow-hidden shadow-xl">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute inset-0 transition-all",
                      index === activeIndex
                        ? "opacity-100 z-10 scale-100 duration-300"
                        : index < activeIndex
                          ? "opacity-0 z-0 scale-95 translate-x-full duration-300"
                          : "opacity-0 z-0 scale-105 -translate-x-full duration-300"
                    )}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover expertise-image"
                    loading="lazy"
                    decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <div className="w-12 h-1 bg-primary rounded-full mt-1"></div>
                    </div>
                  </div>
                ))}

                {/* Mobile progress indicator */}
                <div className="absolute bottom-4 right-4 flex space-x-1.5 z-20">
                  {items.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        index === activeIndex
                          ? "bg-primary w-6"
                          : "bg-white/50 w-1.5"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                ref={itemRefs[index]}
                className={cn(
                  "transition-all duration-300 p-8 rounded-xl relative",
                  activeIndex === index
                    ? "bg-white/10 shadow-xl border border-primary/20 transform scale-102"
                    : "opacity-80 hover:opacity-95 hover:bg-white/5 hover:shadow-lg"
                )}
              >
                {/* Simplified background decoration */}
                {activeIndex === index && (
                  <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-transparent rounded-xl -z-10"></div>
                )}

                <h3 className={cn(
                  "text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 flex items-center",
                  activeIndex === index ? "text-primary" : "text-secondary"
                )}>
                  {activeIndex === index && (
                    <div className="w-3 h-3 rounded-full bg-primary mr-3" />
                  )}
                  {item.title}
                </h3>

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.content}
                </p>

                {/* Simplified visual indicator that this section is active */}
                {activeIndex === index && (
                  <div className="mt-6 flex items-center text-primary font-semibold">
                    <div className="w-4 h-4 rounded-full bg-primary mr-2 animate-pulse"></div>
                    Currently Viewing
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
