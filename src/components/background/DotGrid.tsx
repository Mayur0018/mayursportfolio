"use client";

import { motion } from "framer-motion";

export default function DotGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-20">
      <svg className="w-full h-full">
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="rgba(139, 92, 246, 0.3)" />
          </pattern>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          animate={{
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
