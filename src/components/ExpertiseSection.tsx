import { FeatureSteps } from "./ui/feature-section";

const features = [
  {
    step: "Knowledge",
    title: "Knowledge",
    content: "We are proud and passionate experts dedicated to the support of our clients' industry. Our relentless focus on quality, diligence, and integrity enables us to deliver actionable, objective insights.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    step: "Collaboration",
    title: "Collaboration",
    content: "We work together. Connected as one. A united partnership with the same drive and determination to make a difference and change people's lives. We build trust in all our relationships.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    step: "Accountability",
    title: "Accountability",
    content: "We take ownership and fulfill our commitments. We stand behind the promises we make to every customer, partner, and colleague. We have immense pride in the quality of our work.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  }
];

export function ExpertiseSection() {
  return (
    <FeatureSteps
      features={features}
      title="Our Expertise"
      autoPlayInterval={4000}
      imageHeight="h-[500px]"
    />
  );
}