"use client";

import { motion, useReducedMotion } from "framer-motion";

// Makes its children drift up and down slowly
export default function Float({
  children,
  className = "",
  delay = 0,
  distance = 8,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -distance, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
