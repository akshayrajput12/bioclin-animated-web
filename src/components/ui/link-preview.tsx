"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  imageSrc: string;
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  imageSrc,
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <img
            src={imageSrc}
            width={width}
            height={height}
            alt="hidden image"
            className="w-0 h-0"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          asChild
        >
          <a href={url} className="inline-block">
            {children}
          </a>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-50"
          side="top"
          align="center"
          sideOffset={5}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 10, scale: 0.6 }}
                className="shadow-lg rounded-lg"
                style={{
                  x: translateX,
                }}
              >
                <a
                  href={url}
                  className="block p-0.5 bg-white/80 border border-transparent shadow-sm rounded-lg hover:border-neutral-200 dark:hover:border-neutral-800 dark:bg-gray-900/80 backdrop-blur-sm"
                  style={{ fontSize: 0 }}
                >
                  <img
                    src={imageSrc}
                    width={width}
                    height={height}
                    className="rounded-md w-auto h-auto object-cover"
                    alt="preview image"
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};
