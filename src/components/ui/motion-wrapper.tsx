import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
  type?: "hover" | "scroll" | "entrance";
}

export const MotionWrapper = ({ 
  children, 
  className = "", 
  type = "hover",
  ...props 
}: MotionWrapperProps) => {
  const getAnimationProps = () => {
    switch (type) {
      case "hover":
        return {
          whileHover: { 
            scale: 1.05,
            rotate: 1,
            transition: { type: "spring", stiffness: 300 }
          },
          whileTap: { scale: 0.95 }
        };
      case "scroll":
        return {
          initial: { opacity: 0, y: 50 },
          whileInView: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              duration: 1,
              bounce: 0.3
            }
          },
          viewport: { once: true, margin: "-100px" }
        };
      case "entrance":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: {
              type: "spring",
              duration: 0.8,
              bounce: 0.35
            }
          }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={className}
      {...getAnimationProps()}
      {...props}
    >
      {children}
    </motion.div>
  );
}; 