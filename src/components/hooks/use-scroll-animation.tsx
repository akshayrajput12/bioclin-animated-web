import { useEffect, useRef } from "react"
import { useAnimation } from "framer-motion"

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Use a more performant observer configuration
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start animation and then disconnect to save resources
          controls.start("visible")

          // Once the animation has started, we can disconnect the observer
          // This prevents unnecessary calculations during scroll
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      {
        threshold,
        rootMargin: '50px', // Start loading a bit earlier
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls, threshold])

  return { ref, controls }
}

export const scrollAnimationVariants = {
  hidden: {
    opacity: 0,
    y: 30, // Reduced distance for smoother animation
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Faster animation
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export const staggerAnimationVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster staggering for better performance
    },
  },
}

export const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 15, // Reduced distance for smoother animation
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Faster animation
      ease: "easeOut",
    },
  },
}

export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5, // Faster fade in
      ease: "easeOut",
    },
  },
}
