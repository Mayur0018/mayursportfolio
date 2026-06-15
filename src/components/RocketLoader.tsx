import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Trail } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ── 3D Rocket Model (built from primitives) ── */
function Rocket({ launched }: { launched: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const flameRef = useRef<THREE.Mesh>(null!);
  const [, setY] = useState(-4);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Gentle idle hover before launch
    if (!launched) {
      groupRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.15 - 4;
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.06;
    } else {
      // Launch upward
      setY((prev) => {
        const next = prev + delta * 6;
        groupRef.current.position.y = next;
        return next;
      });
      // Slight wobble during ascent
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.004) * 0.04;
    }

    // Animate flame flicker
    if (flameRef.current) {
      const scale = 0.85 + Math.sin(Date.now() * 0.015) * 0.2;
      flameRef.current.scale.set(scale, scale * 1.3, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, -4, 0]}>
      {/* ── Body ── */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 2.2, 32]} />
        <meshStandardMaterial color="#2D9CFF" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* ── Nose cone ── */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.35, 0.9, 32]} />
        <meshStandardMaterial color="#FF4F6D" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* ── Window ── */}
      <mesh position={[0, 0.3, 0.42]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#a0d8ff" metalness={0.8} roughness={0.1} emissive="#4fc3f7" emissiveIntensity={0.4} />
      </mesh>

      {/* ── Left Fin ── */}
      <mesh position={[-0.55, -0.8, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.55, 0.9, 0.08]} />
        <meshStandardMaterial color="#FF4F6D" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* ── Right Fin ── */}
      <mesh position={[0.55, -0.8, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.55, 0.9, 0.08]} />
        <meshStandardMaterial color="#FF4F6D" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* ── Back Fin ── */}
      <mesh position={[0, -0.8, -0.55]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.08, 0.9, 0.55]} />
        <meshStandardMaterial color="#FF4F6D" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* ── Engine nozzle ── */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.28, 0.38, 0.3, 24]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ── Flame (animated) ── */}
      <mesh ref={flameRef} position={[0, -1.85, 0]}>
        <coneGeometry args={[0.25, 1.0, 24]} />
        <meshStandardMaterial
          color="#FFC83D"
          emissive="#FF4F6D"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* ── Flame outer glow ── */}
      <mesh position={[0, -2.1, 0]}>
        <coneGeometry args={[0.15, 0.7, 24]} />
        <meshStandardMaterial
          color="#FF4F6D"
          emissive="#FFC83D"
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

/* ── Scene ── */
function Scene({ launched }: { launched: boolean }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[0, -3, 2]} intensity={4} color="#FF4F6D" distance={6} />
      <pointLight position={[0, 0, 3]} intensity={2} color="#2D9CFF" distance={8} />

      {/* Light floating particles instead of stars */}
      <Stars radius={80} depth={60} count={800} factor={3} saturation={0.5} fade speed={launched ? 2 : 0.5} />

      {/* The rocket with motion trail */}
      <Trail
        width={1.2}
        length={6}
        color={new THREE.Color("#FF4F6D")}
        attenuation={(t) => t * t}
      >
        <Rocket launched={launched} />
      </Trail>
    </>
  );
}

/* ── Main exported component ── */
export default function RocketLoader({ onDone }: { onDone: () => void }) {
  const [launched, setLaunched] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Countdown → launch → exit
    const launchTimer = setTimeout(() => setLaunched(true), 1200);
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 700);
    }, 3500);
    return () => {
      clearTimeout(launchTimer);
      clearTimeout(exitTimer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="rocket-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[200]"
          style={{ background: "#F7F4EF" }}
        >
          <Canvas
            camera={{ position: [0, 0, 7], fov: 55 }}
            style={{ width: "100%", height: "100%" }}
            gl={{ alpha: true }}
          >
            <color attach="background" args={["#F7F4EF"]} />
            <Scene launched={launched} />
          </Canvas>

          {/* Countdown text */}
          <AnimatePresence>
            {!launched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-3"
              >
                <p className="text-[#111]/50 text-xs font-bold tracking-[0.4em] uppercase">
                  Preparing for launch
                </p>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#FF4F6D]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.3 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            {launched && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-16 left-0 right-0 flex justify-center"
              >
                <p
                  className="text-[#111] text-xl font-black tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Playfair Display',serif" }}
                >
                  🚀 Launching...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
