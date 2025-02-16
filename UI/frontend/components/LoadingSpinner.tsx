"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <motion.div
      className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
} 