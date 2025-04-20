import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Track scroll position to determine active item
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || itemRefs.length === 0) return;

      const viewportHeight = window.innerHeight;

      // Find the item that's closest to the middle of the viewport
      let newActiveIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < itemRefs.length; i++) {
        const ref = itemRefs[i];
        if (!ref.current) continue;

        const itemRect = ref.current.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const distanceFromCenter = Math.abs(itemCenter - (viewportHeight / 2));

        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          newActiveIndex = i;
        }
      }

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Add resize event listener to recalculate on window resize
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [itemRefs, activeIndex]);

  return (
    <div
      ref={containerRef}
      className={cn("py-16 md:py-24 min-h-screen", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        {/* Scroll indicator */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-primary"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Sticky Image Column - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-24 lg:self-start h-[300px] md:h-[400px] lg:h-[500px]">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all",
                    index === activeIndex
                      ? "opacity-100 z-10 scale-100 duration-1000"
                      : index < activeIndex
                        ? "opacity-0 z-0 scale-95 translate-y-full duration-700"
                        : "opacity-0 z-0 scale-105 -translate-y-full duration-700"
                  )}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-10000 hover:scale-110"
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

              {/* Image overlay with subtle animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay pointer-events-none"></div>

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
          <div className="w-full lg:w-1/2 space-y-[45vh] lg:space-y-[75vh] py-8">
            {/* Mobile image preview - only visible on mobile */}
            <div className="lg:hidden sticky top-24 mb-8 z-10">
              <div className="relative w-full h-[250px] rounded-xl overflow-hidden shadow-xl">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute inset-0 transition-all",
                      index === activeIndex
                        ? "opacity-100 z-10 scale-100 duration-700"
                        : index < activeIndex
                          ? "opacity-0 z-0 scale-95 translate-x-full duration-500"
                          : "opacity-0 z-0 scale-105 -translate-x-full duration-500"
                    )}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
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
                  "transition-all duration-700 p-8 rounded-xl relative",
                  activeIndex === index
                    ? "bg-white/10 shadow-xl border border-primary/20 transform scale-105"
                    : "opacity-70 hover:opacity-90 hover:bg-white/5 hover:shadow-lg"
                )}
              >
                {/* Background decoration */}
                {activeIndex === index && (
                  <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-transparent rounded-xl -z-10 blur-sm"></div>
                )}

                <h3 className={cn(
                  "text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 flex items-center",
                  activeIndex === index ? "text-primary" : "text-secondary"
                )}>
                  {activeIndex === index && (
                    <motion.div
                      className="w-3 h-3 rounded-full bg-primary mr-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    />
                  )}
                  {item.title}
                </h3>

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.content}
                </p>

                {/* Visual indicator that this section is active */}
                {activeIndex === index && (
                  <motion.div
                    className="mt-6 flex items-center text-primary font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-primary mr-2 animate-pulse"></div>
                    Currently Viewing
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
