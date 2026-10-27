"use client";

import { motion, useReducedMotion } from "framer-motion";

// Fades and lifts its children into view when they scroll on screen
export default function Reveal({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 200, damping: 26, delay }}
    >
      {children}
    </motion.div>
  );
}
