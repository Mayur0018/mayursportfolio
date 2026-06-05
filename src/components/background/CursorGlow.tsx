"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CursorGlow() {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse move handler with smooth spring animation
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  // Spring configuration for smooth premium feel
  const springConfig = { stiffness: 150, damping: 25, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  // Secondary glow with more delay for trailing effect
  const trailSpringConfig = { stiffness: 100, damping: 30, mass: 1.2 };
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  // Dynamic opacity based on screen size
  const opacity = useTransform(
    [glowX, glowY],
    () => (isMobile ? 0 : 0.25)
  );

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px circle at ${glowX}px ${glowY}px, 
            rgba(139, 92, 246, 0.15), 
            rgba(59, 130, 246, 0.1), 
            transparent 40%)`,
          opacity,
        }}
      />

      {/* Secondary trailing glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(400px circle at ${trailX}px ${trailY}px, 
            rgba(6, 182, 212, 0.1), 
            rgba(139, 92, 246, 0.05), 
            transparent 40%)`,
          opacity: 0.15,
        }}
      />

      {/* Small intense glow at cursor */}
      <motion.div
        className="pointer-events-none fixed z-0 mix-blend-screen"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          filter: "blur(40px)",
        }}
      />
    </>
  );
}
