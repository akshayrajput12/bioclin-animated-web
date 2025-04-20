import { ScrollExpertiseSection } from "./ui/scroll-expertise-section";

const expertiseItems = [
  {
    title: "Knowledge",
    content: "We are proud and passionate experts dedicated to the support of our clients' industry. Our relentless focus on quality, diligence, and integrity enables us to deliver actionable, objective insights.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    title: "Collaboration",
    content: "We work together. Connected as one. A united partnership with the same drive and determination to make a difference and change people's lives. We build trust in all our relationships.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    title: "Accountability",
    content: "We take ownership and fulfill our commitments. We stand behind the promises we make to every customer, partner, and colleague. We have immense pride in the quality of our work.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "Innovation",
    content: "We constantly seek new and better ways to solve problems. Our innovative approach combines cutting-edge technology with deep industry expertise to deliver solutions that drive meaningful results.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
  },
  {
    title: "Data Science",
    content: "Our data science capabilities transform complex information into actionable insights. We leverage advanced analytics, machine learning, and AI to uncover patterns and opportunities that drive business value.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  }
];

export function ExpertiseSection() {
  return (
    <ScrollExpertiseSection
      items={expertiseItems}
      title="Our Expertise"
    />
  );
}