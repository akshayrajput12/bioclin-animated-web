import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScrollAnimation, scrollAnimationVariants } from "../hooks/use-scroll-animation"

interface ScrollSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  threshold?: number
  className?: string
  as?: "section" | "div"
}

export const ScrollSection = ({
  children,
  threshold = 0.1,
  className,
  as = "section",
  ...props
}: ScrollSectionProps) => {
  const { ref, controls } = useScrollAnimation(threshold)
  const Component = motion[as]

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={scrollAnimationVariants}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export const ScrollItem = motion.div
