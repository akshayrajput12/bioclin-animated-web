import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface Button3DProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button3D = ({ children, onClick, className = "" }: Button3DProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative bg-gradient-to-br from-primary via-secondary to-accent rounded-xl px-8 py-4 
                   text-white font-bold text-center text-xl shadow-xl transition-all duration-200 
                   group-hover:shadow-2xl group-hover:scale-105"
      >
        {children}
        <div className="absolute inset-0 bg-black/10 rounded-xl transform -translate-z-2" />
      </div>
    </motion.div>
  );
};
