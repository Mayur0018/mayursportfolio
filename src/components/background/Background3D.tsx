import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Background3D() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const nx = (e.clientX - cx) / cx;
      const ny = (e.clientY - cy) / cy;
      x.set(nx);
      y.set(ny);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  const rotateX = useTransform(y, [-1, 1], [10, -10]);
  const rotateY = useTransform(x, [-1, 1], [-10, 10]);
  const rX = useSpring(rotateX, { stiffness: 80, damping: 20, mass: 0.5 });
  const rY = useSpring(rotateY, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ perspective: 1200 }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0"
          style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full opacity-30 blur-3xl"
            style={{
              translateZ: -120,
              background:
                "radial-gradient(closest-side, rgba(59,130,246,0.6), rgba(59,130,246,0) 70%)",
            }}
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute top-1/3 -right-48 w-[36rem] h-[36rem] rounded-full opacity-25 blur-3xl"
            style={{
              translateZ: -200,
              background:
                "radial-gradient(closest-side, rgba(99,102,241,0.5), rgba(99,102,241,0) 70%)",
            }}
            animate={{ y: [0, 25, 0] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />

          <motion.div
            className="absolute bottom-[-10rem] left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full opacity-20 blur-3xl"
            style={{
              translateZ: -260,
              background:
                "radial-gradient(closest-side, rgba(16,185,129,0.45), rgba(16,185,129,0) 70%)",
            }}
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />

          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              translateZ: -180,
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
            animate={{ opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
