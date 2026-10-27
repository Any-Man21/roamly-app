// "use client";

// import { useEffect, useRef, useState } from "react";
// import { animate, useInView, useReducedMotion } from "framer-motion";

// /* ---- Customer counter settings: change these to your own numbers ---- */
// const START_DATE = new Date("2026-01-01T00:00:00Z").getTime();
// const BASE_CUSTOMERS = 12400; // count on START_DATE
// const GROWTH_PER_STEP = 100; // customers added...
// const STEP_HOURS = 16; // ...every this many hours
// const MS_PER_CUSTOMER = (STEP_HOURS * 60 * 60 * 1000) / GROWTH_PER_STEP;

// const getCustomers = () =>
//   BASE_CUSTOMERS +
//   Math.max(0, Math.floor((Date.now() - START_DATE) / MS_PER_CUSTOMER));

// const OTHER_STATS = [
//   { value: 120, suffix: "+", label: "Destinations" },
//   { value: 48, suffix: "", label: "Countries" },
//   { value: 4.9, decimals: 1, suffix: "/5", label: "Average rating" },
// ];

// // Counts up from 0 when it scrolls into view, then eases to any new value
// function AnimatedNumber({ value, suffix = "", decimals = 0 }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });
//   const reduceMotion = useReducedMotion();
//   const [display, setDisplay] = useState(0);
//   const shown = useRef(0);

//   useEffect(() => {
//     if (!inView || value == null) return;

//     if (reduceMotion) {
//       shown.current = value;
//       setDisplay(value);
//       return;
//     }

//     const controls = animate(shown.current, value, {
//       duration: 1.8,
//       ease: "easeOut",
//       onUpdate: (v) => {
//         shown.current = v;
//         setDisplay(v);
//       },
//     });
//     return () => controls.stop();
//   }, [inView, value, reduceMotion]);

//   const text = display.toLocaleString("en-US", {
//     minimumFractionDigits: decimals,
//     maximumFractionDigits: decimals,
//   });

//   return (
//     <span ref={ref} className="tabular-nums">
//       {text}
//       {suffix}
//     </span>
//   );
// }

// export default function StatsSection() {
//   const [customers, setCustomers] = useState(null);

//   // Computed in the browser only, so the server and client never disagree
//   useEffect(() => {
//     const update = () => setCustomers(getCustomers());
//     update();
//     const id = setInterval(update, 60_000);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <section className="bg-white">
//       <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
//         <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f6a85] via-[#1a8fb0] to-sky-400 p-6 text-white shadow-xl shadow-[#1a8fb0]/20 sm:p-10">
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-white/20 blur-3xl"
//           />
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -bottom-20 -left-10 -z-10 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl"
//           />

//           <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
//             {/* Live customer counter */}
//             <div className="col-span-2 text-center lg:col-span-1 lg:text-left">
//               <p className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-5xl">
//                 <AnimatedNumber value={customers} />
//               </p>
//               <p className="mt-2 text-sm font-medium text-white/90">
//                 Happy travelers
//               </p>
//               <p className="mt-2 inline-flex items-center gap-2 text-xs text-white/80">
//                 <span className="relative flex h-2 w-2">
//                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
//                   <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
//                 </span>
//                 Live count
//               </p>
//             </div>

//             {OTHER_STATS.map(({ value, suffix, decimals, label }) => (
//               <div key={label} className="text-center lg:text-left">
//                 <p className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-4xl xl:text-5xl">
//                   <AnimatedNumber
//                     value={value}
//                     suffix={suffix}
//                     decimals={decimals}
//                   />
//                 </p>
//                 <p className="mt-2 text-sm font-medium text-white/90">
//                   {label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

/* ---- Customer counter settings ---- */
const START_DATE = new Date("2026-01-01T00:00:00Z").getTime();
const BASE_CUSTOMERS = 12400;
const GROWTH_PER_STEP = 100;
const STEP_HOURS = 16;
const MS_PER_CUSTOMER = (STEP_HOURS * 60 * 60 * 1000) / GROWTH_PER_STEP;

const getCustomers = () =>
  BASE_CUSTOMERS +
  Math.max(0, Math.floor((Date.now() - START_DATE) / MS_PER_CUSTOMER));

const OTHER_STATS = [
  { value: 120, suffix: "+", label: "Destinations", color: "bg-blue-500" },
  { value: 48, suffix: "", label: "Countries", color: "bg-emerald-500" },
  {
    value: 4.9,
    decimals: 1,
    suffix: "/5",
    label: "Rating",
    color: "bg-amber-500",
  },
];

function AnimatedNumber({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const shown = useRef(0);

  useEffect(() => {
    if (!inView || value == null) return;
    if (reduceMotion) {
      shown.current = value;
      setDisplay(value);
      return;
    }
    const controls = animate(shown.current, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        shown.current = v;
        setDisplay(v);
      },
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  const text = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums inline-block">
      {text}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    const update = () => setCustomers(getCustomers());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Geometric Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1a8fb0 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* THE POLYGON HERO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-1 relative group cursor-default"
          >
            {/* Clip-path creates the slanted polygon look */}
            <div
              className="relative h-full min-h-[200px] bg-[#0f6a85] text-white p-8 transition-all duration-300 group-hover:bg-[#1a8fb0]"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)" }}
            >
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-tighter text-sky-200">
                    Live Network
                  </span>
                </div>
                <p className="text-6xl font-black tracking-tighter italic">
                  <AnimatedNumber value={customers} />
                </p>
                <p className="mt-2 text-lg font-bold uppercase tracking-widest text-sky-100 opacity-80">
                  Happy travelers
                </p>
              </div>
              {/* Abstract Geometric Overlay */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>
          </motion.div>

          {/* THE POLYGON SUB-CARDS */}
          {OTHER_STATS.map(({ value, suffix, decimals, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group cursor-default"
            >
              <div
                className={`relative h-full min-h-[200px] ${color} p-8 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none`}
                style={{
                  clipPath: "polygon(0% 0%, 100% 5%, 100% 100%, 5% 100%)",
                }}
              >
                <div className="relative z-10 flex flex-col justify-center h-full">
                  <p className="text-5xl font-black tracking-tighter italic">
                    <AnimatedNumber
                      value={value}
                      suffix={suffix}
                      decimals={decimals}
                    />
                  </p>
                  <p className="mt-2 text-sm font-black uppercase tracking-widest text-white/90">
                    {label}
                  </p>
                </div>
                {/* Hard accent line */}
                <div className="absolute top-0 left-0 w-2 h-full bg-black/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
