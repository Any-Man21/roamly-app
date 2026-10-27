"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function Error({ error, reset }) {
  return (
    <div className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-50 px-6 py-24">
      {/* Theme Decorations to keep it consistent with your other pages */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1a8fb0]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center"
      >
        {/* Animated "Broken" Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl ring-8 ring-slate-100"
        >
          <span className="text-5xl">🗺️</span>
        </motion.div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Something went wrong
        </h1>
        
        <p className="mt-4 max-w-md mx-auto text-base leading-relaxed text-slate-600">
          We encountered an unexpected error while trying to load this destination. 
          This could be due to a connection issue or a temporary server glitch.
        </p>

        {/* Error Detail (Optional - hidden in production for security) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-mono text-left max-w-md mx-auto">
            {error.message}
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* The 'reset' function tries to re-render the page without a full refresh */}
          <Button
            onClick={() => reset()}
            variant="primary"
            className="rounded-full bg-[#1a8fb0] px-8 py-3 font-semibold text-white hover:bg-[#136f89]"
          >
            Try Again
          </Button>

          <Link href="/destinations">
            <Button
              variant="outline"
              className="rounded-full border-slate-200 px-8 py-3 font-semibold text-slate-600 hover:bg-slate-100"
            >
              Back to Destinations
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
