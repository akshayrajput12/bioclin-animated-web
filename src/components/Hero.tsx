"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { renderCanvas } from "@/components/ui/canvas"
import { Button } from "@/components/ui/button"
import Link from "react-router-dom"

export function Hero() {
  useEffect(() => {
    renderCanvas()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        className="absolute inset-0 pointer-events-none"
        id="canvas"
      />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to BioClinPharm
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-primary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Excellence in Clinical Trials and Research
        </motion.p>
        <motion.p 
          className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Bringing life-changing drugs to market through world-class expertise and technical innovation
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Link to="/contact">
            <Button size="lg" variant="default">
              Get Started
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}