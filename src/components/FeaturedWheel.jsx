"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function FeaturedWheel({ destinations }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // Rotate the wheel based on active index
  const rotation = activeIndex * (360 / destinations.length);

  const handleNext = () => {
    setIsSpinning(true);
    setActiveIndex((prev) => (prev + 1) % destinations.length);
    setTimeout(() => setIsSpinning(false), 500);
  };

  return (
    <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* The Rotating Wheel */}
      <motion.div
        animate={{ rotate: -rotation }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full flex items-center justify-center"
      >
        {destinations.map((dest, i) => {
          // Calculate position on the circle
          const angle = (i * 360) / destinations.length;
          const radius = 220; // distance from center (adjust for mobile)

          // Convert angle to X and Y coordinates
          const x = Math.sin((angle * Math.PI) / 180) * radius;
          const y = -Math.cos((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={dest._id}
              className="absolute transition-all duration-500"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
              animate={{
                scale: activeIndex === i ? 1.2 : 0.8,
                opacity: activeIndex === i ? 1 : 0.5,
                filter: activeIndex === i ? "grayscale(0%)" : "grayscale(100%)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/destinations/${dest._id}`}
                className="group relative block"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden shadow-xl bg-slate-200">
                  <img
                    src={dest.imageUrl}
                    alt={dest.destinationName}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div
                  className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0"}`}
                >
                  <p className="text-xs font-bold text-slate-800 uppercase">
                    {dest.destinationName}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Center Focus Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative z-10 text-center">
          <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white/30 backdrop-blur-md border-4 border-white shadow-2xl flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-xs font-black uppercase text-[#1a8fb0]">
                Current Pick
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                {destinations[activeIndex]?.destinationName}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* GTA Style Navigation Buttons */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={() => {
            setActiveIndex(
              (prev) => (prev - 1 + destinations.length) % destinations.length,
            );
          }}
          className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90 border-2 border-[#1a8fb0]"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="h-12 px-6 rounded-full bg-[#1a8fb0] text-white font-bold shadow-lg hover:bg-[#136f89] transition-all active:scale-90"
        >
          NEXT TRIP
        </button>
        <button
          onClick={() => {
            setActiveIndex((prev) => (prev + 1) % destinations.length);
          }}
          className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90 border-2 border-[#1a8fb0]"
        >
          →
        </button>
      </div>
    </div>
  );
}
