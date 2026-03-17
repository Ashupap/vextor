"use client";

import { motion } from "framer-motion";

export default function VectorArrow() {
  // Glowing dot grid forming an arrow shape
  const dots: { x: number; y: number; size: number; delay: number; opacity: number }[] = [];

  // Arrow shape: shaft + arrowhead
  const shaftPoints = [
    // Shaft rows (left to right)
    ...Array.from({ length: 8 }, (_, i) => ({
      x: 20 + i * 28,
      y: 120,
      size: 5,
      delay: i * 0.08,
      opacity: 0.5 + i * 0.06,
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      x: 20 + i * 28,
      y: 148,
      size: 4,
      delay: 0.1 + i * 0.08,
      opacity: 0.4 + i * 0.07,
    })),
    // Arrowhead (triangle of dots)
    { x: 240, y: 68, size: 6, delay: 0.5, opacity: 0.8 },
    { x: 268, y: 84, size: 7, delay: 0.55, opacity: 0.9 },
    { x: 296, y: 100, size: 9, delay: 0.6, opacity: 1 },
    { x: 268, y: 116, size: 7, delay: 0.55, opacity: 0.9 },
    { x: 240, y: 132, size: 6, delay: 0.5, opacity: 0.8 },
    { x: 240, y: 100, size: 6, delay: 0.52, opacity: 0.85 },
    { x: 268, y: 100, size: 8, delay: 0.57, opacity: 0.95 },
    // Arrowhead outer
    { x: 296, y: 68, size: 5, delay: 0.6, opacity: 0.6 },
    { x: 320, y: 84, size: 5, delay: 0.65, opacity: 0.7 },
    { x: 340, y: 100, size: 10, delay: 0.7, opacity: 1 },
    { x: 320, y: 116, size: 5, delay: 0.65, opacity: 0.7 },
    { x: 296, y: 132, size: 5, delay: 0.6, opacity: 0.6 },
    // Extra scattered dots for depth
    { x: 60, y: 96, size: 3, delay: 0.2, opacity: 0.3 },
    { x: 88, y: 96, size: 3, delay: 0.25, opacity: 0.35 },
    { x: 116, y: 96, size: 4, delay: 0.3, opacity: 0.4 },
    { x: 60, y: 172, size: 3, delay: 0.2, opacity: 0.25 },
    { x: 88, y: 172, size: 3, delay: 0.25, opacity: 0.3 },
    { x: 116, y: 172, size: 3, delay: 0.3, opacity: 0.35 },
  ];

  return (
    <div className="float-anim" style={{ width: 380, height: 220, position: "relative" }}>
      <svg width="380" height="220" viewBox="0 0 380 220" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F2FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0090A8" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {shaftPoints.map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={dot.size}
            fill="url(#dotGrad)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, dot.opacity, dot.opacity * 0.7, dot.opacity],
              scale: [0, 1, 0.85, 1],
            }}
            transition={{
              delay: dot.delay,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Connecting glow trail */}
        <motion.path
          d="M 20 134 L 240 134"
          stroke="rgba(0,242,255,0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
