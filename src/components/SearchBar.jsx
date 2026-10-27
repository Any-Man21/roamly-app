"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { filterDestinations } from "@/lib/destinationSearch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_RESULTS = 5;

const SEARCH_FIELDS = [
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "City, country or region",
  },
  {
    name: "duration",
    label: "Duration",
    options: [
      ["", "Anytime"],
      ["1-3", "1–3 days"],
      ["4-7", "4–7 days"],
      ["8-plus", "8+ days"],
    ],
  },
  {
    name: "budget",
    label: "Budget",
    options: [
      ["", "Any budget"],
      ["0-1000", "Up to $1,000"],
      ["1000-3000", "$1,000 – $3,000"],
      ["3000-plus", "$3,000+"],
    ],
  },
];

const fieldClasses =
  "w-full bg-transparent text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function SearchBar() {
  const [values, setValues] = useState({
    location: "",
    duration: "",
    budget: "",
  });
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [all, setAll] = useState([]);

  const containerRef = useRef(null);
  const requestedRef = useRef(false);

  // Load the destinations once, the first time the bar is used
  async function loadDestinations() {
    if (requestedRef.current) return;
    requestedRef.current = true;
    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/destinations`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setAll(Array.isArray(data) ? data : []);
      setStatus("ready");
    } catch (err) {
      console.error("Failed to load destinations:", err);
      requestedRef.current = false; // allow a retry on the next interaction
      setStatus("error");
    }
  }

  const hasFilters = Boolean(
    values.location.trim() || values.duration || values.budget,
  );

  const matches = useMemo(() => filterDestinations(all, values), [all, values]);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (values.location.trim()) params.set("location", values.location.trim());
    if (values.duration) params.set("duration", values.duration);
    if (values.budget) params.set("budget", values.budget);
    return params.toString();
  }, [values]);

  // Close on outside click and on Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setOpen(true);
    loadDestinations();
  };

  const showPanel = open && hasFilters;

  return (
    <MotionConfig reducedMotion="user">
      <div ref={containerRef} className="relative" onFocus={loadDestinations}>
        {/* Results popup (opens upward so the banner never clips it) */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              key="results"
              role="region"
              aria-label="Search results"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="absolute inset-x-0 bottom-full z-30 mb-3 max-h-80 overflow-y-auto rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-slate-200"
            >
              {status === "loading" && (
                <p className="px-6 py-8 text-center text-sm text-slate-500">
                  Searching trips...
                </p>
              )}

              {status === "error" && (
                <p className="px-6 py-8 text-center text-sm text-slate-600">
                  We couldn&apos;t load trips right now. Please try again.
                </p>
              )}

              {status === "ready" && matches.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-base font-semibold text-slate-900">
                    Nothing available
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    We couldn&apos;t find any trips matching your search. Try a
                    different place, duration or budget.
                  </p>
                </div>
              )}

              {status === "ready" && matches.length > 0 && (
                <>
                  <p
                    aria-live="polite"
                    className="border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {matches.length} {matches.length === 1 ? "trip" : "trips"}{" "}
                    available
                  </p>

                  <ul>
                    {matches.slice(0, MAX_RESULTS).map((trip) => (
                      <li key={trip._id}>
                        <Link
                          href={`/destinations/${trip._id}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-sky-50 focus-visible:bg-sky-50 focus-visible:outline-none"
                        >
                          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#1a8fb0] to-sky-300">
                            {trip.imageUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={trip.imageUrl}
                                alt=""
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-slate-900">
                              {trip.destinationName}
                            </span>
                            <span className="block truncate text-xs text-slate-500">
                              {[trip.country, trip.category, trip.duration]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          </span>

                          <span className="shrink-0 text-sm font-bold text-[#1a8fb0]">
                            {money.format(Number(trip.price) || 0)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/destinations?${query}`}
                    onClick={() => setOpen(false)}
                    className="block border-t border-slate-100 px-5 py-3 text-center text-sm font-semibold text-[#1a8fb0] transition-colors hover:bg-sky-50 focus-visible:outline-none"
                  >
                    View all {matches.length}{" "}
                    {matches.length === 1 ? "result" : "results"}
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search bar */}
        <form
          action="/destinations"
          method="get"
          role="search"
          aria-label="Search destinations"
          onSubmit={() => setOpen(false)}
          className="overflow-hidden rounded-xl shadow-2xl [color-scheme:light]"
        >
          <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
            {SEARCH_FIELDS.map(
              ({ name, label, type, placeholder, options }) => (
                <label
                  key={name}
                  htmlFor={`search-${name}`}
                  className={`block cursor-pointer bg-white px-5 py-3 transition-colors focus-within:bg-sky-50 ${
                    name === "location" ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <span className="block text-xs font-semibold text-slate-500">
                    {label}
                  </span>
                  {options ? (
                    <select
                      id={`search-${name}`}
                      name={name}
                      value={values[name]}
                      onChange={handleChange}
                      className={`${fieldClasses} mt-0.5 cursor-pointer`}
                    >
                      {options.map(([value, text]) => (
                        <option key={value} value={value}>
                          {text}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`search-${name}`}
                      name={name}
                      type={type}
                      value={values[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      autoComplete="off"
                      className={`${fieldClasses} mt-0.5`}
                    />
                  )}
                </label>
              ),
            )}

            <div className="flex bg-white p-3 sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a8fb0] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]"
              >
                <SearchIcon />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </MotionConfig>
  );
}
