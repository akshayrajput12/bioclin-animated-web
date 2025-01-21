'use client'

import { motion } from "framer-motion"

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <motion.div
        className="flex items-center justify-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Loader
