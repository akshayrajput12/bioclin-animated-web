"use client"

import { FeatureSteps } from "@/components/ui/feature-section"

const expertiseFeatures = [
  {
    step: "Knowledge",
    title: "Knowledge & Expertise",
    content: "We are proud and passionate experts dedicated to the support of our clients' industry. Our relentless focus on quality, diligence, and integrity enables us to deliver actionable, objective insights.",
    image: "/placeholder.svg"
  },
  {
    step: "Collaboration",
    title: "Collaborative Approach",
    content: "We work together. Connected as one. A united partnership with the same drive and determination to make a difference and change people's lives. We build trust in all our relationships.",
    image: "/placeholder.svg"
  },
  {
    step: "Accountability",
    title: "Accountability & Excellence",
    content: "We take ownership and fulfill our commitments. We stand behind the promises we make to every customer, partner, and colleague. We have immense pride in the quality of our work.",
    image: "/placeholder.svg"
  }
]

export function ExpertiseSection() {
  return (
    <section className="bg-background py-16">
      <FeatureSteps 
        features={expertiseFeatures}
        title="Our Expertise"
        autoPlayInterval={4000}
        className="bg-gradient-to-b from-secondary/20 to-background"
      />
      <div className="text-center mt-8">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto px-4">
          Discover how our team's experience and meticulous approach to trial data management set us apart.
        </p>
      </div>
    </section>
  )
}