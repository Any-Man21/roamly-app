"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-24">
      {/* Background Decorations to match your theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl"
      />

      <div className="text-center">
        {/* Animated Emoji/Icon */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6 text-7xl"
        >
          ✈️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg leading-relaxed text-slate-600"
        >
          Oops! It looks like you've flown off course. <br />
          The page you are looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <Link href="/">
            <Button
              variant="primary"
              className="rounded-full bg-[#1a8fb0] px-8 py-6 text-base font-semibold text-white transition-colors hover:bg-[#136f89]"
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
