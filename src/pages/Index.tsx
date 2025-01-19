import { Hero } from "@/components/Hero"
import { ExpertiseSection } from "@/components/ExpertiseSection"

export default function Index() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ExpertiseSection />
      <div className="text-center mt-8">
        <h2 className="text-3xl font-bold">Welcome to BioClinPharm</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto px-4">
          Discover how our team's experience and meticulous approach to trial data management set us apart.
        </p>
      </div>
    </main>
  )
}
