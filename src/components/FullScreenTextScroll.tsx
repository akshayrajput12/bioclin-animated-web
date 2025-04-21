import React from 'react';
import { TextScrollReveal } from './ui/text-scroll-reveal';

interface FullScreenTextScrollProps {
  text?: string;
  className?: string;
}

export const FullScreenTextScroll: React.FC<FullScreenTextScrollProps> = ({ 
  text = "BioClinPharm is pioneering the future of healthcare through innovative data science solutions.",
  className 
}) => {
  return (
    <div className="w-full">
      <TextScrollReveal text={text} className={className} />
    </div>
  );
};

export default FullScreenTextScroll;
