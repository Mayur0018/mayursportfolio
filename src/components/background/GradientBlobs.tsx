"use client";

import { motion } from "framer-motion";

export default function GradientBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-left purple blob */}
      <motion.div
        className="absolute -top-[20%] -left-[20%] w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top-right blue blob */}
      <motion.div
        className="absolute -top-[20%] -right-[20%] w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0) 70%)",
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Bottom-left cyan blob */}
      <motion.div
        className="absolute -bottom-[20%] -left-[20%] w-[45%] h-[45%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0) 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Bottom-right purple-blue blob */}
      <motion.div
        className="absolute -bottom-[20%] -right-[20%] w-[55%] h-[55%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)",
          filter: "blur(110px)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Center subtle glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)",
          filter: "blur(120px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
