"use client";

import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-[#1a8fb0] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1a8fb0]/30 transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]";

const secondaryBtn =
  "inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-[#1a8fb0] hover:text-[#1a8fb0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]";

const IDEAS = [
  { name: "Beach", emoji: "🏖️" },
  { name: "Mountain", emoji: "🏔️" },
  { name: "City", emoji: "🏙️" },
  { name: "Adventure", emoji: "🧗" },
  { name: "Cultural", emoji: "🏛️" },
  { name: "Luxury", emoji: "💎" },
];

/* ------------------------------------------------------------------ */
/* Animated sky: clouds and a plane flying along a dotted route        */
/* ------------------------------------------------------------------ */

function Cloud({ className, delay = 0, duration = 14, distance = 40 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={`absolute block rounded-full bg-white/60 blur-sm ${className}`}
      animate={reduceMotion ? undefined : { x: [0, distance, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function SkyScene({ compact = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden bg-gradient-to-b from-[#0f6a85] via-[#1a8fb0] to-sky-300 ${
        compact ? "h-36 sm:h-40" : "h-48 sm:h-60"
      }`}
    >
      <span className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/25 blur-2xl" />
      <span className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-sky-200/30 blur-2xl" />

      <Cloud
        className="left-[8%] top-[18%] h-7 w-24"
        duration={16}
        distance={36}
      />
      <Cloud
        className="right-[12%] top-[34%] h-6 w-20"
        delay={2}
        duration={13}
        distance={-30}
      />
      <Cloud
        className="left-[44%] top-[10%] h-5 w-16"
        delay={4}
        duration={18}
        distance={28}
      />

      {/* dotted flight route */}
      <svg
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-4 h-24 w-full"
      >
        <path
          d="M0 95 C 90 20, 200 115, 400 25"
          stroke="white"
          strokeOpacity="0.65"
          strokeWidth="2"
          strokeDasharray="6 9"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* the plane */}
      <motion.span
        className="absolute bottom-12 text-4xl drop-shadow-md sm:text-5xl"
        style={{ left: reduceMotion ? "45%" : "-12%" }}
        animate={
          reduceMotion
            ? undefined
            : { left: ["-12%", "105%"], y: [0, -16, 10, -10, 0] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        ✈️
      </motion.span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page header                                                         */
/* ------------------------------------------------------------------ */

export function BookingsHeader({ count = 0 }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
        className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <span className="inline-flex rounded-full bg-[#1a8fb0]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#136f89]">
            Your travel journal
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            My Bookings
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">
            Every booking brings you one step closer to somewhere unforgettable.
          </p>
        </div>

        {count > 0 && (
          <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm sm:self-auto">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1a8fb0]/10 text-2xl">
              🧳
            </span>
            <div>
              <p className="text-2xl font-extrabold leading-none text-slate-900">
                {String(count).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {count === 1 ? "Trip booked" : "Trips booked"}
              </p>
            </div>
          </div>
        )}
      </motion.header>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state                                                         */
/* ------------------------------------------------------------------ */

export function EmptyBookings() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
      >
        <motion.div variants={rise}>
          <SkyScene />
        </motion.div>

        <div className="relative px-6 pb-10 text-center sm:px-12">
          <motion.div
            variants={rise}
            className="relative z-10 mx-auto -mt-10 grid h-20 w-20 place-items-center rounded-2xl bg-white text-4xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-100"
          >
            <motion.span
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              🧳
            </motion.span>
          </motion.div>

          <motion.h2
            variants={rise}
            className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Your next story starts here
          </motion.h2>

          <motion.p
            variants={rise}
            className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-600"
          >
            You haven&apos;t booked a trip yet. Pick a place that makes you
            dream, and it will show up here the moment you book.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/destinations"
                className={`${primaryBtn} w-full sm:w-auto`}
              >
                Explore destinations
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link href="/" className={`${secondaryBtn} w-full sm:w-auto`}>
                Back to home
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-10 border-t border-slate-100 pt-8"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Not sure where to start?
            </p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              {IDEAS.map(({ name, emoji }) => (
                <li key={name}>
                  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/destinations?location=${encodeURIComponent(name)}`}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-[#1a8fb0] hover:bg-sky-50 hover:text-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]"
                    >
                      <span aria-hidden="true">{emoji}</span>
                      {name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/* Signed-out state                                                    */
/* ------------------------------------------------------------------ */

export function SignedOutState() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
      >
        <motion.div variants={rise}>
          <SkyScene compact />
        </motion.div>

        <div className="px-6 pb-10 text-center sm:px-10">
          <motion.div
            variants={rise}
            className="relative z-10 mx-auto -mt-9 grid h-18 w-18 place-items-center rounded-2xl bg-white text-3xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-100"
            style={{ height: 72, width: 72 }}
          >
            🎟️
          </motion.div>

          <motion.h2
            variants={rise}
            className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          >
            Your next adventure awaits
          </motion.h2>
          <motion.p
            variants={rise}
            className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slate-600"
          >
            Sign in to see the trips you&apos;ve booked.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/login" className={`${primaryBtn} w-full sm:w-auto`}>
              Log in
            </Link>
            <Link href="/signup" className={`${secondaryBtn} w-full sm:w-auto`}>
              Create an account
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/* Error state                                                         */
/* ------------------------------------------------------------------ */

export function ErrorState() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
        className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-xl shadow-slate-900/5"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl"
          aria-hidden="true"
        >
          🛰️
        </motion.div>
        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
          We lost the signal
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slate-600">
          We couldn&apos;t load your bookings right now. Please try again in a
          moment.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={`${primaryBtn} mt-7`}
        >
          Try again
        </button>
      </motion.section>
    </MotionConfig>
  );
}
